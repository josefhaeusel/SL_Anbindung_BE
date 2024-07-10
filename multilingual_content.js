const I18n = VueI18n.createI18n({
    locale: 'English',
    messages: {
        English: {
            title: {
                main: 'Soundlogo Wizard',
                sub: 'Add the iconic Telekom Soundlogo at the end of all videos.<br>Keep everything on brand with the help of AI.'
            },
            upload: {
                instructions: 'Upload a Video or Drop the File Here',
                button: 'Upload a Video',
                invalidFormat: 'The provided filetype is invalid.',
                supportedFormats: 'Supported formats: MP4, WebM, OGG.',
                supportedResolutions: 'Supported resolutions: FullHD, UHD.',
                supportedRatios: 'Supported ratios: 16:9, 9:16, 1:1.'
            },
            progressTexts: ['Uploading Video...', 'Retrieving Video Data...', 'Converting Video Format...',"Splitting Audio from Video...", "Detecting T-Outro Animation...", "Retrieving Key and Loudness...", "Appending T-Outro Animation...", "Loading Video...", "Done."],
            analyzing: 'Analyzing...',
            error: 'Something went wrong. Please try uploading again.',
            video: {
                noJs: 'To view this video please enable JavaScript, and consider upgrading to a web browser that',
                upgrade: 'supports HTML5 video'
            },
            download: {
                result: 'Download Result'
            },
            soundlogo: {
                key: 'Soundlogo Key',
                recommended: 'Recommended'
            },
            actions: {
                title: 'What we did:',
                appendedAnimation: 'Appended Animation',
                logoDetected: 'Detected Animation',
                appendedDescription: 'Because the T-Outro Animation could not be detected, it was appended to the video\'s ending.',
                detectedDescription: 'The T-Outro Animation was detected by Computer-Vision AI.',
                setSoundlogo: 'Set Soundlogo',
                synchronized: 'The Telekom Soundlogo has been synchronized to the T-Outro animation.',
                matched: 'Its tonality and loudness have been matched to the AI-detected music. The music has been filtered and faded for a smooth transition.',
                audioEmpty: 'Your video\'s audio track is empty or doesn\'t exist. The Soundlogo\'s tonality and loudness have been set to standardized values.',
                silentEnding: 'Your video ending (except animation) is silent. The Soundlogo\'s tonality has been set to standardized values.',
                convertedFormat: 'Converted Format',
                convertedDescription: 'Converted video codec from {codec} to H264 (.mp4).',
                masteredLoudness: 'Mastered Loudness',
                loudness: 'The overall loudness of the audio track has been set to standardized {loudness}LUFS.'
            }
        },
        Deutsch: {
            title: {
                main: 'Soundlogo Wizard',
                sub: 'Binden Sie das ikonische Telekom Soundlogo an das Ende aller Videos an.<br>Bleibe mithilfe von KI on-Brand.'
            },
            upload: {
                instructions: 'Laden Sie ein Video hoch oder ziehen Sie die Datei hierher',
                button: 'Ein Video hochladen',
                invalidFormat: 'Der bereitgestellte Dateityp ist ungültig.',
                supportedFormats: 'Unterstützte Formate: MP4, WebM, OGG.',
                supportedResolutions: 'Unterstützte Auflösungen: FullHD, UHD.',
                supportedRatios: 'Unterstützte Seitenverhältnisse: 16:9, 9:16, 1:1.'
            },
            progressTexts: ['Video hochladen...', 'Videodaten abrufen...', 'Videoformat konvertieren...', "Audio vom Video trennen...", "T-Outro-Animation ermitteln...", "Tonart und Lautstärke erkennen...", "T-Outro-Animation anhängen...", "Video laden...", "Fertig."],
            analyzing: 'Analysieren...',
            error: 'Etwas ist schief gelaufen. Bitte versuchen Sie es erneut hochzuladen.',
            video: {
                noJs: 'Um dieses Video anzusehen, aktivieren Sie bitte JavaScript und erwägen Sie ein Upgrade auf einen Webbrowser, der',
                upgrade: 'HTML5-Video unterstützt'
            },
            download: {
                result: 'Video Herunterladen'
            },
            soundlogo: {
                key: 'Soundlogo Tonart',
                recommended: 'Empfohlen'
            },
            actions: {
                title: 'Was wir erledigt haben:',
                appendedAnimation: 'Animation angebunden',
                logoDetected: 'Animation erkannt',
                appendedDescription: 'Da die T-Outro Animation nicht erkannt werden konnte, wurde sie an das Videoende angehängt.',
                detectedDescription: 'Die T-Outro Animation wurde durch Computer-Vision AI erkannt.',
                setSoundlogo: 'Soundlogo platziert',
                synchronized: 'Das Telekom Soundlogo wurde mit der T-Outro Animation synchronisiert.',
                matched: 'Seine Tonalität und Lautstärke wurden an die von der KI erkannte Musik angepasst. Die Musik wurde gefiltert und für einen sanften Übergang ausgeblendet.',
                audioEmpty: 'Die Audiospur Ihres Videos ist leer oder existiert nicht. Die Tonalität und Lautstärke des Soundlogos wurden auf standardisierte Werte eingestellt.',
                silentEnding: 'Ihr Videoende (außer Animation) ist still. Die Tonalität des Soundlogos wurde auf standardisierte Werte eingestellt.',
                convertedFormat: 'Format konvertiert',
                convertedDescription: 'Videocodec konvertiert von {codec} zu H264 (.mp4).',
                masteredLoudness: 'Lautstärke gemastered',
                loudness: 'Die Gesamtlautstärke der Audiospur wurde auf standardisierte {loudness}LUFS gesetzt.'
            }
        }
    }
})