import numpy as np
import librosa
import librosa.display

class Tempofinder(object):
    def __init__(self, waveform, sr, tstart=None, tend=None):
        self.waveform = waveform
        self.sr = sr
        self.tstart = tstart
        self.tend = tend
        
        if self.tstart is not None:
            self.tstart = librosa.time_to_samples(self.tstart, sr=self.sr)
        if self.tend is not None:
            self.tend = librosa.time_to_samples(self.tend, sr=self.sr)

        self.y_segment = self.waveform[self.tstart:self.tend] if self.tstart is not None else self.waveform

    def detect_bpm(self):
        tempo, _ = librosa.beat.beat_track(y=self.y_segment, sr=self.sr)
        return round(tempo[0])