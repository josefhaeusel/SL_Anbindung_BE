import librosa
import librosa.display
import numpy as np
from sklearn.cluster import KMeans
import contextlib, io
from pychorus import find_and_output_chorus



class AudioHighlightAnalyzer:
    def __init__(self, waveform, sr, audio_file):

        self.audio_file = audio_file
        self.y = waveform
        self.sr = sr
        self.length = librosa.get_duration(y=self.y, sr=self.sr)
        self.chorus = None
        self.chorus_length = 15

    def analyze_chorus(self):

        while self.chorus_length >= 4 and not self.chorus:
            with contextlib.redirect_stdout(io.StringIO()):  # Suppress print output
                chorus_secs = find_and_output_chorus(self.audio_file, None, clip_length=self.chorus_length)

            if chorus_secs is not None:
                self.chorus = {"start": round(chorus_secs, 2), "end": round(chorus_secs+self.chorus_length, 2), "chorus": True}
            else:
                self.chorus_length -= 1

        return self.chorus

    def smooth_derivative(self, data, window_size=50):

        kernel = np.ones(window_size) / window_size
        smoothed = np.convolve(data, kernel, mode='same')
        derivative = np.gradient(smoothed)
        return derivative

    def get_clustered_highlights(self, top_n=5):

        self.highlights = []

        self.onset_env = librosa.onset.onset_strength(y=self.y, sr=self.sr, aggregate=np.median)
        _, beat_frames = librosa.beat.beat_track(y=self.y, sr=self.sr)
        self.beat_times = librosa.frames_to_time(beat_frames, sr=self.sr)

        self.rms = librosa.feature.rms(y=self.y)[0]
        self.rms = self.rms / np.max(self.rms)
        self.spectral_contrast = librosa.feature.spectral_contrast(y=self.y, sr=self.sr)

        if len(self.beat_times) == 0:
            raise ValueError("No beat times detected to cluster.")

        # harmonic, percussive = librosa.effects.hpss(self.y)

        onset_env = librosa.onset.onset_strength(y=self.y, sr=self.sr, aggregate=np.median)

        rms_first_derivative = self.smooth_derivative(self.rms)
        rms_second_derivative = np.gradient(rms_first_derivative)

        spectral_first_derivative = self.smooth_derivative(self.spectral_contrast.mean(axis=0))
        spectral_second_derivative = np.gradient(spectral_first_derivative)

        times = np.array(self.beat_times).reshape(-1, 1)
        rms_values = [
            self.rms[librosa.time_to_frames([t], sr=self.sr)[0]]
            for t in self.beat_times
        ]
        contrast_values = [
            self.spectral_contrast[:, librosa.time_to_frames([t], sr=self.sr)[0]].mean()
            for t in self.beat_times
        ]
        onset_values = [
            onset_env[librosa.time_to_frames([t], sr=self.sr)[0]]
            for t in self.beat_times
        ]
        rms_first_derivative_values = [
            rms_first_derivative[librosa.time_to_frames([t], sr=self.sr)[0]]
            for t in self.beat_times
        ]
        rms_second_derivative_values = [
            rms_second_derivative[librosa.time_to_frames([t], sr=self.sr)[0]]
            for t in self.beat_times
        ]
        spectral_first_derivative_values = [
            spectral_first_derivative[librosa.time_to_frames([t], sr=self.sr)[0]]
            for t in self.beat_times
        ]
        spectral_second_derivative_values = [
            spectral_second_derivative[librosa.time_to_frames([t], sr=self.sr)[0]]
            for t in self.beat_times
        ]

        features = np.column_stack((
            times,
            rms_values,
            contrast_values,
            onset_values,
            rms_first_derivative_values,
            rms_second_derivative_values,
            spectral_first_derivative_values,
            spectral_second_derivative_values
        ))

        features[:, 1:] = (features[:, 1:] - features[:, 1:].mean(axis=0)) / features[:, 1:].std(axis=0)

        kmeans = KMeans(n_clusters=top_n, random_state=42).fit(features)

        highlights = []
        for cluster in range(top_n):
            cluster_indices = np.where(kmeans.labels_ == cluster)[0]

            cluster_times = self.beat_times[cluster_indices]
            cluster_rms = [
                self.rms[librosa.time_to_frames([t], sr=self.sr)[0]]
                for t in cluster_times
            ]
            cluster_scores = [
                1 * rms + (1 * contrast) + 1.0 * onset 
                for rms, contrast, onset,  in zip(
                    cluster_rms,
                    [contrast_values[idx] for idx in cluster_indices],
                    [onset_values[idx] for idx in cluster_indices],
                )
            ]

            best_idx = np.argmax(cluster_scores)
            highlights.append((cluster_times[best_idx], cluster_scores[best_idx]))

        # Normalize scores
        scores = [h[1] for h in highlights]
        min_score, max_score = min(scores), max(scores)
        if max_score > min_score:
            highlights = [(h[0], (h[1] - min_score) / (max_score - min_score)) for h in highlights]

        self.highlights = sorted(highlights, key=lambda x: x[0])
        #print("CLUSTERED HIGHLIGHTS WITH SMOOTHED DERIVATIVES", self.highlights)

        return self.highlights
    

    def get_most_important_highlight(self):

        chorus = self.analyze_chorus()
        chorus = None
        if chorus:
            return chorus
        else:
            best_highlight = self.get_clustered_highlights(top_n=1)
            best_highlight_start = round(best_highlight[0][0], 2)
            highlight_times = { "start":best_highlight_start, "end": round(best_highlight_start+5, 2), "chorus": False}

            return highlight_times