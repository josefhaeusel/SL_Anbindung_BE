import sys
import json
import librosa
from keyfinder import Tonal_Fragment
from momentMatcher import MomentMatcher
import pyloudnorm as pyln
import numpy as np
import matplotlib
import soundfile


if len(sys.argv) > 1:
    try:
        audio_path = sys.argv[1]
        magenta_moments_json = sys.argv[2]
        # magenta_moments = json.loads(magenta_moments_json)
        with open(magenta_moments_json, 'r') as openfile:
            magenta_moments = json.load(openfile)


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

            for moment in magenta_moments:

                if moment["type"] == "cut":
                    moment_start=librosa.time_to_samples(float(moment["startTime"])-0.5, sr=sr)
                    moment_end=librosa.time_to_samples(float(moment["startTime"])+0.5, sr=sr)
                    y_segment = y[moment_start:moment_end]
                elif moment["type"] == "magenta":
                    moment_start=librosa.time_to_samples(float(moment["startTime"]), sr=sr)
                    moment_end=librosa.time_to_samples(float(moment["endTime"]), sr=sr)
                    y_segment = y[moment_start:moment_end]
       
                y_harmonic, y_percussive = librosa.effects.hpss(y_segment)
                moment["key"] = Tonal_Fragment(y_harmonic, sr).get_key_info()
                moment["similarity_scores"] = MomentMatcher(y_segment, sr).getSimilarityScores()
                moment["name"] = moment["similarity_scores"][1]["name"]

                moments_with_keys.append(moment)

        analysis = {
            "analyzed_audio": audio_path,
            "audioEmpty": audioEmpty,
            "overall_loudness": overall_loudness,
            "moments_with_keys": moments_with_keys,
            }

        print(json.dumps(analysis))
        sys.stdout.flush()

    except Exception as e:
        print(f"Error: {e}", file=sys.stderr)
        sys.stderr.flush()

else:
    print("Please provide a song name as an argument.")



    


#python3 "/Users/josef.haeusel/Documents/Lokale Projekte/TEL_Scoring_Tool/backend/src/chord_retrieval_ai/py/keyfinderMagentaChildProcess.py" "/Users/josef.haeusel/Documents/Lokale Projekte/TEL_Scoring_Tool/backend/temp_uploads/audio/IuhDdN/Telekom Your dream job at Deutsche Telekom-audio.aac" '[{"name":"arpeggio_riser","type":"magenta","startTime":0.04,"endTime":1.24,"length":1.2,"faces":{"detected":false},"active":false,"id":0},{"name":"beam","type":"magenta","startTime":1.76,"endTime":2.52,"length":0.76,"faces":{"detected":false},"active":false,"id":1},{"name":"impact","type":"magenta","startTime":5.92,"endTime":6.6,"length":0.6799999999999997,"faces":{"detected":false},"active":false,"id":2},{"name":"UI","type":"magenta","startTime":12.6,"endTime":15.04,"length":2.4399999999999995,"faces":{"detected":false},"active":false,"id”:3}, {"name":"arpeggio_riser","type":"cut","startTime":1.72,"endTime":1.97,"length":0.25,"delta_score":-0.2745140319170075,"faces":{"detected":false,"faces":[]},"active":false,"id":0,"frame":43},{"name":"beam","type":"cut","startTime":2.52,"endTime":2.77,"length":0.25,"delta_score":-0.6534259661393296,"faces":{"detected":false,"faces":[]},"active":false,"id":1,"frame":63},{"name":"impact","type":"cut","startTime":3.84,"endTime":4.09,"length":0.25,"delta_score":-0.73803210264192,"faces":{"detected":false,"faces":[]},"active":false,"id":2,"frame":96},{"name":"UI","type":"cut","startTime":7.32,"endTime":7.57,"length":0.25,"delta_score":-0.8062169258457581,"faces":{"detected":true,"faces":[[441,275,615,615]]},"active":false,"id":3,"frame":183}]'
