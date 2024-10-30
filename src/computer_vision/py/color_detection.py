import os
import numpy as np
import cv2

class ColorDetection:
    def __init__(self, videoPath):
        script_dir = os.path.dirname(os.path.realpath(__file__))
        self.videoPath = videoPath
        self.video = cv2.VideoCapture(self.videoPath)
        self.fps, self.total_frames, self.duration_secs, self.frame_width, self.frame_height = self.getVideoProperties()
        self.total_pixels = self.frame_height * self.frame_width
        self.color_pixel_treshold = 0.5
        self.minimumMomentDuration = 0.5
        self.lastFrameDetected = False

        # self.frameSearchSkip = 10
        self.frameSearchSkip = 1

        # self.analysisStartBeforeEnd = 6
        # self.analysisAbortBeforeEnd = 0.5


        #E20074 in HSV 233,255,226
        # magenta_bgr = np.array([[[0,0,0]]])
        # magenta_hsv = cv2.cvtColor(magenta_bgr, cv2.COLOR_BGR2HSV)[0][0]
        # print(magenta_hsv)
        magenta_hue = 328 / 2  # Convert degrees to OpenCV scale (0-180)
        magenta_tolerance = 10  # Adjust as needed

        # Define HSV bounds for magenta detection
        self.lower_magenta = np.array([magenta_hue - magenta_tolerance, 50, 50])
        self.upper_magenta = np.array([magenta_hue + magenta_tolerance, 255, 255])

        # self.detected_time = None
        self.droppedOutMoments = []
        self.detectedMoments = []
        self.sortedMoments = []
        
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


    def toMask(self, frame):
        hsv_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2HSV)
        mask = cv2.inRange(hsv_frame, self.lower_magenta, self.upper_magenta)
        return mask
    
    def makeMomentDict(self, startTime, endTime):

        momentDict = {
            "start": startTime,
            "end": endTime,
            "length": (endTime-startTime)
        }

        return momentDict

    def addMoment(self):
        moment = self.makeMomentDict(self.currentMomentStart, self.currentMomentEnd)
        self.detectedMoments.append(moment)
        print("Added:", moment)
        
    def dropMoment(self):
        moment = self.makeMomentDict(self.currentMomentStart, self.currentMomentEnd)
        self.droppedOutMoments.append(moment)
        print("Dropped out:", moment)

    def sortMoments(self):
        sortedMoments = self.detectedMoments
        return sortedMoments
    
    def detectMoment(self, magenta_ratio):

        # Stability Value und Länge, um am Ende die erkannten Momente zu priorisieren

        if self.lastFrameDetected:
            if magenta_ratio >= self.color_pixel_treshold:
                self.currentMomentEnd = self.getCurrentTime()
                return True
            else:
                self.currentMomentEnd = self.getCurrentTime()

                if (self.currentMomentEnd - self.currentMomentStart) >= self.minimumMomentDuration:
                    self.addMoment()
                else:
                    self.dropMoment()

                self.currentMomentStart = 0
                self.currentMomentEnd = 0

                return False
        else:
            if magenta_ratio >= self.color_pixel_treshold:
                self.currentMomentStart =  self.getCurrentTime()
                return True
            else:
                return False



    def detectMoments(self, showVideoPlayer=False):
        isDetecting = True

        while isDetecting:
            try:
                current_frame = self.video.get(cv2.CAP_PROP_POS_FRAMES)
                next_frame = current_frame + self.frameSearchSkip
                self.video.set(cv2.CAP_PROP_POS_FRAMES, next_frame)
                ret, frame = self.video.retrieve()

                if not ret:
                    break

                mask = self.toMask(frame)

                white_pixels = cv2.countNonZero(mask)
                magenta_ratio = white_pixels / self.total_pixels

                self.lastFrameDetected = self.detectMoment(magenta_ratio)

                if self.getCurrentTime() >= self.duration_secs:
                    isDetecting = False

                if showVideoPlayer:
                    # bitMask = cv2.bitwise_and(frame, frame, mask=mask)

                    message = f"Magenta Ratio: {magenta_ratio*100:.2f}%     Moment: {self.lastFrameDetected}    Number Moments: {len(self.detectedMoments)}"

                    cv2.putText(frame, message, (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 
                            1, (255, 255, 0), 2, cv2.LINE_AA)
                    
                    cv2.putText(mask, message, (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 
                            1, (255, 255, 0), 2, cv2.LINE_AA)

                    cv2.imshow('Bitmask', mask)
                    cv2.moveWindow('Bitmask', 0, 100)  # Position Bitmask window at (100, 100)

                    # cv2.imshow('Bitmask', bitMask)
                    cv2.imshow('Video', frame)
                    cv2.moveWindow('Video', 1000, 100)  # Position Video window to the right of Bitmask window


                    if cv2.waitKey(1) == ord('q'):
                        isDetecting = False

            except Exception as e:
                print(e)
                isDetecting = False

        self.video.release()
        cv2.destroyAllWindows()

        self.sortedMoments = self.sortMoments()
        response = {"detected_moments": self.detectedMoments, "dropped_out_moments": self.droppedOutMoments}

        return response
    