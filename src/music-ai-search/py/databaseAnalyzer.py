from libs.audioHighlightAnalyzer import AudioHighlightAnalyzer
from libs.keyfinder import Keyfinder
from libs.tempofinder import Tempofinder 
from libs.audioToSVG import WaveToSVG
import librosa
import sys, json

""""
    Retrieve Key, BPM and Highlightsection of audio. Generate and write SVG waveform visualization.

    :arg audio_path: Path to the audio file.
    :arg output_svg_path (optional): Path to save the generated SVG. If no arg given, raw svg string is returned

"""

if len(sys.argv) > 1:
    try:
        audio_path = sys.argv[1]
        svg_out_path = sys.argv[2] if len(sys.argv) > 2 else None

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

        # # # Create Waveform SVG
        audio_to_svg = WaveToSVG(y,sr)
        svg = audio_to_svg.generate_svg_waveform(svg_out_path)
        

        analysis = {
            "key": key,
            "bpm": bpm,
            "highlight_section": highlight_section,
            "svg": svg
        }

        print(json.dumps(analysis))
        sys.stdout.flush()

    except Exception as e:
        print(f"Error: {e}", file=sys.stderr)
        sys.stderr.flush()
else:
    print("Please provide the full path of the audio as the #1 argument.")