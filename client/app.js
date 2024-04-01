/*

Next Steps:
-Soundlogo Choice Hinzufügen
-Audio Transition mit Filtern
-Interface (ich: timestamp, download button, key auswahl, evtl. erste page besser)
(Vincent: .pngs für waveform und soundlogo)

Rendering:
-FFmpeg trennt audio von video
-Aufnahme- / Rendermöglichkeit des Audios finden (Offline Buffer Tone.JS)

*/

//--- VueJS Part

const app = Vue.createApp({

    data() { 
        return  {
            currentLayer: "layer1",

            playbackPosition: 0.0,
            sliderValue: 0.0,
            audioDuration: 0.0,

            isLoadingKey: true,
            soundlogoKeys: [
                { id: '0', key: '' },
                { id: '1', key: '' },
                { id: '2', key: '' }
              ],
            selectedKey: {id:'1',key:''},
            
        }
    },

    mounted(){
        this.$refs.myVideo.addEventListener('play', this.startPlayback);
        this.$refs.myVideo.addEventListener('pause', this.stopPlayback);
    },

    methods: {
        async handleFileUpload(event){
            const file = event.target.files[0];
            if (file) {
                this.currentLayer = "layer2";
                const keys = await dropzoneHandlerVideo(file);
                for (let x = 0; x < this.soundlogoKeys.length; x++){
                    this.soundlogoKeys[x].key = keys[x];
                }
                console.log(this.soundlogoKeys);
                this.isLoadingKey = false;
            }
        },
        startPlayback(){
            this.audioDuration = audioPlayer.buffer.duration;
            this.playbackPosition = videoPlayer.currentTime();
            startTransports(this.playbackPosition, this.audioDuration);
        },
        stopPlayback(){
            stopTransports();
        },
        updateLogoKey(id){
            this.selectedKey.id = id;
            this.selectedKey.key = this.soundlogoKeys[id]
            console.log("Selected Key", this.selectedKey.key)
            //updateLogoBuffer(this.selectedKey.key )
        }
    }
})

app.config.compilerOptions.isCustomElement = (tag) => tag.startsWith('scale-')
app.mount('#app')


//Global Audio Players and Buffers
let logoPlayer
let logoBuffers
let audioPlayer
let envelope
let videoPlayer

async function setup() {

    //Start Web-Audio Context w. User Gesture
    document.body.onclick = async () => {
        await Tone.start();
        await Tone.context.resume();

    }

    videoPlayer = videojs('myVideo')

    envelope = await ampEnvelope();
    audioPlayer = await loadAudioplayer(envelope);
    await loadLogoBuffers();
    logoPlayer = await loadLogoPlayer();
}

function startTransports(currentPosition, audioDuration){

    scheduleAudio(audioDuration, currentPosition);
    scheduleLogoSound(audioDuration, currentPosition);

    videoPlayer.setCurrentTime = currentPosition;
    videoPlayer.play();
    Tone.Transport.start();

    audioPlayer.onstop = function() {
        stopTransports()
    }
}

function stopTransports(){
    Tone.Transport.stop();
    Tone.Transport.cancel()
    audioPlayer.stop();
    logoPlayer.stop();
    videoPlayer.pause();
}

function scheduleAudio(audioDuration, currentPosition){

    const secondsTillEnvStart = calculateEnvScheduleTime(audioDuration, currentPosition);

    if (secondsTillEnvStart >= 0){
        Tone.Transport.schedule((time) => {
            audioPlayer.start(time, currentPosition);
            envelope.triggerAttack(time);
            console.log("Go Audio!");
        });
        Tone.Transport.schedule((time) => {
            envelope.triggerRelease(time, time);
            console.log("Go Envelope!");
        }, secondsTillEnvStart);
    }

}

function scheduleLogoSound(audioDuration, currentPosition) {

    const secondsTillLogoStart = calculateLogoScheduleTime(audioDuration, currentPosition);

    if (secondsTillLogoStart >= 0) {

        Tone.Transport.schedule((time) => {
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
    console.log("Updated Main Audio Buffer:", filepath);
    const audioBuffer = new Tone.ToneAudioBuffer(filepath);
    audioPlayer.buffer = audioBuffer;
}

async function updateLogoBuffer(key){
    console.log("Updated Logo Buffer Key:", key);
    const logoBuffer = logoBuffers.get(key);
    logoPlayer.buffer = logoBuffer;
}


async function dropzoneHandlerVideo(file) {

    const url = URL.createObjectURL(file);
    await videoPlayerHandling(url)

    const formData = new FormData();
    formData.append('file', file);

    let key = await uploadVideo_API(formData);
    key = logoKeyMap[key];
    
    console.log('Key:', key);
    const scale = keyToScale(key)
    //TODO await updateLogoBuffer(key);

    return scale


    async function uploadVideo_API() {
        try {
            const response = await fetch('/chord-retrieval-ai/uploadVideo', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();
            const key = data.analysis.likely_key;
    
            return key
    
        }
        catch (error) {
            display.value = error;
            console.error('Error:', error);
        }
    }
}

async function videoPlayerHandling(url) {

    videoPlayer.src({
        type: 'video/mp4',
        src: url
    });
    
    await videoPlayer.load();

    await extractAudioBuffer(url);

    async function extractAudioBuffer(url) {

        try {
            const audioBuffer = await Tone.ToneAudioBuffer.fromUrl(url);
            console.log("Audio buffer loaded:", audioBuffer);

            audioPlayer.buffer = audioBuffer;
        } catch (error) {
            console.error("Failed to load audio buffer:", error);
        }
    }
}

function keyToScale(key){
    const keyArray = ['C','C#','D','E','F','F#','G','G#','A','A#','B']
    let keyIndex
    for (x = 0; x < keyArray.length; x++){
        if(key === keyArray[x]){
            keyIndex=x
        }
    };

    const subdominant_id = ((keyIndex+5)%12);
    const dominant_id = ((keyIndex+7)%12);

    const subdominant = keyArray[subdominant_id];
    const dominant = keyArray[dominant_id];

    const scale = [subdominant, key, dominant]
    console.log("Scale", scale)

    return scale

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
