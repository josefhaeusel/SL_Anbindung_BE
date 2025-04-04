import numpy as np
import librosa
import librosa.display

# class that uses the librosa library to analyze the key that an mp3 is in
# arguments:
#     waveform: an mp3 file loaded by librosa, ideally separated out from any percussive sources
#     sr: sampling rate of the mp3, which can be obtained when the file is read with librosa
#     tstart and tend: the range in seconds of the file to be analyzed; default to the beginning and end of file if not specified
class Tonal_Fragment(object):
    def __init__(self, waveform, sr, tstart=None, tend=None):
        self.waveform = waveform
        self.sr = sr
        self.tstart = tstart
        self.tend = tend
        if self.tstart is not None:
            self.tstart = librosa.time_to_samples(self.tstart, sr=self.sr)
        if self.tend is not None:
            self.tend = librosa.time_to_samples(self.tend, sr=self.sr)
        self.y_segment = self.waveform[self.tstart:self.tend]
        self.chromograph = librosa.feature.chroma_cqt(y=self.y_segment, sr=self.sr, bins_per_octave=12 )
        
        # chroma_vals is the amount of each pitch class present in this time interval
        self.chroma_vals = []
        for i in range(12):
            self.chroma_vals.append(np.sum(self.chromograph[i]))
        self.pitches = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B']
        # dictionary relating pitch names to the associated intensity in the song
        self.keyfreqs = {self.pitches[i]: self.chroma_vals[i] for i in range(12)} 
        
        keys = [self.pitches[i] + ' major' for i in range(12)] + [self.pitches[i] + ' minor' for i in range(12)]

        # use of the Krumhansl-Schmuckler key-finding algorithm, which compares the chroma
        # data above to typical profiles of major and minor keys:
        maj_profile = [6.35, 2.23, 3.48, 2.33, 4.38, 4.09, 2.52, 5.19, 2.39, 3.66, 2.29, 2.88]
        min_profile = [6.33, 2.68, 3.52, 5.38, 2.60, 3.53, 2.54, 4.75, 3.98, 2.69, 3.34, 3.17]

        # finds correlations between the amount of each pitch class in the time interval and the above profiles,
        # starting on each of the 12 pitches. then creates dict of the musical keys (major/minor) to the correlation
        self.min_key_corrs = []
        self.maj_key_corrs = []
        for i in range(12):
            key_test = [self.keyfreqs.get(self.pitches[(i + m)%12]) for m in range(12)]
            # correlation coefficients (strengths of correlation for each key)
            self.maj_key_corrs.append(round(np.corrcoef(maj_profile, key_test)[1,0], 3))
            self.min_key_corrs.append(round(np.corrcoef(min_profile, key_test)[1,0], 3))

        # names of all major and minor keys
        self.key_dict = {**{keys[i]: self.maj_key_corrs[i] for i in range(12)}, 
                        **{keys[i+12]: self.min_key_corrs[i] for i in range(12)}}


        # this attribute represents the key determined by the algorithm
        self.key = max(self.key_dict, key=self.key_dict.get)
        self.bestcorr = max(self.key_dict.values())
        if np.isnan(self.bestcorr):
            self.bestcorr = None

        self.sorted_keys = sorted(self.key_dict.items(), key=lambda item: item[1], reverse=True)
        self.correlation_table = [{"key": key[0], "correlation": key[1]} for key in self.sorted_keys]

        # this attribute represents the second-best key determined by the algorithm,
        # if the correlation is close to that of the actual key determined
        self.altkey = None
        self.altbestcorr = None

        for key, corr in self.key_dict.items():
            if corr > self.bestcorr*0.8 and corr != self.bestcorr:
                self.altkey = key
                self.altbestcorr = corr
                if np.isnan(self.altbestcorr):
                    self.altbestcorr = None
   
    # prints the relative prominence of each pitch class            
    def print_chroma(self):
        self.chroma_max = max(self.chroma_vals)
        for key, chrom in self.keyfreqs.items():
            print(key, '\t', f'{chrom/self.chroma_max:5.3f}')
                
    # prints the correlation coefficients associated with each major/minor key
    def corr_table(self):
        for key, corr in self.key_dict.items():
            print(key, '\t', f'{corr:6.3f}')
    
    # printout of the key determined by the algorithm; if another key is close, that key is mentioned
    def print_key(self):
        print("likely key: ", max(self.key_dict, key=self.key_dict.get), ", correlation: ", self.bestcorr, sep='')
        if self.altkey is not None:
                print("also possible: ", self.altkey, ", correlation: ", self.altbestcorr, sep='')
    
    #Added by Josef
    def get_key_info(self):
            
        key_info = {
            "likely_key": {"key":self.key, "correlation": self.bestcorr},
            "correlation_table": self.sorted_keys,
        }
        if self.altkey is not None:
            key_info["also_possible"] = {
                "key": self.altkey,
                "correlation": self.altbestcorr,
            }

        key_info["selected"] = None
        return key_info
    
    def get_list_of_neutral_keys(self):
            


        key_info = {
            "correlation_table": self.correlation_table[:3],

        }

        key_info["selected"] = None
        return key_info
    
    def get_list_of_neutral_keys(self):

        combined_keys = {}

        for i, pitch in enumerate(self.pitches):
            major_key = f"{pitch} major"
            minor_key = f"{pitch} minor"
            combined_correlation = self.key_dict.get(major_key, 0) + self.key_dict.get(minor_key, 0)
            combined_keys[pitch] = combined_correlation

        sorted_combined_keys = sorted(combined_keys.items(), key=lambda item: item[1], reverse=True)

        top_keys = [{"key": key, "correlation": round(correlation, 3)} for key, correlation in sorted_combined_keys[:3]]

        return {"correlation_table": top_keys, "selected": top_keys[0]["key"]}
        