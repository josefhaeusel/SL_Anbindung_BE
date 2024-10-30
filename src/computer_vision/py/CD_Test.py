import os
from color_detection import ColorDetection 

script_dir = os.path.dirname(os.path.realpath(__file__))
videos = ["T_outro_hard_cut_16_9_hd_preview.mp4", "dream_job.mp4", "em.mp4"]
videoPath= f"{script_dir}/test/{videos[1]}"

magenta_moments = ColorDetection(videoPath).detectMoments(showVideoPlayer = True)
print("Magenta Moments", magenta_moments)

# results = []
# for i in range(len(videos)):
#     videoPath= f"{script_dir}/test/{videos[i]}"
#     result = ColorDetection(videoPath).detectMoments(showVideoPlayer = False)
#     results.append(result)
#     print(results[len(results)-1], "\n")




