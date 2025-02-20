#!/bin/bash
# sample_videos_multi.sh
# This script extracts segments of various durations from an input MP4
# and converts each segment into multiple common formats:
# MP4, MOV, MKV, AVI, and WMV.
#
# Usage: ./sample_videos_multi.sh input.mp4

# Check for the input file
if [ -z "$1" ]; then
    echo "Usage: $0 input.mp4"
    exit 1
fi

INPUT_FILE="$1"

# Verify that the input file exists
if [ ! -f "$INPUT_FILE" ]; then
    echo "Error: File '$INPUT_FILE' not found."
    exit 1
fi

# Define desired segment durations (in seconds): 30s up to 120s
durations=(1 30 120)

# Define target formats
formats=("mp4" "mov" "mkv" "avi" "wmv")

# Retrieve the total duration (in seconds) using ffprobe
total_duration=$(ffprobe -v error -select_streams v:0 -show_entries format=duration \
               -of default=noprint_wrappers=1:nokey=1 "$INPUT_FILE")
total_duration=${total_duration%.*}  # Convert to integer

echo "Total video duration: ${total_duration}s"

# Loop through each desired segment duration
for seg_duration in "${durations[@]}"; do
    # Ensure the segment can fit in the source video
    max_start=$(( total_duration - seg_duration ))
    if [ $max_start -le 0 ]; then
        echo "Skipping duration ${seg_duration}s: source video is too short."
        continue
    fi

    # Choose a random start time between 0 and max_start (inclusive)
    start_time=$(( RANDOM % (max_start + 1) ))

    echo "Processing segment: duration=${seg_duration}s, start=${start_time}s"

    # Create a temporary segment file (re-encoded to H.264/AAC in MP4)
    temp_segment="temp_segment_${seg_duration}s_start${start_time}s.mp4"
    echo "  Extracting temporary segment to ${temp_segment}..."
    ffmpeg -hide_banner -loglevel error -ss "$start_time" -i "$INPUT_FILE" -t "$seg_duration" \
           -c:v libx264 -preset medium -crf 23 -c:a aac -b:a 128k "$temp_segment"
    if [ $? -ne 0 ]; then
        echo "  Error extracting segment; skipping duration ${seg_duration}s."
        continue
    fi

    # Convert the temporary segment into each target format
    for fmt in "${formats[@]}"; do
        output_file="sample_${seg_duration}s.${fmt}"
        if [ -f "$output_file" ]; then
            echo "  Output file ${output_file} already exists; skipping."
            continue
        fi
        echo "  Converting to ${fmt} -> ${output_file}"
        case "$fmt" in
            mp4|mov|mkv)
                # These containers work well with H.264 and AAC.
                ffmpeg -hide_banner -loglevel error -i "$temp_segment" \
                    -c:v libx264 -preset medium -crf 23 -c:a aac -b:a 128k "$output_file"
                ;;
            avi)
                # For AVI, use MPEG-4 video and MP3 audio.
                ffmpeg -hide_banner -loglevel error -i "$temp_segment" \
                    -c:v mpeg4 -qscale:v 5 -c:a libmp3lame -qscale:a 5 "$output_file"
                ;;
            wmv)
                # For WMV, use the WMV2 video codec and WMA audio.
                ffmpeg -hide_banner -loglevel error -i "$temp_segment" \
                    -c:v wmv2 -b:v 800k -c:a wmav2 -b:a 128k "$output_file"
                ;;
            *)
                echo "    Unknown format: ${fmt} (skipping)"
                continue
                ;;
        esac
        if [ $? -eq 0 ]; then
            echo "    Created ${output_file}"
        else
            echo "    Error creating ${output_file}"
        fi
    done

    # Remove the temporary segment file
    rm "$temp_segment"
done

echo "Processing complete."
