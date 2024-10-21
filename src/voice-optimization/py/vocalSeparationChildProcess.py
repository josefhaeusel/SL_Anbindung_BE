
from audio_separator.separator import Separator
import sys, os, json

if len(sys.argv) > 1:
    try:
        input_audio_path = sys.argv[1]
        input_audio_parsed = os.path.splitext(os.path.basename(input_audio_path))
        input_audio_extension = input_audio_parsed[len(input_audio_parsed)-1]
        input_audio_basename = input_audio_parsed[len(input_audio_parsed)-2]

        output_dir = os.path.dirname(os.path.abspath(input_audio_path))
        vocals_out = os.path.join(output_dir, input_audio_basename+'-vocals'+input_audio_extension)
        background_out = os.path.join(output_dir, input_audio_basename+'-background'+input_audio_extension)
        # # Initialize the Separator class (with optional configuration properties, below)
        separator = Separator(output_dir=output_dir, amplification_threshold=0.1, normalization_threshold=0.9, model_file_dir=os.path.join(os.path.dirname(__file__), "separation_model"))
        # # Später nochmal durch Volume Detection schicken
        
        # Splitting a track into Vocal and Instrumental
        separator.load_model()
        separated_files = separator.separate(input_audio_path)
        os.rename(os.path.join(output_dir, separated_files[0]), background_out)
        os.rename(os.path.join(output_dir, separated_files[1]), vocals_out) 

        result = {
            "voice": vocals_out,
            "background": background_out
        }

        print(json.dumps(result))
        sys.stdout.flush()

    except Exception as e:
        print(f"Error: {e}", file=sys.stderr)
        sys.stderr.flush()

else:
    print("Please provide a song name as an argument.")



    
