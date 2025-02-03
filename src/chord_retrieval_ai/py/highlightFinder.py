import librosa
import librosa.display
import numpy as np
import matplotlib.pyplot as plt
import os
from midiutil import MIDIFile
from sklearn.cluster import KMeans
# from pychorus import create_chroma
# from pychorus.similarity_matrix import TimeTimeSimilarityMatrix, TimeLagSimilarityMatrix
from pychorus import find_and_output_chorus



class AudioHighlightAnalyzer:
    def __init__(self, audio_file, sr=None):

        self.audio_file = audio_file
        self.sr = sr
        self.y, self.sr = librosa.load(audio_file, sr=sr)
        self.length = librosa.get_duration(y=self.y, sr=self.sr)
        self.chorus_found = False
        self.chorus_length = 15

        self.highlights = []

    def analyze_highlights(self, top_n=5):


        print("\n", "self.beat_times",self.beat_times)
        
        onset_times = librosa.onset.onset_detect(y=self.y, sr=self.sr, units='time')
        
        # self.rms = librosa.feature.rms(y=self.y)[0]
        # self.rms = self.rms / np.max(self.rms) 
        
        # self.spectral_contrast = librosa.feature.spectral_contrast(y=self.y, sr=self.sr)
        
        candidates = []
        for onset in onset_times:
            if any(abs(onset - beat_time) < 0.05 for beat_time in self.beat_times): 
                onset_idx = librosa.time_to_frames([onset], sr=self.sr)[0]
                print("onset_idx",onset_idx)
                if (self.rms[onset_idx] > np.percentile(self.rms, 80) and
                        self.spectral_contrast[:, onset_idx].mean() > np.percentile(self.spectral_contrast, 70)):

                    candidates.append((onset, self.rms[onset_idx]))
        

        self.highlights = sorted(candidates, key=lambda x: x[1], reverse=True)[:top_n]
        print(f"\n{len(self.highlights)} / {len(candidates)} highlights \n", self.highlights)
        
        return self.highlights

    def visualize_highlights(self):

        if not self.highlights:
            raise ValueError("No highlights found. Run 'analyze_highlights' first.")

        plt.figure(figsize=(14, 5))

        # Plot waveform
        librosa.display.waveshow(self.y, sr=self.sr, alpha=0.6, label="Waveform")

        # Plot highlight sections as shaded regions
        for i, (start_time, volume) in enumerate(self.highlights):
            duration = 0.1  # Default duration (adjust based on your logic)
            alpha = volume
            label = "Highlights"
            if self.chorus_found:
                duration = self.chorus_length
                label = "Chorus"
                alpha = 0.3

            end_time = start_time + duration

            plt.axvspan(start_time, end_time, color='red', alpha=alpha, label=label if i == 0 else "")

            text = f"{volume:.2f} (Vol)"

            # Display volume and duration above each highlight
            plt.text((start_time + end_time) / 2, 0, f"{duration}s" if self.chorus_found else f"{volume:.2f} (Vol)", 
                    color="black", fontsize=10, ha="center",  bbox=dict(facecolor='white', alpha=0.6))


        plt.legend()
        plt.title("Musical Highlights with Duration and Volume")
        plt.xlabel("Time (s)")
        plt.ylabel("Amplitude")
        plt.show()

    def analyze_chorus(self ):

        while self.chorus_length >= 4 and not self.chorus_found:
            chorus_secs = find_and_output_chorus(self.audio_file, None, clip_length=self.chorus_length)
            print(chorus_secs)

            if chorus_secs is not None:
                self.highlights.append((chorus_secs, 1))
                self.chorus_found = True
                print(self.highlights)
            else:
                self.chorus_length -= 1
                print("\n### Looking for chorus length:", self.chorus_length, "\n")

        
        return self.highlights


    def writeMIDI(self):

        parsed_audio_path = os.path.splitext(self.audio_file)
        midi_output_path = parsed_audio_path[0]+'.mid'

        midiFile = MIDIFile(1)
        midiFile.addTempo(track=0, tempo=60, time=0)
        midiFile.addTrackName(0, 0, os.path.basename(parsed_audio_path[0]))
        
        for highlight in self.highlights:
            time = highlight[0]
            duration = 0.5

            if self.chorus_found:
                duration = self.chorus_length
                print("DURATION 10")

            midiFile.addNote(track=0, channel=9, pitch=60, time=time, duration=duration, volume=max(int(highlight[1]*127), 1))

        # Trick to get track to length of song
        print("LENGTH",self.length)
        midiFile.addControllerEvent(track=0, channel=9, time=self.length, controller_number=3,parameter=4)


        with open(midi_output_path, "wb") as output_file:
            midiFile.writeFile(output_file)

        print(f"\nSaved {midiFile}.\n File: {midi_output_path}.\n")


    def smooth_derivative(self, data, window_size=50):

        kernel = np.ones(window_size) / window_size
        smoothed = np.convolve(data, kernel, mode='same')
        derivative = np.gradient(smoothed)
        return derivative

    def get_clustered_highlights(self, top_n=5):

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
        print("CLUSTERED HIGHLIGHTS WITH SMOOTHED DERIVATIVES", self.highlights)

        return self.highlights
    


if __name__ == "__main__":
    BATCH_PROCESS = True
    script_dir = os.path.dirname(os.path.realpath(__file__))
    songs = ['hermann.mp3','strangers.mp3', 'intheairtonight.mp3', 'theneedle.mp3',  'leadership.mp3', 'TMTM_2023.mp3',  'TMTM_2024.mp3','classic.mp3', 'ambient.mp3','gaming.mp3', 'strawberry_fields_forever.mp3', 'day_in_the_life.mp3', 'tangled_up.mp3']
    if not BATCH_PROCESS:
        audio_file = songs[6] 
        audio_path = os.path.join(script_dir, 'test', audio_file)
        analyzer = AudioHighlightAnalyzer(audio_path)
        print("\nAnalyzing", audio_path)

        
        chorus = analyzer.analyze_chorus()
        print("CHORUS", chorus)
        if not chorus:
            # highlights = analyzer.analyze_highlights(top_n=6)
            print("HIGHLIGHTS GO")
            clustered_highlights = analyzer.get_clustered_highlights(top_n=5)

        analyzer.writeMIDI()
        analyzer.visualize_highlights()
    else:
        for song in songs:
            audio_file = song
            audio_path = os.path.join(script_dir, 'test', audio_file)
            analyzer = AudioHighlightAnalyzer(audio_path)
            print(f"\nAnalyzing", audio_path)
            chorus = analyzer.analyze_chorus()
            if not chorus:
                print("HIGHLIGHTS GO")
                clustered_highlights = analyzer.get_clustered_highlights(top_n=5)

            analyzer.writeMIDI()
            analyzer.visualize_highlights()





        