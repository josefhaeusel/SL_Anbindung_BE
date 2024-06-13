import os
import numpy as np
import cv2

class ComputerVision:
    def __init__(self, videoPath):
        script_dir = os.path.dirname(os.path.realpath(__file__))
        self.templatePath = f'{script_dir}/template5.png'
        self.template = cv2.imread(self.templatePath, 0)
        self.videoPath = videoPath
        self.video = cv2.VideoCapture(self.videoPath)
        self.fps, self.total_frames, self.duration_secs, self.frame_width, self.frame_height = self.getVideoProperties()
        self.threshold = 0.85

        self.secSearchSkip = 0.1
        self.frameSearchSkip = 10 #self.fps*self.secSearchSkip

        self.isUHD = self.checkUHD()

        self.analysisStartBeforeEnd = 6
        self.analysisAbortBeforeEnd = 0.5
        
        self.setVideoBeforeEnd()
        self.methods = [cv2.TM_CCOEFF, cv2.TM_CCOEFF_NORMED, cv2.TM_CCORR,
                        cv2.TM_CCORR_NORMED, cv2.TM_SQDIFF, cv2.TM_SQDIFF_NORMED]
        self.method = self.methods[1]

        self.detectedTime = None

    def checkUHD(self):
        if self.frame_width == 3840 and self.frame_height == 2160 or self.frame_height == 3840 and self.frame_width == 2160:
            return True
        else:
            return False

    def resizeUHDtoHD(self, frame):
        frame = cv2.resize(frame, (0, 0), fx=0.5, fy=0.5)
        return frame

    def getCurrentTime(self):
        currentFrame = self.video.get(cv2.CAP_PROP_POS_FRAMES)
        currentTime = currentFrame / self.fps
        return currentTime

    def getVideoProperties(self):
        fps = self.video.get(cv2.CAP_PROP_FPS)
        total_frames = int(self.video.get(cv2.CAP_PROP_FRAME_COUNT))
        duration_secs = total_frames / fps
        frame_width = int(self.video.get(cv2.CAP_PROP_FRAME_WIDTH))
        frame_height = int(self.video.get(cv2.CAP_PROP_FRAME_HEIGHT))
        return fps, total_frames, duration_secs, frame_width, frame_height

    def setVideoBeforeEnd(self):
        start_time = self.duration_secs - self.analysisStartBeforeEnd
        if start_time<0:
            start_time=0
        start_frame = int(start_time * self.fps)
        self.video.set(cv2.CAP_PROP_POS_FRAMES, start_frame)

    def setVideoBeforeEnd(self):
        start_time = self.duration_secs - self.analysisStartBeforeEnd
        start_frame = int(start_time * self.fps)
        self.video.set(cv2.CAP_PROP_POS_FRAMES, start_frame)

    def matchTemplateMultiScale(self, frame, template, method, scales):
        found = None
        h, w = template.shape[:2]

        for scale in scales:
            resized_template = cv2.resize(template, (int(w * scale), int(h * scale)))
            result = cv2.matchTemplate(frame, resized_template, method)
            min_val, max_val, min_loc, max_loc = cv2.minMaxLoc(result)

            if method in [cv2.TM_SQDIFF, cv2.TM_SQDIFF_NORMED]:
                if found is None or min_val < found[0]:
                    found = (min_val, min_loc, scale)
            else:
                if found is None or max_val > found[0]:
                    found = (max_val, max_loc, scale)

        return found

    def matchVideoFrames(self, showVideoPlayer=False):
        scales = np.linspace(0.1, 1.0, 10)[::-1]  # 10 scales from 0.1 to 1.0
        isDetecting = True

        while isDetecting:
            try:

                current_frame = self.video.get(cv2.CAP_PROP_POS_FRAMES)
                next_frame = current_frame + self.frameSearchSkip
                self.video.set(cv2.CAP_PROP_POS_FRAMES, next_frame)
                ret, frame = self.video.retrieve()

                if not ret:
                    break
                frame2 = cv2.cvtColor(frame.copy(), cv2.COLOR_BGR2GRAY)

                if self.isUHD:
                    self.resizeUHDtoHD(frame2)

                found = self.matchTemplateMultiScale(frame2, self.template, self.method, scales)
                #print("Current Frame", self.video.get(cv2.CAP_PROP_POS_FRAMES))
                #print("Detection", found)

                # Dropout Condition
                if (self.duration_secs - self.getCurrentTime()) < self.analysisAbortBeforeEnd:
                    isDetecting = False

                if found:
                    detection_value, location, scale = found
                    if self.method in [cv2.TM_SQDIFF, cv2.TM_SQDIFF_NORMED]:
                        match_found = detection_value <= (1 - self.threshold)
                    else:
                        match_found = detection_value >= self.threshold

                    if showVideoPlayer:
                        print("Logo Detection Accuracy", detection_value)

                    if match_found:
                        self.video.set(cv2.CAP_PROP_POS_FRAMES, next_frame - self.frameSearchSkip)
                        for i in range(self.frameSearchSkip + 1):
                            ret, frame = self.video.read()
                            if not ret:
                                break
                            frame2 = cv2.cvtColor(frame.copy(), cv2.COLOR_BGR2GRAY)

                            if self.isUHD:
                                self.resizeUHDtoHD(frame2)

                            found = self.matchTemplateMultiScale(frame2, self.template, self.method, scales)
                            if found:
                                detection_value, location, scale = found
                                #print("Current Frame", self.video.get(cv2.CAP_PROP_POS_FRAMES))
                                #print("Detection", found)

                                if self.method in [cv2.TM_SQDIFF, cv2.TM_SQDIFF_NORMED]:
                                    match_found = detection_value <= (1 - self.threshold)
                                else:
                                    match_found = detection_value >= self.threshold

                                if showVideoPlayer:
                                    print("Logo Detection Accuracy", detection_value)

                                if match_found:
                                    self.detectedTime = self.getCurrentTime()
                                    if showVideoPlayer:
                                        h, w = self.template.shape[:2]
                                        top_left = location
                                        bottom_right = (int(top_left[0] + w * scale), int(top_left[1] + h * scale))
                                        cv2.rectangle(frame, top_left, bottom_right, 255, 5)
                                        message = f"Logo Frame Matched. Accuracy: {detection_value * 100:.2f}%"
                                        cv2.putText(frame, message, (top_left[0], bottom_right[1] + 50), cv2.FONT_HERSHEY_DUPLEX, 0.7, (255, 0, 0))
                                    else:
                                        isDetecting = False
                                    break

                    if showVideoPlayer:
                        cv2.imshow('Video', frame)
                        if match_found:
                            cv2.waitKey(200)

                        if cv2.waitKey(1) == ord('q'):
                            isDetecting = False

            except Exception as e:
                isDetecting = False

        self.video.release()
        cv2.destroyAllWindows()

        if self.detectedTime is not None:
            response = {"logo_start": self.detectedTime,
                        "positionBeforeEnd": self.duration_secs - self.detectedTime,
                        "videoResolution": [self.frame_width, self.frame_height]
                        }
            return response
        else:
            response = {"logo_start": "None",
                        "videoResolution": [self.frame_width, self.frame_height]
                        }
            return response
