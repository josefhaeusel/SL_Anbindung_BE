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
        magenta_moments = json.loads(magenta_moments_json)
    
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
            tolerance = 0
            # Platzierung vorne oder hinten? 

            for moment in magenta_moments:

                if moment["type"] == "cut":
                    moment_start=librosa.time_to_samples(int(moment["startTime"])-0.5, sr=sr)
                    moment_end=librosa.time_to_samples(int(moment["startTime"])+0.5, sr=sr)
                    y_segment = y[moment_start:moment_end]
                elif moment["type"] == "magenta":
                    moment_start=librosa.time_to_samples(int(moment["startTime"])-tolerance, sr=sr)
                    moment_end=librosa.time_to_samples(int(moment["endTime"])+tolerance, sr=sr)
                    y_segment = y[moment_start:moment_end]
       
                y_harmonic, y_percussive = librosa.effects.hpss(y_segment)
                moment["key"] = Tonal_Fragment(y_harmonic, sr).get_key_info()
                moment["similarity_scores"] = MomentMatcher(y_segment, sr).getSimilarityScores()
                moment["name"] = moment["similarity_scores"][0]["name"]

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



    
