interface AnalysisResponse {
    wordCount: number;
    charCount: number;
    charCountNoSpaces: number;
    success: boolean;
}

const textInput = document.getElementById('textInput') as HTMLTextAreaElement;
const wordCountEl = document.getElementById('wordCount') as HTMLSpanElement;
const charCountEl = document.getElementById('charCount') as HTMLSpanElement;
const charCountNoSpacesEl = document.getElementById('charCountNoSpaces') as HTMLSpanElement;

async function analyzeText(text: string) {
    try {
        const response = await fetch('/api/analyze', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text }),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data: AnalysisResponse = await response.json();
        updateUI(data);
    } catch (error) {
        console.error('Error analyzing text:', error);
    }
}

function updateUI(stats: AnalysisResponse) {
    wordCountEl.textContent = stats.wordCount.toString();
    charCountEl.textContent = stats.charCount.toString();
    charCountNoSpacesEl.textContent = stats.charCountNoSpaces.toString();
}

// Debounce function to prevent too many API calls
function debounce<T extends (...args: any[]) => any>(func: T, wait: number) {
    let timeout: ReturnType<typeof setTimeout> | undefined;
    return function(this: any, ...args: Parameters<T>) {
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
    };
}

const handleInput = debounce((e: Event) => {
    const target = e.target as HTMLTextAreaElement;
    analyzeText(target.value);
}, 300);

textInput.addEventListener('input', handleInput);

// File Upload Logic
const uploadBtn = document.getElementById('uploadBtn') as HTMLButtonElement;
const fileInput = document.getElementById('fileInput') as HTMLInputElement;

uploadBtn.addEventListener('click', () => {
    fileInput.click();
});

fileInput.addEventListener('change', (e: Event) => {
    const target = e.target as HTMLInputElement;
    const file = target.files?.[0];
    
    if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            const content = event.target?.result as string;
            textInput.value = content;
            analyzeText(content);
        };
        reader.readAsText(file);
        
        // Reset input so the same file can be uploaded again
        target.value = '';
    }
});
