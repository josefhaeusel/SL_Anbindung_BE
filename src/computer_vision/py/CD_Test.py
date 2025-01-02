import os
from color_detection import ColorDetection 
from shot_boundary_detection import ShotBoundaryDetection


script_dir = os.path.dirname(os.path.realpath(__file__))
videos = ["T_outro_hard_cut_16_9_hd_preview.mp4", "dream_job.mp4", "em.mp4"]
videoPath= f"{script_dir}/test/{videos[2]}"

color_detection_analysis = ColorDetection(videoPath, True).detectMoments()
print("color_detection_analysis \n",color_detection_analysis)
print("\n", "Analyzing cuts...")
cut_analysis = ShotBoundaryDetection(videoPath, color_detection_analysis, True).detectMoments()
print("cut_analysis \n", cut_analysis)

color_detection_analysis["detected_moments"] += cut_analysis["detected_moments"]

print("Magenta Moments", color_detection_analysis)

# results = []
# for i in range(len(videos)):
#     videoPath= f"{script_dir}/test/{videos[i]}"
#     result = ColorDetection(videoPath).detectMoments(showVideoPlayer = False)
#     results.append(result)
#     print(results[len(results)-1], "\n")




