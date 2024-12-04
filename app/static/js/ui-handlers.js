const summarizationTextEl = document.getElementById("summarizationText");
const translationTextEl = document.getElementById("translationText");
const transcriptionTextEl = document.getElementById("transcriptionText");
const languageSelector = document.getElementById("languageSelector");

function showTab(tabId) {
    document.querySelectorAll('.result-container').forEach(tab => tab.style.display = 'none');
    document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
    document.getElementById(tabId).style.display = 'block';
    event.target.classList.add('active');
}

async function summarizeText() {
    const transcription = transcriptionTextEl.innerText;
    if (!transcription.trim()) {
        summarizationTextEl.innerText = "No transcription available to summarize.";
        return;
    }
    summarizationTextEl.innerText = await fetchData('/summarize', transcription, summarizationTextEl);
}

async function translateText() {
    const transcription = transcriptionTextEl.innerText;
    if (!transcription.trim()) {
        translationTextEl.innerText = "No transcription available to translate.";
        return;
    }
    console.log(languageSelector.value);
    translationTextEl.innerText = await fetchData('/translate', transcription, translationTextEl, languageSelector.value);
}

async function fetchData(url, text, resultElement, target_language = null) {
    resultElement.innerText = url.includes('summarize') ? "Summarizing..." : "Translating...";
    resultElement.classList.add("loading");
    const bodyContent = target_language ? { text, target_language } : { text };
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bodyContent)
        });
        const data = await response.json();
        resultElement.classList.remove("loading");
        return data.summary || data.translation || "No result available.";
    } catch (error) {
        resultElement.classList.remove("loading");
        console.error('Fetch Error:', error);
        return `Error: ${error.message}`;
    }
}

export { showTab, summarizeText, translateText };