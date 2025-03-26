import os
from momentMatcher import MomentMatcher 
import librosa

script_dir = os.path.dirname(os.path.realpath(__file__))
files = ["beam_at_1s.wav", "dream_job.aac", "em.aac"]
filePath= f"{script_dir}/test/{files[2]}"
y, sr = librosa.load(filePath)

start = librosa.time_to_samples(8, sr=sr)
end = librosa.time_to_samples(9, sr=sr)
y = y[start:end]


analysis_result = MomentMatcher(y, sr).getSimilarityScores()
print("Result", analysis_result)

# results = []
# for i in range(len(files)):
#     videoPath= f"{script_dir}/test/{files[i]}"
#     result = MomentMatcher(filePath).getSimilarityScores()
#     results.append(result)
#     print(results[len(results)-1], "\n")




