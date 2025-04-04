import os
import numpy as np
import cv2
import json

class ColorDetection:
    def __init__(self, videoPath, showVideoPlayer=False):

        self.moments_config = self.loadMomentsConfig()

        self.videoPath = videoPath
        self.showVideoPlayer = showVideoPlayer
        self.video = cv2.VideoCapture(self.videoPath)
        self.fps, self.total_frames, self.duration_secs, self.frame_width, self.frame_height = self.getVideoProperties()

        self.rescale_factor = 0.25
        self.rescaled_frame_width = int(self.frame_width*self.rescale_factor)
        self.rescaled_frame_height = int(self.frame_height*self.rescale_factor)

        self.total_rescaled_pixels = int(self.rescaled_frame_height * self.rescaled_frame_width)
        self.color_pixel_treshold = 0.5
        self.minimumMomentDuration = 0.5
        self.lastFineFrameDetected = False

        self.frameSearchSkip = self.fps*self.minimumMomentDuration 
        self.searchMode = 'rough'
        self.magenta_ratios = []
        self.currentMomentStart = 0
        self.currentMomentEnd = 0


        magenta_hue = 328 / 2  # Convert degrees to OpenCV scale (0-180)
        magenta_tolerance = 10  # Adjust as needed
        self.lower_magenta = np.array([magenta_hue - magenta_tolerance, 50, 50])
        self.upper_magenta = np.array([magenta_hue + magenta_tolerance, 255, 255])

        self.droppedOutMoments = []
        self.detectedMoments = []
        self.sortedMoments = []
        
    def loadMomentsConfig(self):
        #PROD different path
        
        file_dir = os.path.dirname(os.path.realpath(__file__))
        config_path = os.path.join(file_dir, '..', '..', '..', 'frontend', '..', 'src', 'libs', 'magenta_moments.json')
        config_path = os.path.realpath(config_path)

        with open(config_path, 'r') as config_file:
            moments_config = json.load(config_file)

        return moments_config
    
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
    
    def makeMomentDict(self, startTime, endTime, magenta_ratio):

        length = round(endTime-startTime, 3)
        relevance = round((magenta_ratio+0.5*length)/2, 3)

        momentDict = {
            "name": None,
            "type": "magenta",
            "startTime": startTime,
            "endTime": endTime,
            "length": length,
            "magenta_ratio": magenta_ratio,
            "relevance":  relevance,
            "faces": {"detected": False},
            "active": False,
            "id": len(self.detectedMoments),
            "tooltip": {"key": False, "type": False}

        }

        return momentDict


    def chooseRandomMoment(self, moment):

        available_moments = list(self.moments_config.keys())  # Convert dict_keys to a list
        return available_moments[moment['id'] % len(available_moments)]  # Ensures it stays within bounds
        # if (moment['length']) > 1:
        #     return 'arpeggio_riser'
        # else:
        #     return 'direct_impact'


    def addMoment(self, magenta_ratio):
        moment = self.makeMomentDict(self.currentMomentStart, self.currentMomentEnd, magenta_ratio)
        moment['name'] = self.chooseRandomMoment(moment)
        self.detectedMoments.append(moment)
        if self.showVideoPlayer:
            print("Added:", moment)
        
    def dropMoment(self, magenta_ratio):
        moment = self.makeMomentDict(self.currentMomentStart, self.currentMomentEnd, magenta_ratio)
        self.droppedOutMoments.append(moment)
        if self.showVideoPlayer:
            print("Dropped out:", moment)

    def sortMoments(self):
        sortedMoments = self.detectedMoments
        return sortedMoments
    
    def detectMomentFine(self, magenta_ratio):

        if self.lastFineFrameDetected:
            if magenta_ratio >= self.color_pixel_treshold:
                self.currentMomentEnd = self.getCurrentTime()
                self.magenta_ratios.append(magenta_ratio)
                return True
            else:
                self.currentMomentEnd = self.getCurrentTime()
                mean_magenta_ratio = sum(self.magenta_ratios) / len(self.magenta_ratios)

                if (self.currentMomentEnd - self.currentMomentStart) >= self.minimumMomentDuration:
                    self.addMoment(mean_magenta_ratio)
                else:
                    self.dropMoment(mean_magenta_ratio)

                self.currentMomentStart = 0
                self.currentMomentEnd = 0
                self.searchMode = 'rough'
                self.magenta_ratios = []

                return False
        else:
            if magenta_ratio >= self.color_pixel_treshold:
                self.currentMomentStart =  self.getCurrentTime()
                self.searchMode = 'rough'
                return True
            else:
                return False

    def detectedMomentsRough(self, magenta_ratio, next_frame):

        if (self.currentMomentStart):
            if magenta_ratio <= self.color_pixel_treshold:
                self.video.set(cv2.CAP_PROP_POS_FRAMES, next_frame - self.frameSearchSkip)
                return 'fine'
            else:
                return 'rough'
            
        else:
            if magenta_ratio >= self.color_pixel_treshold:
                self.video.set(cv2.CAP_PROP_POS_FRAMES, next_frame - self.frameSearchSkip)
                self.magenta_ratios.append(magenta_ratio)
                return 'fine'
            else:
                return 'rough'

    def detectMoments(self):
        isDetecting = True

        while isDetecting:
            try:
                current_frame = self.video.get(cv2.CAP_PROP_POS_FRAMES)

                if self.searchMode == 'rough':
                    next_frame = current_frame + self.frameSearchSkip
                elif self.searchMode == 'fine':
                    next_frame = current_frame + 1

                self.video.set(cv2.CAP_PROP_POS_FRAMES, next_frame)
                ret, frame = self.video.retrieve()
                resized_frame = cv2.resize(frame, (self.rescaled_frame_width, self.rescaled_frame_height))

                if not ret:
                    break

                mask = self.toMask(resized_frame)


                white_pixels = cv2.countNonZero(mask)
                magenta_ratio = white_pixels / self.total_rescaled_pixels

                if self.searchMode == 'rough':
                    self.searchMode = self.detectedMomentsRough(magenta_ratio, next_frame)
                elif self.searchMode == 'fine':
                    self.lastFineFrameDetected = self.detectMomentFine(magenta_ratio)

                ## End Condition
                if self.getCurrentTime() >= self.duration_secs:
                    
                    if self.currentMomentStart:
                        self.dropMoment(magenta_ratio)
                        
                    isDetecting = False


                if self.showVideoPlayer:
                    # bitMask = cv2.bitwise_and(frame, frame, mask=mask)

                    message = f"Magenta Ratio: {magenta_ratio*100:.2f}% | Moment: {self.lastFineFrameDetected} | Number Moments: {len(self.detectedMoments)}"

                    cv2.putText(resized_frame, message, (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 
                            (1.5*self.rescale_factor), (255, 255, 0), 1, cv2.LINE_AA)
                    
                    cv2.putText(mask, message, (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 
                            (1.5*self.rescale_factor), (255, 255, 0), 1, cv2.LINE_AA)

                    cv2.imshow('Bitmask', mask)
                    cv2.moveWindow('Bitmask', 0, 100)  # Position Bitmask window at (100, 100)

                    # cv2.imshow('Bitmask', bitMask)
                    cv2.imshow('Video', resized_frame)
                    cv2.moveWindow('Video', 500, 100)  # Position Video window to the right of Bitmask window


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
    