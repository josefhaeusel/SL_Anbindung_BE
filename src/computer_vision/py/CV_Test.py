import os
from computer_vision import ComputerVision 

script_dir = os.path.dirname(os.path.realpath(__file__))
videos = ["T_outro_hard_cut_16_9_hd_preview.mp4", "T_Ending_720_Square.mp4","Telekom_TeacherEnding_Max.mp4"]
videoPath= f"{script_dir}/test/{videos[0]}"

logo_time = ComputerVision(videoPath).matchVideoFrames(showVideoPlayer = True)
print("Logo Time",logo_time)
