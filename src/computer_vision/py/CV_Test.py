import os
from computer_vision import ComputerVision 

script_dir = os.path.dirname(os.path.realpath(__file__))
# videos = ["T_outro_claim_standard_1_1_uhd_preview.mp4","T_outro_hard_cut_16_9_hd_preview.mp4", "T_Ending_720_Square.mp4", "Telekom_TeacherEnding_Max.mp4", "EM 2024  Deutsche Telekom.mp4", "Licht an  Gegen Hass im Netz.mp4", "Magenta Blossom Millionen Blumen bringen T zum Blühen.mp4", "ONE MINUTE TO ARRIVE  Tiny habits - Benefits of Mental Well-Being.mp4", "Verbundenheit am Tannenbaum - Frohe Weihnachten.mp4","Video by magentamusik-1.mp4","Whats New Claudia 5G Standalone  Deutsche Telekom.mp4", "Wir Entscheiden Gemeinsam GegenHassimNetz.mp4"]

# videoPath= f"{script_dir}/test/{videos[6]}"


# logo_time = ComputerVision(videoPath).matchVideoFrames(showVideoPlayer = True)
# print("Logo Time",logo_time)
animations = ["T_outro_claim_hard_cut_3480x1600.mp4", "T_outro_claim_hard_cut_3440x1440.mp4", "T_outro_claim_hard_cut_2560x1440.mp4", "T_outro_claim_hard_cut_768x576.mp4 "",T_outro_claim_hard_cut_854x480.mp4 "",T_outro_claim_hard_cut_960x540.mp4 "",T_outro_claim_hard_cut_1920x1080.mp4", "T_outro_claim_hard_cut_1280x720.mp4 ","T_outro_claim_hard_cut_7680x4320.mp4", "T_outro_claim_hard_cut_3840x2160.mp4", "T_outro_claim_hard_cut_1600x3840.mp4", "T_outro_claim_hard_cut_1440x3440.mp4", "T_outro_claim_hard_cut_1440x2560.mp4", "T_outro_claim_hard_cut_720x1080.mp4 ","T_outro_claim_hard_cut_1080x1920.mp4", "T_outro_claim_hard_cut_4320x7680.mp4", "T_outro_claim_hard_cut_2160x3840.mp4", "T_outro_claim_hard_cut_1920x1440.mp4", "T_outro_claim_hard_cut_1440x1440.mp4", "T_outro_claim_hard_cut_1440x1920.mp4", "T_outro_claim_hard_cut_720x720.mp4 "",T_outro_claim_hard_cut_1080x1080.mp4", "T_outro_claim_hard_cut_4320x4320.mp4", "T_outro_claim_hard_cut_2160x2160.mp4",]
results = []
for i in range(len(animations)):
    videoPath= f"{script_dir}/noaudio/{animations[i]}"
    print(animations[i])
    result = ComputerVision(videoPath).matchVideoFrames(showVideoPlayer = True)
    results.append(result)
    print(results[len(results)-1], "\n")




