from skimage.metrics import structural_similarity as ssim
import cv2
import os
import time

def detect_scene():
    script_dir = os.path.dirname(os.path.realpath(__file__))
    videos = ["T_outro_hard_cut_16_9_hd_preview.mp4", "dream_job.mp4", "em.mp4"]
    video_path = f"{script_dir}/test/{videos[1]}"

    # SSIM threshold for detecting scene change
    threshold = 0.5
    significant_frames = []
    count = 0

    # Open video capture
    vs = cv2.VideoCapture(video_path)
    ret, prev_frame = vs.read()
    
    if not ret:
        print("Failed to load video.")
        return
    
    while True:
        ret, next_frame = vs.read()
        if not ret:
            break

        # Resize frames for consistency (optional)
        # prev_frame = cv2.resize(prev_frame, (600, 400))
        # next_frame = cv2.resize(next_frame, (600, 400))

        # Split frames into RGB channels
        prev_r, prev_g, prev_b = cv2.split(prev_frame)
        next_r, next_g, next_b = cv2.split(next_frame)

        # Calculate SSIM for each color channel
        score_r, _ = ssim(prev_r, next_r, full=True)
        score_g, _ = ssim(prev_g, next_g, full=True)
        score_b, _ = ssim(prev_b, next_b, full=True)

        # Average SSIM score across all channels
        score = (score_r + score_g + score_b) / 3
        curFrameNo = int(vs.get(cv2.CAP_PROP_POS_FRAMES))

        # Print SSIM score for debug purposes
        print(f"SSIM score: {score:.2f} at frame {curFrameNo}")

        # Detect significant scene changes based on SSIM score
        if score < threshold:
            print(f"Scene change detected at frame {curFrameNo}")
            significant_frames.append(curFrameNo)
            count += 1

        # Show frame with overlayed text
        cv2.putText(next_frame, f"Frame {curFrameNo} - Scene {count} - {score:.2f}", (50, 50), 
                    cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 0, 0), 2)
        
        cv2.imshow('Current Frame', next_frame)

        # Press 'q' to quit early
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

        # time.sleep(0.1)
        # Move to the next frame
        prev_frame = next_frame

    # Cleanup
    vs.release()
    cv2.destroyAllWindows()
    print("Detected scene changes at frames:", significant_frames)

if __name__ == '__main__':
    detect_scene()