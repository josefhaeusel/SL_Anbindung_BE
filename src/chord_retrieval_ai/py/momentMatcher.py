import numpy as np
import librosa
import librosa.display
import os, json
from sklearn.metrics.pairwise import cosine_similarity

# mfcc vektoren von oneshots vorkalkulieren und abspeichern
# die hierarchie der matches sortiert in interface abbilden
# Tonal mit Noise gegenmatchen

class MomentMatcher(object):
    def __init__(self, waveform, sr):

        self.file_dir = os.path.dirname(os.path.realpath(__file__))
        self.moments_config = self.loadMomentsConfig()

        self.waveform = waveform
        self.sr = sr

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

    def getMFCCScore(self, moment_y,  moment_sr):

        self.mfcc = librosa.feature.mfcc(y=self.waveform, sr=self.sr, n_mfcc=13)
        self.embedding = np.mean(self.mfcc, axis=1)
        moment_mfccs = librosa.feature.mfcc(y=moment_y, sr=moment_sr, n_mfcc=13)
        moment_embedding = np.mean(moment_mfccs, axis=1)
        similarity = cosine_similarity([self.embedding], [moment_embedding])

        return float(similarity[0][0])


    def getSpectralFlatnessScore(self, moment_y ):
        
        min_columns = self.feature.shape[1]
        moment_feature = librosa.feature.spectral_flatness(y=moment_y)
        min_columns = min(min_columns, moment_feature.shape[1])
        self.feature = self.feature[:, :min_columns]
        moment_feature = librosa.feature.spectral_flatness(y=moment_y)
        moment_feature = moment_feature[:, :min_columns]
        contrast_similarity = np.mean(np.abs(self.feature - moment_feature))
        normalized_similarity = 1 - contrast_similarity / np.max([np.abs(self.feature), np.abs(moment_feature)])

        return normalized_similarity
         

    def getSimilarityScores(self):

        self.feature = librosa.feature.spectral_flatness(y=self.waveform)

        similarity_scores = []
        for key, value in self.moments_config.items():
            abs_moment_path = self.getSamplePath(value["path"])
            moment_y, moment_sr = librosa.load(abs_moment_path)

            # print(key, moment_flatness_agg)
            spectral_flatness_similarity = self.getSpectralFlatnessScore(moment_y)
            mfcc_similarity = self.getMFCCScore(moment_y, moment_sr)

            # score = ((mfcc_similarity)+(spectral_flatness_similarity))/2
            score = ((mfcc_similarity)+(spectral_flatness_similarity))/2

            similarity_score = {"name": key, "score": round(score,3),
                                "flatness": round(spectral_flatness_similarity,3),
                                "mfcc": round(mfcc_similarity,3)}
            # print(similarity_score)
            similarity_scores.append(similarity_score)

        similarity_scores = sorted(similarity_scores, key=lambda x: x["score"], reverse=True)

        return similarity_scores

        