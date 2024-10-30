import sys
import json
import librosa
from keyfinder import Tonal_Fragment
import pyloudnorm as pyln
import numpy as np
import matplotlib
import soundfile


if len(sys.argv) > 1:
    try:
        audio_path = sys.argv[1]
    
        y, sr = librosa.load(audio_path)
        duration = librosa.get_duration(y=y, sr=sr) # Duration of the split .aac file (from Phase "Splitting Audio from Video") !Not length of appended animation!

        analysis_start = librosa.time_to_samples(0, sr=sr)
        analysis_end = librosa.time_to_samples(duration, sr=sr)

        y_harmony_segment = y[analysis_start:analysis_end]
        y_loudness_segment =  y[librosa.time_to_samples(0, sr=sr):analysis_end]

        # Ensure y_segment is not empty
        if len(y_harmony_segment) == 0:
            raise ValueError("The audio segment is empty")

        # Integrated Loudness Analysis
        meter = pyln.Meter(sr)  # create BS.1770 meter
        integrated_loudness = meter.integrated_loudness(y_loudness_segment)  # measure loudness
        overall_loudness = (meter.integrated_loudness(y))

        analysisSegmentEmpty = False
        audioEmpty = False
        key_analysis = {"likely_key": None, "correlation": None}

        if np.isnan(overall_loudness) or np.isinf(overall_loudness):
            audioEmpty = True
            integrated_loudness = None
        elif np.isnan(integrated_loudness) or np.isinf(integrated_loudness):
            integrated_loudness = None
        else:
            y_harmonic, y_percussive = librosa.effects.hpss(y_harmony_segment)
            key_analysis = Tonal_Fragment(y_harmonic, sr).get_key_info()


        analysis = {
            "analyzed_audio": audio_path,
            "audioEmpty": audioEmpty,
            "analysis": key_analysis,
            "loudness": integrated_loudness,
                            }

        print(json.dumps(analysis))
        sys.stdout.flush()

    except Exception as e:
        print(f"Error: {e}", file=sys.stderr)
        sys.stderr.flush()

else:
    print("Please provide a song name as an argument.")



    
