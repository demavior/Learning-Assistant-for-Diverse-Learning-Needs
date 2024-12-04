import { startWebSocket, stopWebSocket, wsRecording} from './websocket.js';
import { startTranscription, stopTranscription , isRecording} from './windowTranscribe.js';
import { showTab, summarizeText, translateText } from './ui-handlers.js';
import { downloadText, uploadText } from './file-handlers.js';

// Toggle recording on button click
document.getElementById("startRecordingButton").onclick = function() {
    //wsRecording ? stopWebSocket() : startWebSocket();
    isRecording ? stopTranscription() : startTranscription();
};

// Add event listener for file handlers
document.getElementById('uploadTextFile').addEventListener('change', () => uploadText());
document.getElementById('downloadTranscriptButton').addEventListener('click', () => downloadText('transcriptionText', 'transcription.txt'));
document.getElementById('downloadSummaryButton').addEventListener('click', () => downloadText('summarizationText', 'summary.txt'));
document.getElementById('downloadTranslationButton').addEventListener('click', () => downloadText('translationText', 'translation.txt'));

// Event Listeners for summarize, translate and switch tab
document.getElementById("summarizeButton").onclick = () => summarizeText();
document.getElementById("translateButton").onclick = () => translateText();
document.querySelectorAll('.tab').forEach(tab => {tab.onclick = function() {
        showTab(this.getAttribute('data-tab'));
    };
});