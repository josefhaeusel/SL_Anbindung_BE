/*

Next Steps:
-Pop-Up
Rendering:
*/

//--- VueJS Part


const app = Vue.createApp({

    data() {
        return {

            currentLayer: "layer1",
            showModal: false,
            showWarningModal: false,
            showKeys:false,
            marker: { element: null, time: null, label: 'Soundlogo', left: null, exists: null},

            progressBar: {
                phase: 0,
                phaseValues: [20, 50, 90, 100],
                texts: ["Splitting Audio from Video...", "Retrieving Key and Loudness...", "Detecting T-Outro Animation...", "Done."],
                percentage: 0,
                progressBoost:null,
                timer: null,
                error: false,
            },

            playbackPosition: 0,
            sliderValue: 0,
            audioDuration: 0,
            soundlogoPosition: 0,
            
            animationLength: null,
            animationMinimumLength: 1.25,

            isLoadingAnalysis: false,
            isLoadingResult: false,
            soundlogoKeys: [
                { id: '0', key: 'X' },
                { id: '1', key: 'X' },
                { id: '2', key: 'X' }
            ],

            selectedKey: { id: '1', key: 'X' },
            measuredLUFS: 0,
            desiredMasterLUFS: -20,
            soundlogoLUFS:-16,

            actionList: {success: false, audioEmpty: false, audioSegmentEmpty: false, keyDetected: false,logoDetected: false, commonResolution: null, fatalAnimationLength: null},

            video_file: null,
            video_url:"",
            videoData:{logo_start: null, videoResolution: [null, null]},

        }
    },

    mounted() {
        this.$refs.myVideo.addEventListener('play', this.startPlayback);
        this.$refs.myVideo.addEventListener('pause', this.stopPlayback);

        const eventSource = new EventSource('/chord-retrieval-ai/progress');

        eventSource.onmessage = (event) => {
            const data = JSON.parse(event.data);
            this.getProgress_API(data.message);
        };

        // Handle errors
        eventSource.onerror = (err) => {
            console.error('EventSource failed:', err);
            eventSource.close();
        };

    },

    methods: {
        setModal(show) {
            this.showModal = show
        },
        setWarningModal(show) {
            this.showWarningModal = show
        },
        formatNumber(value, decimals=2){
            return value.toFixed(decimals)
        },
        handleReturn(){
            this.showWarningModal=false;
            this.isLoadingAnalysis=false;
            this.actionList= { success: false, audioEmpty: false, logoDetected: false, commonResolution: null, fatalAnimationLength: null}
            

        },
        getProgress_API(message){
            console.log("Progress message from API:", message)
            switch (message) {
                case 'Splitting Audio from Video...':
                  break;
                case 'Retrieving Key and Loudness...':
                    this.progressBar.progressBoost = true
                    break;
                case 'Detecting T-Outro Animation...':
                    this.progressBar.progressBoost = true
                  break;
                case 'Done.':
                    this.progressBar.progressBoost = true
                  break;

              }
        },
        initProgressBar(){
            this.progressBar={
                phase: 0,
                phaseValues: [20, 50, 90, 100],
                texts: ["Splitting Audio from Video...", "Retrieving Key and Loudness...", "Detecting T-Outro Animation...", "Done."],
                percentage: 0,
                progressBoost:null,
                timer: null,
                error: false,
            }

            this.progressBar.timer = setInterval(this.updateProgressBar, 100)
        },
        updateProgressBar() {
            let percentDifference = this.progressBar.phaseValues[this.progressBar.phase] - this.progressBar.percentage;
        

            // Asymptotic approach
            if (this.progressBar.phase != 2) {
                this.progressBar.percentage += percentDifference * 0.05; 
            } else if (this.progressBar.phase == 2 && !this.progressBar.progressBoost) {
                this.progressBar.percentage += percentDifference * 0.01; 
            } else {
                this.progressBar.percentage += 0.5;
            }
        
            if (this.progressBar.progressBoost) {
                this.progressBar.percentage += 5;
            }
        
            if (this.progressBar.phase == 0 && this.progressBar.percentage >= this.progressBar.phaseValues[0]) {
                this.progressBar.progressBoost = false;
                this.progressBar.phase = 1;
            } else if (this.progressBar.phase == 1 && this.progressBar.percentage >= this.progressBar.phaseValues[1]) {
                this.progressBar.progressBoost = false;
                this.progressBar.phase = 2;
            } else if (this.progressBar.phase == 2 && this.progressBar.percentage >= this.progressBar.phaseValues[2]) {
                this.progressBar.phase = 3;
            }
        
            if (this.progressBar.percentage >= 100) {
                clearInterval(this.progressBar.timer);
            }

            if (this.progressBar.phase != 0){
                this.progressBar.percentage = clamp(this.progressBar.percentage, this.progressBar.phaseValues[this.progressBar.phase-1], this.progressBar.phaseValues[this.progressBar.phase])
            }
        },
        
        async handleFileUpload(event) {
            this.video_file = event.target.files[0];
            if (this.video_file) {
                this.isLoadingAnalysis = true;
                this.initProgressBar()

                this.video_url = URL.createObjectURL(this.video_file);
                await this.loadVideoPlayer();
                await this.extractAudioBuffer();

                try {const analysis = await uploadVideo_API(this.video_file);
                await this.analysisHandler(analysis);

                await this.actionListModal()

                console.log("ACTION LIST:",this.actionList)}
                catch (error){
                    console.log("Analysis Error:",error)
                    this.handleError()
                }

            }
        },
        handleError(){
            this.progressBar.error = true
            "Oops... Something went wrong. Please try uploading again."
        },
        async analysisHandler(analysis) {

            this.videoData = analysis.videoAnalysis.analysis;
            const audioEmpty = analysis.audioAnalysis.audioEmpty;
            this.actionList.audioSegmentEmpty = analysis.audioAnalysis.analysisSegmentEmpty;
            const likely_key = analysis.audioAnalysis.analysis.likely_key;
            const loudness = analysis.audioAnalysis.loudness;

            if (audioEmpty) {
                this.actionList.audioEmpty = true

                await this.setKeys("C major")
                this.measuredLUFS = -20
                console.log(`Audio Empty. Standardized Values: ${this.soundlogoKeys[1].key}, ${this.measuredLUFS} LUFS`);
                
            }
            else if (likely_key == null){
                await this.setKeys("C major")
                console.log(`No Key Detected. Standardized Values: ${this.soundlogoKeys[1].key}.`);
            } else
            {
                this.actionList.keyDetected=true
                this.measuredLUFS = loudness
                await this.setKeys(likely_key)
            }

            this.setLoudness();
            
            if (this.videoData.logo_start == "None"){
                this.actionList.logoDetected = false;
            } else {
                this.actionList.logoDetected = true;
                this.animationLength = this.audioDuration - this.videoData.logo_start

                if (this.animationLength < this.animationMinimumLength)
                    {
                        this.actionList.fatalAnimationLength = true
                    }
            }

            if (this.actionList.logoDetected && this.actionList.keyDetected){
                this.actionList.success = true;
            }

            this.checkResolution();
            this.setSoundlogoPosition()
            this.setVideoMarker();
        },
        actionListModal(){

            if (this.actionList.logoDetected == true && !this.actionList.fatalAnimationLength){
                this.showModal = true
            }  else {
                this.progressBar.error = true
                this.showWarningModal = true;
            }
        
        },

        async checkResolution() {

                let width = this.videoData.videoResolution[0]
                let height = this.videoData.videoResolution[1]
                if (width == 3840 && height == 2160 || width == 2160 && height == 3840 || width == 3840 && height == 3840 || width == 2160 && height == 2160) {
                    width /= 2;
                    height /= 2
                }
                if (width == 1920 && height == 1080 || width == 1080 && height == 1920 || width == 1920 && height == 1920 || width == 1080 && height == 1080) {
                    this.actionList.commonResolution = true
                }
                else {
                    this.actionList.commonResolution = false
                }
        },

        setVideoMarker(){

            if (this.marker.exists){
                const left = (this.soundlogoPosition / this.audioDuration * 100) + '%';

                this.marker.element.style.left = left
                this.marker.element.setAttribute('data-time', this.soundlogoPosition);


            } else {
                const markerElement = document.createElement('div');
                const left = (this.soundlogoPosition / this.audioDuration * 100) + '%';

                this.marker =
                    { element: markerElement, time: this.soundlogoPosition, label: 'Soundlogo', left: left, exists:true}

                this.marker.left = left;

                this.marker.element.className = 'vjs-marker';
                this.marker.element.style.left = left;
                this.marker.element.setAttribute('data-time', this.soundlogoPosition);
                this.marker.element.innerHTML = '<span>' + this.marker.label + '</span>';
                this.marker.element.addEventListener('click', () => {
                    videoPlayer.setCurrentTime = this.soundlogoPosition;
                });

                const progressControl = videoPlayer.controlBar.progressControl.children_[0].el_;
                progressControl.appendChild(this.marker.element);
            }

            
                
            },

        setSoundlogoPosition(){
            if (this.actionList.logoDetected == false) {
                this.soundlogoPosition = this.audioDuration - 6;
            } else {
                this.soundlogoPosition = this.videoData.logo_start - 3.55
            }
        },
        async setKeys(keyName){
            const key = logoKeyMap[keyName];
            const scale = keyToScale(key);
            for (let x = 0; x < this.soundlogoKeys.length; x++) {
                this.soundlogoKeys[x].key = scale[x];
            }
            console.log("this.soundlogoKeys",this.soundlogoKeys)
            this.updateLogoKey()
        },
        updateLogoKey(id='1'){
            this.selectedKey.id = id;
            this.selectedKey.key = this.soundlogoKeys[this.selectedKey.id].key;
            console.log("Selected Key", this.selectedKey.key);
            //updateLogoBuffer(this.selectedKey.key )
        },
        async loadVideoPlayer() {

            let type = '';
            console.log(this.video_file)
            if (this.video_file.name.endsWith('.mp4')) {
                type = 'video/mp4';
            } else if (this.video_file.name.endsWith('.ogg')) {
                type = 'video/ogg';
            } else if (this.video_file.name.endsWith('.webm')) {
                type = 'video/webm';
            } else {
                throw new Error('Unsupported video format');
            }
        
            videoPlayer.src({
                type: type,
                src: this.video_url
            });
        
            await videoPlayer.load();
        },
        async setLoudness(){

            const soundlogoDb = this.measuredLUFS - this.soundlogoLUFS;
            logoPlayer.set({volume: soundlogoDb})
            console.log(logoPlayer.get())

            const masterDb = this.desiredMasterLUFS - this.measuredLUFS;
            master.set({gain: masterDb})
            console.log(master.get())

        },

        async extractAudioBuffer() {

            try {
                audioBuffer = await Tone.ToneAudioBuffer.fromUrl(this.video_url);
                console.log("Audio buffer loaded:", audioBuffer);
                audioPlayer.buffer = audioBuffer;
                this.audioDuration = audioPlayer.buffer.duration;

            } catch (error) {
                console.error("Failed to load audio buffer:", error);
            }
        },

        startPlayback() {
            this.playbackPosition = videoPlayer.currentTime();
            startTransports(this.playbackPosition, this.audioDuration, this.soundlogoPosition);
        },
        stopPlayback() {
            stopTransports();
        },
        async downloadVideo() {
            this.isLoadingResult = true;
            const renderedBuffer = await this.renderAudio();
            const videoFilepath = await uploadRenderedAudio_API(renderedBuffer);
            await downloadVideo(videoFilepath);
            this.isLoadingResult = false;
        },
        async downloadAudio() {
            this.isLoadingResult = true;
            const renderedBuffer = await this.renderAudio();
            downloadAudio(renderedBuffer);
            this.isLoadingResult = false;

        },
        async renderAudio() {
            const renderedBuffer = await Tone.Offline(async ({ transport }) => {
                await setupAudioNodes(transport.context);
                await this.extractAudioBuffer()
                //await updateLogoBuffer(this.selectedKey.key)
                await this.setLoudness()

                scheduleAudio(this.audioDuration, 0, this.soundlogoPosition,transport);
                scheduleLogoSound(this.audioDuration, 0, this.soundlogoPosition, transport);
                transport.start();
            }, this.audioDuration)

            console.log(renderedBuffer)

            //Reinitialize regular Tone.Context
            await setupAudioNodes(Tone.getContext());

            return renderedBuffer

        }

    }
})

app.config.compilerOptions.isCustomElement = (tag) => tag.startsWith('scale-')
app.mount('#app')


//Global Audio Players and Buffers
let logoPlayer
let logoBuffers
let video_url
let audioPlayer
let audioBuffer
let envelope
let videoPlayer
let master

async function setup() {

    //Start Web-Audio Context w. User Gesture
    document.body.onclick = async () => {
        await Tone.start();
        await Tone.context.resume();

    }

    videoPlayer = videojs('myVideo');
    


    await setupAudioNodes(Tone.getContext());
}

async function setupAudioNodes(context) {
    try {
        console.log('Setting up audio nodes...');

        // Initialize master gain
        master = await loadMasterGain(context);
        console.log('Master gain node initialized:', master);

        // Initialize envelope
        envelope = await ampEnvelope();
        console.log('Envelope initialized:', envelope);

        // Initialize audio player
        audioPlayer = await loadAudioplayer(context, envelope, master);
        console.log('Audio player initialized:', audioPlayer);

        // Load logo buffers and initialize logo player
        await loadLogoBuffers();
        logoPlayer = await loadLogoPlayer(context, master);
        console.log('Logo player initialized:', logoPlayer);

        console.log('Audio nodes setup complete.');
    } catch (error) {
        console.error('Error setting up audio nodes:', error);
    }
}



function downloadAudio(buffer) {
    // Convert the buffer to a WAV Blob
    const wavBlob = convertToWav(buffer);

    // Create an object URL for the Blob
    const url = URL.createObjectURL(wavBlob);

    // Create a download link
    const link = document.createElement('a');
    link.href = url;
    link.download = 'soundlogoAnbindung.wav';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function downloadVideo(filepath) {

}

// Simple WAV encoder function
// This is a basic example and might need adjustments based on your specific needs
function convertToWav(buffer) {
    const numChannels = buffer.numberOfChannels;
    const sampleRate = buffer.sampleRate;
    const format = 1; // PCM
    const subChunk1Size = 16; // for PCM
    const subChunk2Size = numChannels * buffer.length * 2; // 2 bytes per sample
    const chunkSize = 4 + (8 + subChunk1Size) + (8 + subChunk2Size);

    let offset = 0;
    const dataSize = 36 + subChunk2Size;
    const bufferArray = new ArrayBuffer(dataSize);
    const view = new DataView(bufferArray);

    // RIFF header
    writeString(view, offset, 'RIFF'); offset += 4;
    view.setUint32(offset, dataSize - 8, true); offset += 4;
    writeString(view, offset, 'WAVE'); offset += 4;

    // fmt sub-chunk
    writeString(view, offset, 'fmt '); offset += 4;
    view.setUint32(offset, subChunk1Size, true); offset += 4;
    view.setUint16(offset, format, true); offset += 2;
    view.setUint16(offset, numChannels, true); offset += 2;
    view.setUint32(offset, sampleRate, true); offset += 4;
    view.setUint32(offset, sampleRate * numChannels * 2, true); offset += 4;
    view.setUint16(offset, numChannels * 2, true); offset += 2;
    view.setUint16(offset, 16, true); offset += 2;

    // data sub-chunk
    writeString(view, offset, 'data'); offset += 4;
    view.setUint32(offset, subChunk2Size, true); offset += 4;

    // Write PCM samples
    for (let i = 0; i < buffer.length; i++) {
        for (let channel = 0; channel < numChannels; channel++) {
            let sample = buffer.getChannelData(channel)[i] * 0x7FFF;
            if (offset + 2 > dataSize) {
                break; // Prevent writing beyond the buffer size
            }
            view.setInt16(offset, sample, true);
            offset += 2;
        }
    }

    return new Blob([bufferArray], { type: 'audio/wav' });
}

function writeString(view, offset, string) {
    for (let i = 0; i < string.length; i++) {
        view.setUint8(offset + i, string.charCodeAt(i));
    }
}

function startTransports(currentPosition, audioDuration, logoStart) {

    const transport = Tone.Transport

    scheduleAudio(audioDuration, currentPosition, logoStart, transport);
    scheduleLogoSound(audioDuration, currentPosition, logoStart, transport);

    videoPlayer.setCurrentTime = currentPosition;
    videoPlayer.play();
    transport.start();

    audioPlayer.onstop = function () {
        stopTransports()
    }
}

function stopTransports() {
    Tone.Transport.stop();
    Tone.Transport.cancel()
    audioPlayer.stop();
    logoPlayer.stop();
    videoPlayer.pause();
}

function scheduleAudio(audioDuration, currentPosition, logoStart, transport) {

    const secondsTillEnvStart = calculateEnvScheduleTime(audioDuration, currentPosition, logoStart);

    if (secondsTillEnvStart >= 0) {
        transport.schedule((time) => {
            audioPlayer.start(time, currentPosition);
            envelope.triggerAttack(time);
            console.log("Go Audio!");
        });
        transport.schedule((time) => {
            envelope.triggerRelease(time, time);
            console.log("Go Envelope!");
        }, secondsTillEnvStart);
    }

}

function scheduleLogoSound(audioDuration, currentPosition, logoStart, transport) {

    const secondsTillLogoStart = calculateLogoScheduleTime(audioDuration, currentPosition, logoStart);

    if (secondsTillLogoStart >= 0) {

        transport.schedule((time) => {
            logoPlayer.start(time);
            console.log("Go Logo!");
        }, `+${secondsTillLogoStart}`);

    } else if (secondsTillLogoStart < 0) {
        logoPlayer.start(Tone.immediate(), Math.abs(secondsTillLogoStart));
    }
}

function calculateLogoScheduleTime(audioDuration, currentPosition, logoStart) {
    const secondsTillStart = logoStart - currentPosition;
    return secondsTillStart;
}

function calculateEnvScheduleTime(audioDuration, currentPosition, logoStart) {
    const secondsTillStart = (logoStart + 1) - currentPosition;
    return secondsTillStart;
}

function forceStartBeforeLogo(audioDuration, currentPosition) {
    const timeTillStart = calculateLogoScheduleTime(audioDuration, currentPosition);
    let positionAtLogoStart;

    if (timeTillStart < 0) {
        positionAtLogoStart = currentPosition + timeTillStart;
        return positionAtLogoStart
    }
    else {
        return currentPosition
    }
}

async function loadMasterGain(Context) {

    const newMasterGain = new Tone.Gain(0, 'decibels').toDestination();
    newMasterGain.context = Context;

    return newMasterGain

}

async function loadLogoBuffers() {
    logoBuffers = new Tone.ToneAudioBuffers({
        A: "samples/soundlogos/TLS_A-3.wav",
        C: "samples/soundlogos/TLS_C-3.wav"
    })
}

async function loadLogoPlayer(Context, Master,tonality = 'A') {

    const logoBuffer = logoBuffers.get('A');
    const newLogoPlayer = new Tone.Player({ url: logoBuffer, context: Context, volume: 0 });

    newLogoPlayer.connect(Master)

    return newLogoPlayer

}

async function loadAudioplayer(Context, Env, Master) {

    const newAudioPlayer = new Tone.Player({ url: audioBuffer, context: Context, volume: 0 });

    if (Env) {
        newAudioPlayer.chain(Env, Master);
    } else {
        newAudioPlayer.toDestination();
    }

    return newAudioPlayer

}

async function ampEnvelope() {
    const ampEnv = new Tone.AmplitudeEnvelope({
        attack: 0,
        decay: 0,
        sustain: 1.0,
        release: 2.4

    });

    ampEnv.releaseCurve = "cosine";

    return ampEnv
}

async function updateMainAudioBuffer(filepath) {
    console.log("Updated Main Audio Buffer:", filepath);
    const audioBuffer = new Tone.ToneAudioBuffer(filepath);
    audioPlayer.buffer = audioBuffer;
}

async function updateLogoBuffer(key) {
    console.log("Updated Logo Buffer Key:", key);
    const logoBuffer = logoBuffers.get(key);
    logoPlayer.buffer = logoBuffer;
}


async function uploadRenderedAudio_API(buffer) {

    const formData = await audioToWavFile(buffer);

    try {
        const response = await fetch('/chord-retrieval-ai/uploadRenderedAudio', {
            method: 'POST',
            body: formData,
        });

        const data = await response.json();
        console.log('Audio uploaded successfully:', data);

        await downloadFile('/download/streamable/?file=' + data.renderedResult, data.renderedResult);

    } catch (error) {
        console.error('Error uploading audio:', error);
    }


    function audioToWavFile(buffer) {
        // Convert the buffer to a WAV Blob
        const wavBlob = convertToWav(buffer);

        // Convert the Blob to a File
        const audioFile = new File([wavBlob], 'soundlogoAnbindung.wav', { type: 'audio/wav' });

        // Create a FormData instance
        const formData = new FormData();

        // Append the File to FormData
        formData.append('file', audioFile);

        // Send the FormData to your backend
        return formData
    }

    function downloadFile(url, filename) {
        fetch(url)
            .then(response => response.blob())
            .then(blob => {
                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.download = filename;
                document.body.appendChild(link); // Append to the body to trigger the download
                link.click();
                document.body.removeChild(link); // Optionally remove the link from the DOM
            })
            .catch(console.error);
    }
}


async function uploadVideo_API(file) {

    try {

        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch('/chord-retrieval-ai/uploadVideo', {
            method: 'POST',
            body: formData,
        });

        const data = await response.json();
        console.log("ANALYSIS RESULT", data)

        return data

    }
    catch (error) {
        console.error('Error:', error);

        return {error: error}
    }
}




function keyToScale(key) {
    console.log("KEY TO SCALE", key)
    const keyArray = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
    let keyIndex
    for (x = 0; x < keyArray.length; x++) {
        if (key === keyArray[x]) {
            keyIndex = x
        }
    };

    const subdominant_id = ((keyIndex + 5) % keyArray.length);
    const dominant_id = ((keyIndex + 7) % keyArray.length);

    const subdominant = keyArray[subdominant_id];
    const dominant = keyArray[dominant_id];

    const scale = [subdominant, key, dominant]
    console.log("Scale", scale)

    return scale

}

function clamp(num, lower, upper) {
    return Math.min(Math.max(num, lower), upper);
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
