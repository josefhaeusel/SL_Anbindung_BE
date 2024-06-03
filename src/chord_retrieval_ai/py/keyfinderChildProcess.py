import sys
import json
import librosa
from keyfinder import Tonal_Fragment
import pyloudnorm as pyln
import numpy as np

#

if len(sys.argv) > 1:
    try:
        audio_path = sys.argv[1]  # The first argument is the script name, so the song name is the second argument

        y, sr = librosa.load(audio_path)
        duration = librosa.get_duration(y=y, sr=sr)
        analyzeFromEnd = 4.5

        if duration > 4.5:
            analysis_start = librosa.time_to_samples(duration - 4.5, sr=sr)
            analysis_end = librosa.time_to_samples(duration - 2.5, sr=sr)
        else:
            analysis_start = librosa.time_to_samples(0, sr=sr)
            analysis_end = librosa.time_to_samples(duration - 2.5, sr=sr)

        y_segment = y[analysis_start:analysis_end]

        # Ensure y_segment is not empty
        if len(y_segment) == 0:
            raise ValueError("The audio segment is empty")

        # Integrated Loudness Analysis
        meter = pyln.Meter(sr)  # create BS.1770 meter
        integrated_loudness = meter.integrated_loudness(y)  # measure loudness
        segment_loudness = meter.integrated_loudness(y_segment)

        audioEmpty = False
        analysisSegmentEmpty = False
        key_analysis = {"likely_key": None, "correlation": None}

        if np.isnan(integrated_loudness) or np.isinf(integrated_loudness):
            audioEmpty = True
            analysisSegmentEmpty = True
            integrated_loudness = None
            segment_loudness = None
            
        elif np.isnan(segment_loudness) or np.isinf(segment_loudness):
            analysisSegmentEmpty = True
            segment_loudness = None
            audioEmpty = False
        else:
            y_harmonic, y_percussive = librosa.effects.hpss(y_segment)
            key_analysis = Tonal_Fragment(y_harmonic, sr).get_key_info()

        analysis = {
            "analyzed_audio": audio_path,
            "analysis": key_analysis,
            "loudness": integrated_loudness,
            "segmentLoudness": segment_loudness,
            "audioEmpty": audioEmpty,
            "analysisSegmentEmpty": analysisSegmentEmpty
        }

        print(json.dumps(analysis))
        sys.stdout.flush()

    except Exception as e:
        print(f"Error: {e}", file=sys.stderr)
        sys.stderr.flush()

else:
    print("Please provide a song name as an argument.")
