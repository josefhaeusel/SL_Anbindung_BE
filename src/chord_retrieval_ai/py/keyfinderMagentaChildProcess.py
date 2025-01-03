import sys
import json
import librosa
from keyfinder import Tonal_Fragment
from momentMatcher import MomentMatcher
import pyloudnorm as pyln
import numpy as np
import matplotlib
import soundfile

LOGGING = False

def getID(selectedName, similarityScores):

    for i, score in enumerate(similarityScores):
        if score["name"] == selectedName:
            return i

def checkRepetition(selectedNames):

    for i, selectedName in enumerate(selectedNames):
        if i > 0 and selectedName == selectedNames[i - 1]:
            if LOGGING:
                print("hasRepetition?", True)
            return True 
    if LOGGING:
        print("hasRepetition?", False)
    return False  

def avoidRepetition(moments):

    selectedNames = [moment["name"] for moment in moments]

    if LOGGING:
        print("selectedNames",selectedNames)

    hasRepetition = checkRepetition(selectedNames)

    while hasRepetition:
        for i, _ in enumerate(selectedNames):

            if i < (len(selectedNames)-2):

                doubleRepetition = selectedNames[i] == selectedNames[i+1] == selectedNames[i+2]
                # print("doubleRepetition", doubleRepetition)

                if doubleRepetition:
                    # print(selectedNames[i+1], moments[i+1]["similarity_scores"])
                    middleSelectedNameID = getID(selectedNames[i+1], moments[i+1]["similarity_scores"])
                    updateMomentID = i+1
                    selectedNames[updateMomentID] = moments[updateMomentID]["similarity_scores"][middleSelectedNameID+1]["name"]
                    for i, selectedName in enumerate(selectedNames):
                        moments[i]["name"] = selectedName
                    if LOGGING:
                        print(f"(DR) Moment #{updateMomentID} changed from  {moments[updateMomentID]["similarity_scores"][middleSelectedNameID]["name"]} to {moments[updateMomentID]["similarity_scores"][middleSelectedNameID+1]["name"]}")


            if i < (len(selectedNames)-1):
                singleRepetition = selectedNames[i+1] == (selectedNames[i])
                # print("singleRepetition", singleRepetition)

                if singleRepetition:
                    currentSelectedNameID = getID(selectedNames[i], moments[i]["similarity_scores"])
                    currentNextScore = moments[i]["similarity_scores"][currentSelectedNameID+1]["score"]
                    nextSelectedNameID = getID(selectedNames[i+1], moments[i+1]["similarity_scores"])
                    nextNextScore = moments[i+1]["similarity_scores"][nextSelectedNameID+1]["score"]
                    # print("YOOO")
                    updateMomentID, updateSelectedNameID =  (i, currentSelectedNameID+1) if currentNextScore > nextNextScore else (i+1, nextSelectedNameID+1)
                    selectedNames[updateMomentID] = moments[updateMomentID]["similarity_scores"][updateSelectedNameID]["name"]
                    for i, selectedName in enumerate(selectedNames):
                        moments[i]["name"] = selectedName
                    if LOGGING:
                        print(f"(SR) Moment #{updateMomentID} changed from  {moments[updateMomentID]["similarity_scores"][updateSelectedNameID-1]} to {moments[updateMomentID]["similarity_scores"][updateSelectedNameID]})")

            if LOGGING:
                print("B", i, selectedNames)
        
        hasRepetition = checkRepetition(selectedNames)

    if LOGGING:
        print("\nAFTER REPETITION FILTERING",selectedNames)

    return moments
    

if len(sys.argv) > 1:
    try:
        audio_path = sys.argv[1]
        magenta_moments_json = sys.argv[2]

        with open(magenta_moments_json, 'r', encoding='utf-8') as openfile:
            content = ""
            for line in openfile:
                content += line
            analysis = json.loads(content)
            magenta_moments = analysis["analysis"]["detected_moments"]



        y, sr = librosa.load(audio_path)
        duration = librosa.get_duration(y=y, sr=sr) # Duration of the split .aac file (from Phase "Splitting Audio from Video") !Not length of appended animation!

        # Overall Loudness Analysis
        meter = pyln.Meter(sr, filter_class="DeMan") 
        overall_loudness = meter.integrated_loudness(y)  # measure loudness

        analysisSegmentEmpty = False
        audioEmpty = False
        
        if np.isnan(overall_loudness) or np.isinf(overall_loudness):
            audioEmpty = True
            overall_loudness = None
        else:

            moments_with_keys = []
            startTolerance = -0.25
            endTolerance = 0.75
            for moment in magenta_moments:

                key_moment_start=librosa.time_to_samples(max(float(moment["startTime"])+startTolerance, 0), sr=sr)
                key_moment_end=librosa.time_to_samples(min(float(moment["startTime"])+endTolerance, duration), sr=sr)
                y_key_segment = y[key_moment_start:key_moment_end]
                y_key_segment_harmonic, _ = librosa.effects.hpss(y_key_segment)
                moment["key"] = Tonal_Fragment(y_key_segment_harmonic, sr).get_list_of_neutral_keys()
                moment["similarity_scores"] = MomentMatcher(y, sr, moment).getSimilarityScores()
                moment["name"] = moment["similarity_scores"][0]["name"]

                moments_with_keys.append(moment)

            if LOGGING:
                print(f"\n{moments_with_keys}")
            moments_with_keys = avoidRepetition(moments_with_keys)
            if LOGGING:
                print(f"\n{moments_with_keys}")

        analysis = {
            "analyzed_audio": audio_path,
            "audioEmpty": audioEmpty,
            "overall_loudness": overall_loudness,
            "moments_with_keys": moments_with_keys,
            }
        

        with open(magenta_moments_json, 'w') as json_file:
            json.dump(analysis, json_file)

        print(json.dumps(analysis))
        sys.stdout.flush()

    except Exception as e:
        print(f"Error: {e}", file=sys.stderr)
        sys.stderr.flush()

else:
    print("Please provide a song name as an argument.")


    


#python3 "/Users/josef.haeusel/Documents/Lokale Projekte/TEL_Scoring_Tool/backend/src/chord_retrieval_ai/py/keyfinderMagentaChildProcess.py" "/Users/josef.haeusel/Documents/Lokale Projekte/TEL_Scoring_Tool/backend/temp_uploads/audio/IuhDdN/Telekom Your dream job at Deutsche Telekom-audio.aac" '[{"name":"arpeggio_riser","type":"magenta","startTime":0.04,"endTime":1.24,"length":1.2,"faces":{"detected":false},"active":false,"id":0},{"name":"beam","type":"magenta","startTime":1.76,"endTime":2.52,"length":0.76,"faces":{"detected":false},"active":false,"id":1},{"name":"impact","type":"magenta","startTime":5.92,"endTime":6.6,"length":0.6799999999999997,"faces":{"detected":false},"active":false,"id":2},{"name":"UI","type":"magenta","startTime":12.6,"endTime":15.04,"length":2.4399999999999995,"faces":{"detected":false},"active":false,"id”:3}, {"name":"arpeggio_riser","type":"cut","startTime":1.72,"endTime":1.97,"length":0.25,"delta_score":-0.2745140319170075,"faces":{"detected":false,"faces":[]},"active":false,"id":0,"frame":43},{"name":"beam","type":"cut","startTime":2.52,"endTime":2.77,"length":0.25,"delta_score":-0.6534259661393296,"faces":{"detected":false,"faces":[]},"active":false,"id":1,"frame":63},{"name":"impact","type":"cut","startTime":3.84,"endTime":4.09,"length":0.25,"delta_score":-0.73803210264192,"faces":{"detected":false,"faces":[]},"active":false,"id":2,"frame":96},{"name":"UI","type":"cut","startTime":7.32,"endTime":7.57,"length":0.25,"delta_score":-0.8062169258457581,"faces":{"detected":true,"faces":[[441,275,615,615]]},"active":false,"id":3,"frame":183}]'
