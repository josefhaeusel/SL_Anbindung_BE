import os
import numpy as np
import cv2

def resizeUHDtoHD(img):

    if img.shape[0] == 3840 and img.shape[1] == 2160 or img.shape[1] == 3840 and img.shape[0] == 2160:
        img = cv2.resize(img, (0, 0), fx=0.5, fy=0.5)
        print(f"Resized image from UHD to {img.shape}")
    
    return img

def setVideoBeforeEnd(video, secondsBeforeEnd=5):
    # Get video properties
    fps = video.get(cv2.CAP_PROP_FPS)  # Frame rate
    total_frames = int(video.get(cv2.CAP_PROP_FRAME_COUNT))  # Total number of frames
    duration = total_frames / fps  # Total duration in seconds

    # Calculate the start frame
    start_time = duration - secondsBeforeEnd
    start_frame = int(start_time * fps)
    
    # Set the video position
    video.set(cv2.CAP_PROP_POS_FRAMES, start_frame)

script_dir = os.path.dirname(os.path.realpath(__file__))
imgPath = f'{script_dir}/test/t_uhd_9-16.png'
templatePath = f'{script_dir}/test/t_hd_16-9_half_cropped.png'
videos = ["T_outro_hard_cut_16_9_hd_preview.mp4","Telekom_TeacherEnding_Max.mp4"]
videoPath= f"{script_dir}/test/{videos[0]}"

methods = [cv2.TM_CCOEFF, cv2.TM_CCOEFF_NORMED, cv2.TM_CCORR,
            cv2.TM_CCORR_NORMED, cv2.TM_SQDIFF, cv2.TM_SQDIFF_NORMED]

def matchVideoFrames(videoPath, templatePath, method):

    video = cv2.VideoCapture(videoPath)
    setVideoBeforeEnd(video)
    template =  cv2.imread(templatePath, 0)
    h, w = template.shape
    threshold = 0.95


    while(True):
        try:
            ret, frame = video.read()
            frame2 = cv2.cvtColor(frame.copy(), cv2.COLOR_BGR2GRAY)
            resizeUHDtoHD(frame2)

            result = cv2.matchTemplate(frame2, template, method)
            min_val, max_val, min_loc, max_loc = cv2.minMaxLoc(result)

            if method == cv2.TM_SQDIFF_NORMED:
                match_found = (min_val <= (1-threshold))
                print("MIN_VAL",min_val)

            else:
                match_found = (max_val >= threshold)
                print("MAX_VAL",max_val)

            if match_found:
                if method == cv2.TM_SQDIFF_NORMED:
                    location = min_loc
                else:
                    location = max_loc

                bottom_right = (location[0] + w, location[1] + h)
                cv2.rectangle(frame, location, bottom_right, 255, 5)
                cv2.imshow('Detected', frame)
                print("DETECTED")

            else:
                cv2.imshow('Not Detected', frame)
                print("NOT DETECTED")

            if cv2.waitKey(1) == ord('q'):
                break
        except Exception as e:
            print("Exception:", str(e))
            break

    video.release()
    cv2.destroyAllWindows()
    pass

#for method in methods:
matchVideoFrames(videoPath, templatePath, methods[1])



def matchImage(imgPath, templatePath):
    template =  cv2.imread(templatePath, 0)
    img = cv2.imread(imgPath)
    h, w = template.shape

    for method in methods:
        img2 = img.copy()

        result = cv2.matchTemplate(img2, template, method)
        min_val, max_val, min_loc, max_loc = cv2.minMaxLoc(result)
        if method in [cv2.TM_SQDIFF, cv2.TM_SQDIFF_NORMED]:
            location = min_loc
        else:
            location = max_loc

        bottom_right = (location[0] + w, location[1] + h)    
        cv2.rectangle(img2, location, bottom_right, 255, 5)
        cv2.imshow('Match', img2)
        cv2.waitKey(0)
        cv2.destroyAllWindows()

def calculateFrameRate():
    pass

def calculateLogoTime():
    pass