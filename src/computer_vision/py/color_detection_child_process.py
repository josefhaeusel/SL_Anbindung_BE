import sys, json, os
from color_detection import ColorDetection
from shot_boundary_detection import ShotBoundaryDetection

def filterMoments(color_detection_analysis, video_path):
    
    _, _, videoDuration, _, _ = ColorDetection(video_path, False).getVideoProperties()
    momentIntervalSecs = 5
    analysisWindowStart = 0 
    analysisWindowEnd = analysisWindowStart + momentIntervalSecs
    keepMoments = []
    droppedOutMoments = []

    while analysisWindowStart <= videoDuration:

        momentsInWindow = []

        for moment in color_detection_analysis["detected_moments"]:
            
            if moment["startTime"] >= analysisWindowStart and moment["startTime"] <= analysisWindowEnd:
                momentsInWindow.append(moment)

        if len(momentsInWindow) <= 1:
            keepMoments.extend(momentsInWindow)
        else:

            while len(momentsInWindow) > 1:
                # print("Second Loop", momentsInWindow)
                magentaAndCuts = any(moment["type"] in {"magenta", "cut"} for moment in momentsInWindow)
                allMagenta = all(moment["type"] == "magenta" for moment in momentsInWindow)
                allCuts = all(moment["type"] == "cut" for moment in momentsInWindow)

                if magentaAndCuts:
                    dropMoments = [moment for moment in momentsInWindow if moment["type"] == "cut"]
                    droppedOutMoments.extend(dropMoments)
                    momentsInWindow = [moment for moment in momentsInWindow if moment["type"] == "magenta"]

                if allMagenta:
                    highestScoreMoment = max(momentsInWindow, key=lambda moment: moment["magenta_ratio"])
                    dropMoments = [moment for moment in momentsInWindow if moment != highestScoreMoment]
                    droppedOutMoments.extend(dropMoments)
                    momentsInWindow = [highestScoreMoment]

                if allCuts:
                    highestDeltaCut = max(momentsInWindow, key=lambda moment: abs(moment["delta_score"]))
                    dropMoments = [moment for moment in momentsInWindow if moment != highestDeltaCut]
                    droppedOutMoments.extend(dropMoments)
                    momentsInWindow = [highestDeltaCut]
            
            keepMoments.extend(momentsInWindow)

        analysisWindowStart += momentIntervalSecs
        analysisWindowEnd += momentIntervalSecs

        # print("End first Loop", keepMoments, droppedOutMoments)

    for i, moment in enumerate(keepMoments):
        keepMoments[i]["id"] = i

    return keepMoments, droppedOutMoments



if len(sys.argv) > 1:
    video_path = sys.argv[1]  # The first argument is the script name, so the song name is the second argument

    color_detection_analysis = ColorDetection(video_path, False).detectMoments()
    # print(color_detection_analysis)
    cut_analysis = ShotBoundaryDetection(video_path, color_detection_analysis, False).detectMoments()
    # print(cut_analysis)
    color_detection_analysis["detected_moments"].extend(cut_analysis["detected_moments"])

    keep_moments, drop_out_moments = filterMoments(color_detection_analysis, video_path)
    color_detection_analysis["detected_moments"] = keep_moments
    color_detection_analysis["dropped_out_moments"].extend(drop_out_moments)

    temp_dir = os.path.dirname(video_path)
    analysis_json_path = os.path.join(temp_dir, "analysis.json")

    response = {
        "analyzed_video": video_path,
        "analysis": color_detection_analysis,
        "analysis_path": analysis_json_path
    }

    with open(analysis_json_path, 'w') as json_file:
        json.dump(response, json_file)
    
    print(json.dumps(response))

    sys.stdout.flush()

else:
    
    print("Please provide the video path as an argument.")






#python3 "/Users/josef.haeusel/Documents/Lokale Projekte/TEL_Scoring_Tool/backend/src/chord_retrieval_ai/py/keyfinderMagentaChildProcess.py" "/Users/josef.haeusel/Documents/Lokale Projekte/TEL_Scoring_Tool/backend/temp_uploads/audio/vZxkrr/EM 2024  Deutsche Telekom-audio.aac"
#'[{"name":"arpeggio_riser","type":"magenta","startTime":0.04,"endTime":1.92,"length":1.88,"faces":{"detected":false},"active":false,"id":0},{"name":"beam","type":"magenta","startTime":9.24,"endTime":10.24,"length":1,"faces":{"detected":false},"active":false,"id":1},{"name":"impact","type":"magenta","startTime":15.44,"endTime":16.76,"length":1.32,"faces":{"detected":false},"active":false,"id":2},{"name":"UI","type":"magenta","startTime":18.68,"endTime":20.48,"length":1.8,"faces":{"detected":false},"active":false,"id":3},{"name":"arpeggio_riser","type":"magenta","startTime":22.08,"endTime":24.88,"length":2.8,"faces":{"detected":false},"active":false,"id":4},{"name":"beam","type":"magenta","startTime":36.2,"endTime":39.48,"length":3.28,"faces":{"detected":false},"active":false,"id":5},{"name":"impact","type":"magenta","startTime":43,"endTime":52.32,"length":9.32,"faces":{"detected":false},"active":false,"id":6},{"name":"UI","type":"cut","startTime":2.72,"endTime":2.97,"length":0.25,"delta_score":-0.872,"faces":{"detected":true},"active":false,"id":7,"frame":68},{"name":"arpeggio_riser","type":"cut","startTime":13.92,"endTime":14.17,"length":0.25,"delta_score":-0.88,"faces":{"detected":false},"active":false,"id":8,"frame":348},{"name":"beam","type":"cut","startTime":18.68,"endTime":18.93,"length":0.25,"delta_score":-0.704,"faces":{"detected":false},"active":false,"id":9,"frame":467},{"name":"impact","type":"cut","startTime":26.96,"endTime":27.21,"length":0.25,"delta_score":-0.456,"faces":{"detected":true},"active":false,"id":10,"frame":674}]'


