/*

Next Steps:
-INTERFACE
-Audio Transition mit Filtern
-FFmpeg trennt audio von video
-Aufnahme- / Rendermöglichkeit des Audios finden (Offline Buffer Tone.JS)
-Ende von Video muss für Preview isoliert spielbar gemacht werden

*/

//Global Audio Players and Buffers
let logoPlayer
let logoBuffers
let audioPlayer
//let audioBuffer

async function setup() {

    //Start Web-Audio Context w. User Gesture
    document.body.onclick = async () => {
        await Tone.start()
    }

    makeFileDropzone();

    const envelope = await ampEnvelope();
    audioPlayer = await loadAudioplayer(envelope);
    await loadLogoBuffers()
    logoPlayer = await loadLogoPlayer()


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

async function loadLogoBuffers(){
    logoBuffers = new Tone.ToneAudioBuffers({
            A: "samples/soundlogos/TLS_A-3.wav",
            C: "samples/soundlogos/TLS_C-3.wav"
        })
    }

async function loadLogoPlayer(tonality = 'A') {

    const logoBuffer = logoBuffers.get('A');
    const newLogoPlayer = new Tone.Player(logoBuffer);

    newLogoPlayer.toDestination()

    return newLogoPlayer

}

async function loadAudioplayer(Env, Filter, Filepath) {

    console.log("Loaded Audio:", Filepath)
    const newAudioPlayer = new Tone.Player(Filepath);

    if (Env) {
        newAudioPlayer.connect(Env);
    } else {
        newAudioPlayer.toDestination();
    }

    return newAudioPlayer

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

async function updateMainAudioBuffer(filepath){
    console.log("Updated Main Audio Buffer:", filepath)
    const audioBuffer = new Tone.ToneAudioBuffer(filepath);
    audioPlayer.buffer = audioBuffer;
}

async function updateLogoBuffer(key){
    const tonality = logoKeyMap[key];
    console.log("Updated Logo Buffer Key:", tonality)
    const logoBuffer = logoBuffers.get(tonality);
    logoPlayer.buffer = logoBuffer;
}

function makeFileDropzone(){

    document.getElementById('dropzone').addEventListener('click', function() {
        document.getElementById('fileInput').click();
    });

    document.getElementById('fileInput').addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            dropzoneHandler(file);

            const filepath = file.name;
            console.log(filepath);
        }
    });

}


async function dropzoneHandler(file) {

    const spinner = document.getElementById('keyLoadingSpinner');
    const display = document.getElementById('keyResultDisplay');


    //Clear Display
    display.style.display = 'none'
    display.value = ''

    //Activate Loadbutton
    spinner.style.display = 'block';

    const formData = new FormData();
    formData.append('file', file);

    const key = await uploadAndAnalyzeAudio_API(formData);
    await updateLogoBuffer(key);

    const uploadFilepath = `clientUploads/audioBuffer.mp3`;
    await updateMainAudioBuffer(uploadFilepath);

    //Deactivate Loadbutton
    spinner.style.display = 'none';
    //Show Result
    display.value = key;
    display.style.display = 'block'
}

async function uploadAndAnalyzeAudio_API(formData, display) {
    try {
        const response = await fetch('/chord-retrieval-ai/analyze', {
            method: 'POST',
            body: formData,
        });
        const data = await response.json();
        const key = data.analysis.likely_key;

        console.log('Analysis Result:', data);
        console.log('Key:', key);

        return key

    }
    catch (error) {
        display.value = error;
        console.error('Error:', error);
    }
}


const logoKeyMap = {

    'A minor': 'C',
    'A# minor': 'C#',
    'B minor': 'D',
    'C minor': 'E',
    'C# minor': 'F',
    'D minor': 'F#',
    'D# minor': 'G',
    'E minor': 'G#',
    'F minor': 'A',
    'F# minor': 'A#',
    'G minor': 'B',
    'G# minor': 'C',

    'A major': 'A',
    'A# major': 'A#',
    'B major': 'B',
    'C major': 'C',
    'C# major': 'C#',
    'D major': 'D',
    'D# major': 'D#',
    'E major': 'E',
    'F major': 'F',
    'F# major': 'F#',
    'G major': 'G',
    'G# major': 'G#',

}

setup();