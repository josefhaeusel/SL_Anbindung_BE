import os
from shot_boundary_detection import ShotBoundaryDetection 

script_dir = os.path.dirname(os.path.realpath(__file__))
videos = ["T_outro_hard_cut_16_9_hd_preview.mp4", "dream_job.mp4", "em.mp4"]
videoPath= f"{script_dir}/test/{videos[1]}"

magenta_moments = ShotBoundaryDetection(videoPath, {"detected_moments": []}, True).detectMoments()
print("Magenta Moments", magenta_moments)

# results = []
# for i in range(len(videos)):
#     videoPath= f"{script_dir}/test/{videos[i]}"
#     result = ColorDetection(videoPath).detectMoments(showVideoPlayer = False)
#     results.append(result)
#     print(results[len(results)-1], "\n")




