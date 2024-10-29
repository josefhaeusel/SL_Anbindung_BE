import sys, json
from color_detection import ColorDetection

if len(sys.argv) > 1:
    video_path = sys.argv[1]  # The first argument is the script name, so the song name is the second argument

    analysis = ColorDetection(video_path).detectMoments(True)

    response = {
        "analyzed_video": video_path,
        "analysis": analysis,
    }
    
    print(json.dumps(response))

    sys.stdout.flush()

else:
    
    print("Please provide the video path as an argument.")
