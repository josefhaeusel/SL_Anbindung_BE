/*

Next Steps:
-Audio mit Envelope filtern

-Drag and Drop 
-FFmpeg trennt audio von video
-Audio muss von autochord / cyanite.ai analysiert werden
-Aufnahme- / Rendermöglichkeit des Audios finden
-Ende von Video muss für Preview isolierr spielbar gemacht werden
*/

async function setup() {

    const logoPlayer = await loadLogoplayer();
    const envelope = await ampEnvelope();
    const audioPlayer = await loadAudioplayer(envelope);
    playbackHandler(audioPlayer, envelope, logoPlayer);
}

function playbackHandler(audioPlayer, ampEnvelope, logoPlayer) {
    const playButton = document.getElementById("playAudio");
    const audioSlider = document.getElementById("audio-playbar");

    playButton.addEventListener("click", function() {
            const normSliderPosition = parseFloat(audioSlider.value);
            const audioDuration = audioPlayer.buffer.duration;
            let currentPosition;

            if (normSliderPosition < 1){
                currentPosition = audioDuration * normSliderPosition;
                currentPosition = forceStartBeforeLogo(audioDuration, currentPosition)
            } else{
                currentPosition = 0
            }

            scheduleAudio(audioPlayer, ampEnvelope, audioDuration, currentPosition);
            scheduleLogoSound(logoPlayer, audioDuration, currentPosition);

            updateProgressbar(audioPlayer, audioSlider, currentPosition);

            Tone.Transport.start();

            audioPlayer.onstop = function() {
                Tone.Transport.stop();
            };
        })

}

function scheduleAudio(audioPlayer, ampEnvelope, audioDuration, currentPosition){

    const secondsTillEnvStart = calculateEnvScheduleTime(audioDuration, currentPosition);

    if (secondsTillEnvStart >= 0){
        Tone.Transport.scheduleOnce((time) => {
            audioPlayer.start(time, currentPosition);
            ampEnvelope.triggerAttack(time);
            console.log("Go Audio!");
        });
        Tone.Transport.scheduleOnce((time) => {
            ampEnvelope.triggerRelease(time, time);
            console.log("Go Envelope!");
        }, secondsTillEnvStart);
    }

}

function scheduleLogoSound(logoPlayer, audioDuration, currentPosition) {

    const secondsTillLogoStart = calculateLogoScheduleTime(audioDuration, currentPosition);

    if (secondsTillLogoStart >= 0) {

        Tone.Transport.scheduleOnce((time) => {
            logoPlayer.start(time);
            console.log("Go Logo!");
        }, `+${secondsTillLogoStart}`);

    } else if (secondsTillLogoStart < 0) {
        logoPlayer.start(Tone.immediate(), Math.abs(secondsTillLogoStart));
    }
}

function calculateLogoScheduleTime(audioDuration, currentPosition) {
    const logoStartPosition = audioDuration - 6;
    const secondsTillStart = logoStartPosition - currentPosition;
    return secondsTillStart;
}

function calculateEnvScheduleTime(audioDuration, currentPosition) {
    const logoStartPosition = audioDuration - 5;
    const secondsTillStart = logoStartPosition - currentPosition;
    return secondsTillStart;
}

function forceStartBeforeLogo(audioDuration, currentPosition){
    const timeTillStart = calculateLogoScheduleTime(audioDuration, currentPosition);
    let positionAtLogoStart;

    if (timeTillStart < 0){
        positionAtLogoStart = currentPosition + timeTillStart;
        return positionAtLogoStart
    }
    else{
        return currentPosition
    }
}

function updateProgressbar(audioPlayer, audioSlider, currentPosition){

    const timeNow = Tone.now();

    Tone.Transport.scheduleRepeat(function(time) {
    const progress = (((time-timeNow)+currentPosition) / audioPlayer.buffer.duration);
    audioSlider.value = progress;
}, 0.01)

}

async function loadLogoplayer(tonality = "A") {
    const multiPlayer = new Tone.Players({
        A: "samples/soundlogos/TLS_A-3.wav",
        C: "samples/soundlogos/TLS_C-3.wav"
    }).toDestination();

    const logoPlayer = multiPlayer.player(tonality);

    return logoPlayer;
}

async function loadAudioplayer(Env, Filter) {

    const audioPlayer = new Tone.Player("samples/testsong.mp3");

    if (Env) {
        audioPlayer.connect(Env);
    } else {
        audioPlayer.toDestination();
    }

    return audioPlayer

}

async function ampEnvelope(){
    const ampEnv = new Tone.AmplitudeEnvelope({
        attack: 0,
        decay: 0,
        sustain: 1.0,
        release: 2.4
        
    }).toDestination();

    ampEnv.releaseCurve ="cosine";

    return ampEnv
}


setup();
