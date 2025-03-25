import numpy as np
import librosa
import librosa.display
import pyloudnorm as pyln


class Loudnessfinder(object):
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

    def detect_LUFS(self):
        meter = pyln.Meter(self.sr, filter_class="Fenton/Lee 2") 
        overall_loudness = meter.integrated_loudness(self.y_segment)  # measure loudness
        return round(overall_loudness, 2)