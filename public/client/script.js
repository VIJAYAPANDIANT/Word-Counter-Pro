"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const textInput = document.getElementById('textInput');
const wordCountEl = document.getElementById('wordCount');
const charCountEl = document.getElementById('charCount');
const charCountNoSpacesEl = document.getElementById('charCountNoSpaces');
function analyzeText(text) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch('/api/analyze', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text }),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = yield response.json();
            updateUI(data);
        }
        catch (error) {
            console.error('Error analyzing text:', error);
        }
    });
}
function updateUI(stats) {
    wordCountEl.textContent = stats.wordCount.toString();
    charCountEl.textContent = stats.charCount.toString();
    charCountNoSpacesEl.textContent = stats.charCountNoSpaces.toString();
}
// Debounce function to prevent too many API calls
function debounce(func, wait) {
    let timeout;
    return function (...args) {
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
    };
}
const handleInput = debounce((e) => {
    const target = e.target;
    analyzeText(target.value);
}, 300);
textInput.addEventListener('input', handleInput);
// File Upload Logic
const uploadBtn = document.getElementById('uploadBtn');
const fileInput = document.getElementById('fileInput');
uploadBtn.addEventListener('click', () => {
    fileInput.click();
});
fileInput.addEventListener('change', (e) => {
    var _a;
    const target = e.target;
    const file = (_a = target.files) === null || _a === void 0 ? void 0 : _a[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            var _a;
            const content = (_a = event.target) === null || _a === void 0 ? void 0 : _a.result;
            textInput.value = content;
            analyzeText(content);
        };
        reader.readAsText(file);
        // Reset input so the same file can be uploaded again
        target.value = '';
    }
});
