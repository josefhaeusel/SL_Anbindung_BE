import os
import numpy as np
import cv2

class ComputerVision:
    def __init__(self, videoPath):

        script_dir = os.path.dirname(os.path.realpath(__file__))
        self.templatePath = f'{script_dir}/template.png'
        self.template = cv2.imread(self.templatePath, 0)
        self.videoPath = videoPath
        self.video = cv2.VideoCapture(self.videoPath)
        self.fps, self.total_frames, self.duration_secs = self.getVideoProperties()
        print(self.duration_secs, self.total_frames, self.fps)
        self.current_frame = self.total_frames - 1
        self.endDetectionFrame = self.total_frames - (7*self.fps)
        #self.setVideoBeforeEnd()
        self.methods = [cv2.TM_CCOEFF, cv2.TM_CCOEFF_NORMED, cv2.TM_CCORR,
            cv2.TM_CCORR_NORMED, cv2.TM_SQDIFF, cv2.TM_SQDIFF_NORMED]
        self.method = self.methods[1]
        
        self.detectedTime = None

    def resizeUHDtoHD(self, frame):

        if frame.shape[0] == 3840 and frame.shape[1] == 2160 or frame.shape[1] == 3840 and frame.shape[0] == 2160:
            frame = cv2.resize(frame, (0, 0), fx=0.5, fy=0.5)
            print(f"Resized image from UHD to {frame.shape}")
        
        return frame

    def getCurrentTime(self):
        currentFrame = self.video.get(cv2.CAP_PROP_POS_FRAMES)
        currentTime = currentFrame / self.fps

        return currentTime

    def getVideoProperties(self):
        fps = self.video.get(cv2.CAP_PROP_FPS)
        total_frames = int(self.video.get(cv2.CAP_PROP_FRAME_COUNT))
        duration_secs = total_frames / fps

        return fps, total_frames, duration_secs

    def setVideoBeforeEnd(self, secondsBeforeEnd=5):

        start_time = self.duration_secs - secondsBeforeEnd
        start_frame = int(start_time * self.fps)
        self.video.set(cv2.CAP_PROP_POS_FRAMES, start_frame)

    def matchVideoFrames(self, showVideoPlayer = False, method_id = 1):

        h, w = self.template.shape
        threshold = 0.95
        isDetecting = True
        self.video.set(cv2.CAP_PROP_POS_FRAMES, self.current_frame)

        while(isDetecting) and self.current_frame > self.endDetectionFrame:
            try:
                self.video.set(cv2.CAP_PROP_POS_FRAMES, self.current_frame)
                ret, frame = self.video.read()
                frame2 = cv2.cvtColor(frame.copy(), cv2.COLOR_BGR2GRAY)
                self.resizeUHDtoHD(frame2)

                result = cv2.matchTemplate(frame2, self.template, self.method)
                min_val, max_val, min_loc, max_loc = cv2.minMaxLoc(result)

                if self.method == cv2.TM_SQDIFF_NORMED:
                    match_found = (min_val <= (1-threshold))
                    detection_value = min_val

                else:
                    match_found = (max_val >= threshold)
                    detection_value = max_val

                print("Logo Detection Accuracy", detection_value)

                if match_found:
                    print("DETECTED")
                    self.detectedTime = self.getCurrentTime()

                    if showVideoPlayer:
                        #Draw Analysis Rectangle
                        if self.method == cv2.TM_SQDIFF_NORMED:
                            location = min_loc
                        else:
                            location = max_loc
                        
                        bottom_right = (location[0] + w, location[1] + h)
                        cv2.rectangle(frame, location, bottom_right, 255, 5)
                        message = f"Logo Frame Matched. Accuracy: {detection_value*100:.2f}%"

                        cv2.putText(frame, message, (location[0], bottom_right[1]+50), cv2.FONT_HERSHEY_DUPLEX, 0.7, (255, 0, 0))
                    else:
                        isDetecting = False
                    
                else:
                    print("NOT DETECTED")

                if showVideoPlayer:   
                    cv2.imshow('Video', frame)
                    if match_found == True:
                        cv2.waitKey(1000)

                    if cv2.waitKey(1) == ord('q'):
                        isDetecting = False
                
                self.current_frame -= 1

            except Exception as e:
                print("Exception:", str(e))
                isDetecting = False

        self.video.release()
        cv2.destroyAllWindows()
        
        if self.detectedTime is not None:
            return self.detectedTime
        else:
            return "No logo detected"
