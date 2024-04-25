import sys, json
from computer_vision import ComputerVision

if len(sys.argv) > 1:
    video_path = sys.argv[1]  # The first argument is the script name, so the song name is the second argument

    logoStart = ComputerVision(video_path).matchVideoFrames()

    analysis = {
        "analyzed_video": video_path,
        "logo_start": logoStart
    }
    print(json.dumps(analysis))

    sys.stdout.flush()

else:
    
    print("Please provide the video path as an argument.")
    