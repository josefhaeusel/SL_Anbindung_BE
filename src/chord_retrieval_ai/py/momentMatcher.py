import numpy as np
import librosa
import librosa.display
import os, json
from sklearn.metrics.pairwise import cosine_similarity

# mfcc vektoren von oneshots vorkalkulieren und abspeichern
# die hierarchie der matches sortiert in interface abbilden
# Tonal mit Noise gegenmatchen

class MomentMatcher(object):
    def __init__(self, waveform, sr, moment):

        self.file_dir = os.path.dirname(os.path.realpath(__file__))
        self.moments_config = self.loadMomentsConfig()

        self.duration = librosa.get_duration(y=waveform, sr=sr) 
        self.waveform = waveform
        self.sr = sr
        self.moment_start = moment["startTime"]

        self.analysis_tolerance = 0.5
        self.y_start = librosa.time_to_samples(max(float(moment["startTime"])-self.analysis_tolerance, 0), sr=sr)
        self.y_end = librosa.time_to_samples(min(float(moment["startTime"])+self.analysis_tolerance, self.duration), sr=sr)

        self.y_segment = self.waveform[self.y_start:self.y_end]

               

    
    def loadMomentsConfig(self):
            #PROD different path
            config_path = os.path.join(self.file_dir, '..', '..', '..', 'frontend', '..', 'src', 'libs', 'magenta_moments.json')
            config_path = os.path.realpath(config_path)

            with open(config_path, 'r') as config_file:
                moments_config = json.load(config_file)

            return moments_config
    
    def getSamplePath(self, moment_sample_path):
        file_dir = os.path.dirname(os.path.realpath(__file__))
        abs_moment_path = os.path.join(file_dir, '..', '..', '..', moment_sample_path)
        return abs_moment_path

    def getMFCCScore(self, moment_y, moment_sr):
        moment_mfccs = librosa.feature.mfcc(y=moment_y, sr=moment_sr, n_mfcc=13)
        min_columns = min(self.mfcc_feature.shape[1], moment_mfccs.shape[1])
        reference_mfccs = self.mfcc_feature[:, :min_columns]
        moment_mfccs = moment_mfccs[:, :min_columns]

        self.embedding = np.mean(reference_mfccs, axis=1)
        moment_embedding = np.mean(moment_mfccs, axis=1)

        similarity = cosine_similarity([self.embedding], [moment_embedding])

        return float(similarity[0][0])

    def getSpectralFlatnessScore(self, moment_y):
        min_columns = self.spectral_flatness_feature.shape[1]
        moment_feature = librosa.feature.spectral_flatness(y=moment_y)
        min_columns = min(min_columns, moment_feature.shape[1])
        self.spectral_flatness_feature = self.spectral_flatness_feature[:, :min_columns]
        moment_feature = moment_feature[:, :min_columns]
        contrast_similarity = np.mean(np.abs(self.spectral_flatness_feature - moment_feature))
        normalized_similarity = 1 - contrast_similarity / np.max([np.abs(self.spectral_flatness_feature), np.abs(moment_feature)])

        return normalized_similarity
         
    def loadAndTrimMoment(self, moment):

        # Trims moment according to synchronicity with startTime. Overhanging beginning and tail get cut off.

        abs_moment_path = self.getSamplePath(moment["path"])
        moment_impact_time = moment["impact_time"]
        moment_y, moment_sr = librosa.load(abs_moment_path)
        moment_start_time = max(moment_impact_time - self.analysis_tolerance, 0)
        moment_end_time = min(moment_impact_time + self.analysis_tolerance, librosa.get_duration(y=moment_y, sr=moment_sr))
        moment_start_sample = librosa.time_to_samples(moment_start_time, sr=self.sr)
        moment_end_sample = librosa.time_to_samples(moment_end_time, sr=self.sr)
        
        moment_y = moment_y[moment_start_sample:moment_end_sample]

        return moment_y, moment_sr

    def getSimilarityScores(self):

        self.spectral_flatness_feature = librosa.feature.spectral_flatness(y=self.y_segment)
        self.mfcc_feature = librosa.feature.mfcc(y=self.y_segment, sr=self.sr, n_mfcc=13)

        similarity_scores = []
        for key, value in self.moments_config.items():
            
            moment_y, moment_sr = self.loadAndTrimMoment(value)

            spectral_flatness_similarity = self.getSpectralFlatnessScore(moment_y)
            mfcc_similarity = self.getMFCCScore(moment_y, moment_sr)*0.8

            score = ((mfcc_similarity)+(spectral_flatness_similarity))/2

            similarity_score = {"name": key, "score": round(score,3),
                                "flatness": round(spectral_flatness_similarity,3),
                                "mfcc": round(mfcc_similarity,3)}
            
            # MEASURE AND SET LOCAL LOUDNESS

            similarity_scores.append(similarity_score)

        similarity_scores = sorted(similarity_scores, key=lambda x: x["score"], reverse=True)

        return similarity_scores