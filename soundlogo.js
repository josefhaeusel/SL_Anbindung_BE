const app = Vue.createApp({

    data() {
        return {

            currentLayer: "layer1",
            showResultModal: false,
            showKeys:false,
            marker: { element: null, time: null, label: 'Soundlogo', left: null, exists: null},
            showInvalidFormatToast: false,
            showResolutionHint:false,

            progressBar: {
                phase: 0,
                phaseValues: [15, 30, 40, 60, 80, 100, 105],
                texts: ['Retrieving Video Data...', 'Converting Video Format...',"Splitting Audio from Video...", "Retrieving Key and Loudness...", "Detecting T-Outro Animation...", "Appending T-Outro Animation...", "Done."],
                percentage: 0,
                timer: null,
                error: false,
                eventSource: null
            },

            playbackPosition: 0,
            sliderValue: 0,
            audioDuration: 0,
            soundlogoPosition: 0,
            
            animationLength: null,
            animationMinimumLength: 1, //01:00:01:04 rest length from "T" logo detection

            isLoadingAnalysis: false,
            isLoadingResult: false,
            soundlogoKeys: [
                { id: '0', key: 'X' },
                { id: '1', key: 'X' },
                { id: '2', key: 'X' }
            ],

            selectedKey: { id: '1', key: 'X' },
            measuredLUFS: 0,
            soundlogoLUFS:-16,
            videoPlayerLUFS:-26.71,
            desiredMasterLUFS: -20,

            actionList: {success: false, audioEmpty: false, audioSegmentEmpty: false, convertedVideo: true, keyDetected: false,logoDetected: false, commonResolution: null, commonRatio: null, commonFiletype:null, appendedAnimation:null,fatalAnimationLength: null},

            video_file: null,
            video_url:"",
            vudei_path:"",
            videoAnalysis:{logo_start: null, videoResolution: [null, null]},
            metadataLoadedOnce: false,
            playerHasBeenClicked: false,

            feedback: {thumbs: null, text: "", show: false, thumbsup:{hover:null}, thumbsdown:{hover:null}}

        }
    },

    mounted() {
        this.$refs.myVideo.addEventListener('play', this.startPlayback);
        this.$refs.myVideo.addEventListener('pause', this.stopPlayback);
        this.$refs.myVideo.addEventListener('volumechange', this.updateListeningVolume);
    
        const eventSource = new EventSource('/chord-retrieval-ai/progress');
    
        eventSource.onmessage = (event) => {
            this.progressBar.eventSource = true
            const data = JSON.parse(event.data);
            this.setProgress_API(data.message);
        };
    
        eventSource.onerror = (err) => {
            this.progressBar.eventSource = false
            console.error('EventSource failed:', err);
            eventSource.close();

        };
    
    },

    methods: {

        formatNumber(value, decimals = 2) {
            return value.toFixed(decimals);
        },
        formatNumberPercentage(value, decimals = 1) {
            let testValue = value.toFixed(decimals).toString()

            if (!testValue.endsWith('.0')){
                return value.toFixed(decimals);}
            else {
                return value.toFixed(decimals)-0.1
            }
        },
        handleReturn(){

            this.isLoadingAnalysis=false;
            this.actionList= { success: false, audioEmpty: false, logoDetected: false, commonResolution: this.actionList.commonResolution, commonRatio: this.actionList.commonRatio, commonFiletype: this.actionList.commonFiletype,fatalAnimationLength: null}
            console.log("ACTION LIST:", this.actionList)

        },
        setProgress_API(message){
            console.log("Progress message from API:", message)
            switch (message) {
                case 'Retrieving Video Data...':
                    this.progressBar.phase = 1
                  break;
                case 'Converting Video Format...':
                    this.progressBar.phase = 2
                  break;
                case 'Splitting Audio from Video...':
                    this.progressBar.phase = 3
                  break;
                case 'Retrieving Key and Loudness...':
                    this.progressBar.phase = 4
                    break;
                case 'Detecting T-Outro Animation...':
                    this.progressBar.phase = 5
                  break;
                case 'Appending T-Outro Animation...':
                    this.progressBar.phase = 6
                  break;
                case 'Done.':
                    clearInterval(this.progressBar.timer);
                    this.progressBar.phase = 6
                    this.progressBar.percentage = 101
                  break;

              }
        },
        initProgressBar(){
            this.progressBar={
                phase: 0,
                phaseValues: [10, 20, 30, 40, 60, 80, 100, 105],
                texts: ['Uploading Video...', 'Retrieving Video Data...', 'Converting Video Format...',"Splitting Audio from Video...", "Retrieving Key and Loudness...", "Detecting T-Outro Animation...", "Appending T-Outro Animation...", "Done."],
                percentage: 0,
                timer: null,
                error: false,
                eventSource: null
            }

            this.progressBar.timer = setInterval(this.updateProgressBar, 100)
        },
        updateProgressBar() {
            let percentDifference = this.progressBar.phaseValues[this.progressBar.phase] - this.progressBar.percentage;
        
            this.progressBar.percentage += percentDifference * 0.006; 

            if (this.progressBar.phase != 0){
                this.progressBar.percentage = clamp(this.progressBar.percentage, this.progressBar.phaseValues[this.progressBar.phase-1], this.progressBar.phaseValues[this.progressBar.phase])
            } else {
                this.progressBar.percentage = clamp(this.progressBar.percentage, 0, this.progressBar.phaseValues[this.progressBar.phase])
            }
            
            //If eventSource / SSE connection fails: fake progressBar phases
            if (!this.progressBar.eventSource && this.progressBar.phase!= 2 && percentDifference < 5) {
                this.progressBar.phase += 1
            }
        },
        
        async handleFileUpload(event) {

            this.video_file = event.target.files[0];
            console.log(this.video_file)
            this.actionList.commonFiletype = await this.checkFiletype()

            
            if (this.actionList.commonFiletype){
                try {
                    this.isLoadingAnalysis = true;
                    this.initProgressBar()
                    const analysis = await uploadVideo_API(this.video_file);
                    if (analysis.error) {
                        throw new Error(analysis.error)
                    }

                    await this.createVideoSources(analysis.videoOutputFile);
                    await this.loadVideoPlayer();
                    await this.extractAudioBuffer();
                    
                    //Throw an Error if unsupported type (resolution, aspect ratio...)
                    await this.analysisHandler(analysis);
                    await this.actionListModal()
                    console.log(this.actionList)

                } catch (error){
                    console.log("Analysis Error:",error)
                    this.handleProgressAnalysisError(error.message)
                }} 
            else {
                this.showInvalidFormatToast = true;
            }

        },
        
        async checkFiletype() {
            let allowedFiletypes = new Set(["video/mp4", "video/ogg", "video/webm", "video/quicktime"]);

            return allowedFiletypes.has(this.video_file.type);
        },

        handleProgressAnalysisError(error){

            if (error == 'Resolution and display ratio not supported.'){
                this.actionList.commonResolution, this.actionList.commonRatio = false
            } else if (error == 'Resolution not supported.'){
                this.actionList.commonResolution = false
                this.actionList.commonRatio = true
            } else if (error == 'Display ratio not supported.') {
                this.actionList.commonResolution = true
                this.actionList.commonRatio = false
            } else {
                this.progressBar.error = true
            }

            //TBD TOAST DISPLAY SEPARATE FROM FILETYPE
            this.handleReturn()
            this.showResolutionHint = true
            this.showInvalidFormatToast = true

        },
        async analysisHandler(analysis) {

            this.videoAnalysis = analysis.videoAnalysis.analysis;
            console.log("INPUT VIDEO DATA:",analysis.videoAnalysis.inputVideoData)
            console.log("CODEC:",analysis.videoAnalysis.inputVideoData.codec_name)

            this.actionList.audioSegmentEmpty = analysis.audioAnalysis.analysisSegmentEmpty;
            const likely_key = analysis.audioAnalysis.analysis.likely_key;
            const loudness = analysis.audioAnalysis.loudness;

            //KEY ANALYSIS PART
            if (this.actionList.audioSegmentEmpty) {
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

            //T-OUTRO ANALYSIS PART
            if (this.videoAnalysis.logo_start == "None"){
                this.actionList.logoDetected = false;
            } else {
                this.actionList.logoDetected = true;
                this.animationLength = this.audioDuration - this.videoAnalysis.logo_start

                if (this.animationLength < this.animationMinimumLength)
                    {
                        this.actionList.fatalAnimationLength = true
                        console.log(`FATAL ANIMATION LENGTH (${this.animationMinimumLength}):`, this.animationLength)
                    }
            }


            //APPENDED ANIMATION PART
            if (analysis.videoAnalysis.appendAnimation == true) {
                console.log("APPENDED ANIMATION")
                this.videoAnalysis.logo_start = this.audioDuration - 1.04
                this.actionList.appendedAnimation = analysis.videoAnalysis.appendAnimation;
                this.actionList.convertedVideo = analysis.videoAnalysis.convertedVideo;
            }

            //CONVERTED VIDEO PART
            if (analysis.videoAnalysis.convertedVideo == true) {
                this.actionList.convertedVideo = true
            }

            //SIMPLE SUCCESS FEEDBACK
            if (this.actionList.logoDetected && this.actionList.keyDetected || this.actionList.appendedAnimation && this.actionList.keyDetected){
                this.actionList.success = true;
            }



            this.setSoundlogoPosition()
            this.setVideoMarker();
            this.setLoudness();

        },
        async createVideoSources(video_name){

            const parsedPath = video_name.split("/");
            this.video_path = `./temp_uploads/video/${parsedPath[parsedPath.length-1]}`

            const response = await fetch(this.video_path);
            const blob = await response.blob();

            this.video_file = new File([blob], this.video_path, {
                type: "video/mp4",
            });
            this.video_url = await URL.createObjectURL(this.video_file);
        },   
        actionListModal(){

            if (!this.actionList.fatalAnimationLength){
                this.showResultModal = true
            }  else {
                this.progressBar.error = true
            }
        
        },

        /*async checkResolution() {

            this.showResolutionHint = false

            let width = videoPlayer.videoWidth()
            let height = videoPlayer.videoHeight()
            let ratio = width / height
            console.log(width, height, ratio)
    
                if (ratio == (16/9) || ratio == (9/16) || ratio == 1) {
                    this.actionList.commonRatio = true
                }
                else {
                    this.actionList.commonRatio = false
                    this.showResolutionHint = true
    
                }
                if (width >= 1080 && height >= 1080) {
                    this.actionList.commonResolution = true
                }
                else {
                    this.actionList.commonResolution = false
                    this.showResolutionHint= true
    
                }        
        },*/

        setVideoMarker(){

            let left
            if (this.soundlogoPosition < 0) {
                left = "0%"}
            else {
                left = (this.soundlogoPosition / this.audioDuration * 100) + '%';
                }

            if (this.marker.exists){
                let left = (this.soundlogoPosition / this.audioDuration * 100) + '%';
                this.marker.element.style.left = left
                this.marker.element.setAttribute('data-time', this.soundlogoPosition);


            } else {
                const markerElement = document.createElement('div');



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
            this.soundlogoPosition = this.videoAnalysis.logo_start - 4.25 //Hardcut: 4.25, Besser in Sync: 3.7
            
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
            console.log("Loading", this.video_path)

            try {
                if (this.video_file.name.endsWith('.mp4')) {
                    type = 'video/mp4';
                } else if (this.video_file.name.endsWith('.ogv') || this.video_file.name.endsWith('.ogg')) {
                    type = 'video/ogg';
                } else if (this.video_file.name.endsWith('.webm')) {
                    type = 'video/webm';
                } else {
                    throw new Error('Unsupported video format');
                }
            
                videoPlayer.src({
                    type: type,
                    src: this.video_path
                });
                await videoPlayer.load();

                this.videoPlayerLUFS = -26.71;
                this.setLoudness()
                this.volumeElement = document.querySelector('.vjs-volume-level');
                this.volumeElement.style.width = "70%"

                console.log("Video player loaded", videoPlayer)

            } catch (error) {
                console.error("Error loading video-player",error)
            }
        },

        async setLoudness(){

            const soundlogoDb = this.measuredLUFS - this.soundlogoLUFS;
            logoPlayer.set({volume: soundlogoDb})

            masterDb = this.desiredMasterLUFS - this.measuredLUFS;
            listeningDb = this.videoPlayerLUFS - this.measuredLUFS;


            if(this.isLoadingResult){
                master.set({gain: masterDb})
                console.log("MASTER DB", masterDb)
            } 
                else {
                master.set({gain: listeningDb})
                console.log("LISTENING DB", listeningDb)
            }

        },

        async extractAudioBuffer() {

            try {
                audioBuffer = await Tone.ToneAudioBuffer.fromUrl(this.video_url);
                console.log("Audio buffer loaded:", audioBuffer);
                audioPlayer.buffer = audioBuffer;
                this.audioDuration = audioPlayer.buffer.duration;
                console.log("AUDIO DURATION:", this.audioDuration)


            } catch (error) {
                console.error("Failed to load audio buffer:", error);
            }
        },
        updateListeningVolume(event){
            videoPlayer.muted(true)
            this.videoPlayerLUFS = scaleValue(event.target.volume)
            this.setLoudness()

            if (this.volumeElement) {
                this.volumeElement.style.width = event.target.volume*100 + '%';
            }
        },

        startPlayback() {
            this.playbackPosition = videoPlayer.currentTime();
            startTransports(this.playbackPosition, this.audioDuration, this.soundlogoPosition);
            console.log("Start Playback")
        },
        stopPlayback() {
            console.log("Stop Playback")
            stopTransports();
        },
        async downloadVideo() {
            this.isLoadingResult = true;
            const renderedBuffer = await this.renderAudio();
            const basename = this.video_file.name.split(".")[0]
            const videoFilepath = await uploadRenderedAudio_API(renderedBuffer, basename);
            this.isLoadingResult = false;
        },
        async downloadAudio() {
            this.isLoadingResult = true;
            const renderedBuffer = await this.renderAudio();
            downloadAudio(renderedBuffer, this.video_file.name);
            this.isLoadingResult = false;

        },
        async renderAudio() {
            const renderedBuffer = await Tone.Offline(async ({ transport }) => {
                await setupAudioNodes(transport.context);
                await this.extractAudioBuffer()
                //await updateLogoBuffer(this.selectedKey.key)
                await this.setLoudness()

                scheduleAudio(this.audioDuration, 0, this.soundlogoPosition,transport);
                scheduleFilter(this.audioDuration, 0, this.soundlogoPosition, transport)
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
let filter
let filterEnvelope
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

        master = await loadMasterGain(context);
        console.log('Master gain node initialized:', master);

        envelope = await ampEnvelope();
        console.log('Envelope initialized:', envelope);

        audioPlayer = await loadAudioplayer(context);
        console.log('Audio player initialized:', audioPlayer);

        filterEnvelope = await loadFilterEnvelope();
        console.log('Filter-Envelope initialized:', filterEnvelope);

        filter = await loadFilter(context)
        console.log('Filter initialized:', filter);

        await loadLogoBuffers();
        logoPlayer = await loadLogoPlayer(context);
        console.log('Logo player initialized:', logoPlayer);

        console.log('Audio nodes setup complete.');
    } catch (error) {
        console.error('Error setting up audio nodes:', error);
    }
}



function downloadAudio(buffer, writeName) {
    // Convert the buffer to a WAV Blob
    const wavBlob = convertToWav(buffer);

    // Create an object URL for the Blob
    const url = URL.createObjectURL(wavBlob);

    // Create a download link
    const link = document.createElement('a');
    link.href = url;
    link.download = writeName.split('.').slice(0, -1).join('.');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
    scheduleFilter(audioDuration, currentPosition, logoStart, transport)

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
    filterEnvelope.cancel();
    videoPlayer.pause();
}

let filterSettings = {attack: 1, start:20000, frequency:1000, rampTime:1.75, delay:1.25}

function scheduleFilter(audioDuration, currentPosition, logoStart, transport) {

    filter.set({frequency: filterSettings.start})

    const secondsTillLogoStart = calculateLogoScheduleTime(audioDuration, currentPosition, logoStart);
    if (secondsTillLogoStart >= 0) {

        transport.schedule((time) => {
            filterEnvelope.triggerAttack(time);
            console.log("Go Filter!");
        }, `+${secondsTillLogoStart}`);

        transport.schedule((time) => {
            filter.frequency.exponentialRampTo(filterSettings.frequency, filterSettings.rampTime, time)
            console.log("Go Filter Ramp!");
        }, `+${secondsTillLogoStart+filterSettings.delay}`);
    }
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

async function loadLogoPlayer(Context, tonality = 'A') {

    const logoBuffer = logoBuffers.get('A');
    const newLogoPlayer = new Tone.Player({ url: logoBuffer, context: Context, volume: 0 });

    newLogoPlayer.connect(master)

    return newLogoPlayer

}

function getVideoDimensions(url) {
    return new Promise((resolve, reject) => {
        // Create a temporary video element
        const video = document.createElement('video');

        // Set the source of the video
        video.src = url;

        // Listen for the loadedmetadata event to get dimensions
        video.addEventListener('loadedmetadata', () => {
            // Resolve the promise with the video's width and height
            resolve({
                width: video.videoWidth,
                height: video.videoHeight
            });

            // Clean up
            video.remove();
        });

        // Handle errors
        video.addEventListener('error', (e) => {
            reject(e);
        });

        // Load the video metadata
        video.load();
    });
}

async function loadAudioplayer(Context) {

    const newAudioPlayer = new Tone.Player({ url: audioBuffer, context: Context, volume: 0 });

    return newAudioPlayer

}


async function loadFilter(Context){
    const filterEffect = new Tone.Filter({frequency:20000, type:"lowpass", context: Context});

    const audioPlayerCrossFade = new Tone.CrossFade()
    audioPlayerCrossFade.fade.value = 0;
    audioPlayerCrossFade.chain(envelope, master);
    audioPlayer.fan(audioPlayerCrossFade.a, filterEffect);

    filterEffect.connect(audioPlayerCrossFade.b);
    filterEnvelope.connect(audioPlayerCrossFade.fade)

    return filterEffect

}

async function loadFilterEnvelope(){
    const ampEnv = new Tone.Envelope({
        attack: filterSettings.attack,
        decay: 0,
        sustain: 1,
        release: 0
    });

    ampEnv.attackCurve ="cosine";

    return ampEnv
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


async function uploadRenderedAudio_API(buffer, name) {

    const formData = await audioToWavFile(buffer, name);

    try {
        const response = await fetch('/chord-retrieval-ai/uploadRenderedAudio', {
            method: 'POST',
            body: formData,
        });

        const data = await response.json();
        console.log('Audio uploaded successfully:', data);

        await downloadFile('/download/streamable/?file=' + data.renderedResult, data.renderedResult);

        console.log('Downloaded successfully:', data);

    } catch (error) {
        console.error('Error during download:', error);
    }


    function audioToWavFile(buffer, name) {

        const wavBlob = convertToWav(buffer);

        const audioFile = new File([wavBlob], `${name}.wav`, { type: 'audio/wav' });
        const formData = new FormData();
        formData.append('file', audioFile);
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

function scaleValue(value) {
    const minInput = 0;
    const maxInput = 1;
    const minOutput = -80;
    const maxOutput = -14;

    // Ensure the value is within the input range
    value = Math.min(Math.max(value, minInput), maxInput);

    // Apply exponential scaling
    const expValue = Math.pow(value, 0.6); // Exponent chosen for scaling, can be adjusted

    // Scale to the output range
    const output = minOutput + (maxOutput - minOutput) * expValue;

    return output;
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
