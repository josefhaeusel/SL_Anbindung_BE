from libs.audioHighlightAnalyzer import AudioHighlightAnalyzer
from libs.keyfinder import Keyfinder
from libs.tempofinder import Tempofinder 
import librosa
import sys, json

if len(sys.argv) > 1:
    try:
        audio_path = sys.argv[1]
        y, sr = librosa.load(audio_path)

        # # # Analyze Key
        keyfinder = Keyfinder(y, sr)
        key = keyfinder.get_likely_key()

        # # # Analyze BPM
        tempofinder = Tempofinder(y, sr)
        bpm = tempofinder.detect_bpm()

        # # # Analyze Highlight Section
        highlight_analyzer = AudioHighlightAnalyzer(y, sr, audio_path)
        highlight_section = highlight_analyzer.get_most_important_highlight()


        analysis = {
            "key": key,
            "bpm": bpm,
            "highlight_section": highlight_section
        }

        print(json.dumps(analysis))
        sys.stdout.flush()

    except Exception as e:
        print(f"Error: {e}", file=sys.stderr)
        sys.stderr.flush()
else:
    print("Please provide the full path of the audio as the #1 argument.")