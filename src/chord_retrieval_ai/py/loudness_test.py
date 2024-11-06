import os
import sys
import json
import librosa
import pyloudnorm as pyln
import numpy as np


if len(sys.argv) > 1:
    try:
        audio_directory = sys.argv[1]
        analysis_results = []
        audio_paths = [
            os.path.join(audio_directory, file)
            for file in os.listdir(audio_directory)
            if file.lower().endswith(('.wav', '.mp3', '.aac', '.flac'))  # Adjust extensions as needed
        ]
            
        for audio_path in audio_paths:
            y, sr = librosa.load(audio_path)
            duration = librosa.get_duration(y=y, sr=sr) # Duration of the split .aac file (from Phase "Splitting Audio from Video") !Not length of appended animation!

            meter1 = pyln.Meter(sr) 
            meter1_loudness = meter1.integrated_loudness(y)

            meter2 = pyln.Meter(sr, filter_class="DeMan") 
            meter2_loudness = meter2.integrated_loudness(y)

            result = {"audio": audio_path, "BS.meter": meter1_loudness, "DeMan": meter2_loudness}
            print(result["audio"], "\n", result["BS.meter"], "\n", result["DeMan"], "\n")
            analysis_results.append(result)


        print(json.dumps(analysis_results))
        sys.stdout.flush()

    except Exception as e:
        print(f"Error: {e}", file=sys.stderr)
        sys.stderr.flush()

else:
    print("Please provide a song name as an argument.")



    
