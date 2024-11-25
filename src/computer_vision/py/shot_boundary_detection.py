from skimage.metrics import structural_similarity as ssim
import os
import numpy as np
import cv2
import json
import time

class ShotBoundaryDetection:
    def __init__(self, videoPath, showVideoPlayer=False):

        self.moments_config = self.loadMomentsConfig()

        self.videoPath = videoPath
        self.showVideoPlayer = showVideoPlayer
        self.video = cv2.VideoCapture(self.videoPath)
        self.face_cascade= self.loadCascades()
        self.fps, self.total_frames, self.duration_secs, self.frame_width, self.frame_height = self.getVideoProperties()

        self.rescale_factor = 0.25
        self.rescaled_frame_width = int(self.frame_width*self.rescale_factor)
        self.rescaled_frame_height = int(self.frame_height*self.rescale_factor)

        self.total_rescaled_pixels = int(self.rescaled_frame_height * self.rescaled_frame_width)
        self.delta_threshold = -0.25
        self.minimumMomentDuration = 0.5
        self.lastFineFrameDetected = False
        self.face_detected = False
        self.faces = None

        self.current_frame_pos = 0
        self.frameSearchSkip = self.fps*self.minimumMomentDuration
        self.searchMode = 'rough'
        self.currentMomentStart = 0
        self.currentMomentEnd = 0

        self.droppedOutMoments = []
        self.detectedMoments = []
        self.sortedMoments = []
    
    def loadCascades(self):
        file_dir = os.path.dirname(os.path.realpath(__file__))

        face_cascade_xml = os.path.join(file_dir, "haarcascade_frontalface_default.xml")
        face_cascade = cv2.CascadeClassifier()
        face_cascade.load(face_cascade_xml)

        return face_cascade


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


    def makeMomentDict(self, delta_score, face_detected, faces):

        momentDict = {
            "name": None,
            "type": "cut",
            "startTime": self.currentMomentStart,
            "endTime": self.currentMomentEnd,
            "length": (self.currentMomentEnd - self.currentMomentStart),
            "delta_score": delta_score,
            "faces": { "detected": face_detected, "faces": faces},
            # "faces": {"detected": False},
            "active": False,
            "id": len(self.detectedMoments),
            "frame": self.current_frame_pos,
        }

        # if face_detected:
        #     momentDict["faces"]["detected"] = face_detected

            # momentDict["faces"]["number"] = len(self.faces)
            # momentDict["faces"]["positions_xywh"] = self.faces


        return momentDict


    def chooseRandomMoment(self, moment):

        available_moments = list(self.moments_config.keys())  # Convert dict_keys to a list
        return available_moments[moment['id'] % len(available_moments)]  # Ensures it stays within bounds
        # if (moment['length']) > 1:
        #     return 'arpeggio_riser'
        # else:
        #     return 'direct_impact'


    def addMoment(self, delta_score, face_detected, faces):
        moment = self.makeMomentDict(delta_score, face_detected, faces)
        moment['name'] = self.chooseRandomMoment(moment)
        self.detectedMoments.append(moment)
        if self.showVideoPlayer:
            print("Added:", moment)
        

    def sortMoments(self):
        sortedMoments = self.detectedMoments
        return sortedMoments
    
    def detectFace(self, current_frame):
        
        frame_gray = cv2.cvtColor(current_frame, cv2.COLOR_BGR2GRAY)
        frame_gray = cv2.equalizeHist(frame_gray)
        faces = self.face_cascade.detectMultiScale(frame_gray, minSize=(100,100))
        face_detected = len(faces) > 0

        if face_detected:
            faces = faces.tolist()
            face_detected = True
        else:
            faces = []

        return faces, face_detected

    def detectMomentFine(self, delta_score, current_frame):

            if delta_score <= self.delta_threshold:
                self.currentMomentStart =  self.getCurrentTime()
                self.currentMomentEnd =  self.getCurrentTime()+0.25

                self.faces, self.face_detected = self.detectFace(current_frame)
                self.addMoment(delta_score, self.face_detected, self.faces)

                self.currentMomentStart = 0
                self.currentMomentEnd = 0
                if self.showVideoPlayer:
                    print("Returning to ROUGH", self.current_frame_pos)
                return 'rough'
            else:
                if self.showVideoPlayer:
                    print("fine", self.current_frame_pos)
                return 'fine'

    def detectedMomentsRough(self, delta_score):

    
            if delta_score <= self.delta_threshold:
                self.video.set(cv2.CAP_PROP_POS_FRAMES, self.current_frame_pos - self.frameSearchSkip)
                if self.showVideoPlayer:
                    print("Changing to FINE from", self.current_frame_pos, self.current_frame_pos - self.frameSearchSkip)
                return 'fine'
            else:
                if self.showVideoPlayer:
                    print("rough", self.current_frame_pos)
                return 'rough'


    def detectMoments(self):
        isDetecting = True
        previous_score = 1
        self.video.set(cv2.CAP_PROP_POS_FRAMES, self.current_frame_pos)
        prev_ret, prev_frame = self.video.read()

        while isDetecting:
            try:
                self.current_frame_pos = self.video.get(cv2.CAP_PROP_POS_FRAMES)

                if self.searchMode == 'rough':
                    self.current_frame_pos = self.current_frame_pos + self.frameSearchSkip
                else:
                    self.current_frame_pos = self.current_frame_pos + 1

                self.video.set(cv2.CAP_PROP_POS_FRAMES, self.current_frame_pos)
                ret, current_frame = self.video.retrieve()
                resized_prev_frame = cv2.resize(prev_frame, (self.rescaled_frame_width, self.rescaled_frame_height))
                resized_current_frame = cv2.resize(current_frame, (self.rescaled_frame_width, self.rescaled_frame_height))

                if not ret:
                    break

                prev_hsv = cv2.cvtColor(resized_prev_frame, cv2.COLOR_BGR2HSV)
                current_hsv = cv2.cvtColor(resized_current_frame, cv2.COLOR_BGR2HSV)

                prev_h, prev_s, prev_v = cv2.split(prev_hsv)
                current_h, current_s, current_v = cv2.split(current_hsv)

                score_h, _ = ssim(prev_h, current_h, full=True)
                score_s, _ = ssim(prev_s, current_s, full=True)
                score_v, _ = ssim(prev_v, current_v, full=True)

                current_score = (score_h + score_s + score_v) / 3
                delta_score = current_score - previous_score # Previous Scores Mean Value?

                if self.searchMode == 'rough':
                    self.searchMode = self.detectedMomentsRough(delta_score)
                else:
                    self.searchMode = self.detectMomentFine(delta_score, current_frame)

                prev_frame = current_frame
                previous_score = current_score

                if self.getCurrentTime() >= self.duration_secs:     
                    isDetecting = False

                if self.showVideoPlayer:
                    # bitMask = cv2.bitwise_and(frame, frame, mask=mask)

                    message = f"SSIM score: {current_score:.2f} | Delta: {abs(delta_score):.2f} | Number Moments {len(self.detectedMoments)}"

                    if self.face_detected:
                        for (x,y,w,h) in self.faces:
                            cv2.rectangle(current_frame, (x, y), (x + w, y + h), (255, 0, 255), 4)
                    cv2.putText(current_frame, message, (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 
                            (1.5*self.rescale_factor), (255, 255, 0), 1, cv2.LINE_AA)
                    
                    cv2.imshow('Video', current_frame)
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
    