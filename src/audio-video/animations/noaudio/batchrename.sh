#!/bin/bash

# Set input folder (modify this if needed)
INPUT_FOLDER="./convert"  

# Loop through all video files
for file in "$INPUT_FOLDER"/*.mp4; do
    if [[ -f "$file" ]]; then
        # Extract width and height using ffprobe
        resolution=$(ffprobe -v error -select_streams v:0 -show_entries stream=width,height -of csv=p=0:s=x "$file")
        
        # Construct new filename
        new_filename="T_outro_claim_hard_cut_${resolution}.mp4"

        # Rename file
        mv "$file" "$INPUT_FOLDER/$new_filename"

        echo "Renamed: $file → $new_filename"
    fi
done