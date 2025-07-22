// --- GET REFERENCES TO HTML ELEMENTS ---
const quoteTextElem = document.getElementById('quote-text');
const quoteAuthorElem = document.getElementById('quote-author');
const newQuoteBtn = document.getElementById('new-quote-btn');
const buttonText = document.getElementById('button-text');
const statusIndicator = document.getElementById('status-indicator');
const quoteDisplay = document.getElementById('quote-display');
const fetchNewBtn = document.getElementById('fetch-new-btn');
// Gemini-related elements
const explainQuoteBtn = document.getElementById('explain-quote-btn');
const explainButtonText = document.getElementById('explain-button-text');
const explanationContainer = document.getElementById('explanation-container');
const explanationText = document.getElementById('explanation-text');


// --- CACHE ---
let cachedQuote = null;

// --- UI UPDATE FUNCTION ---
function updateUI(quote) {
    quoteDisplay.classList.remove('fade-in');
    void quoteDisplay.offsetWidth;
    quoteDisplay.classList.add('fade-in');

    quoteTextElem.textContent = `"${quote.quote}"`;
    quoteAuthorElem.textContent = `- ${quote.author}`;

    // Show the explain button now that we have a quote
    explainQuoteBtn.classList.remove('hidden');
    // Hide any previous explanation
    explanationContainer.classList.add('hidden');
}

// --- GEMINI API CALL FUNCTION ---
async function callGemini(prompt) {
    // Display loading state
    explanationContainer.classList.remove('hidden');
    explanationText.innerHTML = '✨ Thinking...';
    explainButtonText.textContent = 'Explaining...';
    explainQuoteBtn.disabled = true;

    const apiKey = "AIzaSyBM8A2_IC8JQW4YKNjVniyJO_csHDYiO6c"; // API key is handled by the environment
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    const payload = {
        contents: [{
            role: "user",
            parts: [{ text: prompt }]
        }]
    };

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const result = await response.json();
        
        // **FIX**: Added detailed logging of the raw API response for debugging.
        console.log("--- Full Gemini API Response ---");
        console.log(JSON.stringify(result, null, 2));
        console.log("-----------------------------");


        if (!response.ok) {
            // If the response has an error message, use it.
            const errorMsg = result?.error?.message || `API request failed with status ${response.status}`;
            throw new Error(errorMsg);
        }
        
        if (result.candidates && result.candidates.length > 0 && result.candidates[0].content) {
            const text = result.candidates[0].content.parts[0].text;
            const htmlText = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
            explanationText.innerHTML = `<p>${htmlText.replace(/\n/g, '</p><p>')}</p>`;
        } else {
            if (result.promptFeedback && result.promptFeedback.blockReason) {
                throw new Error(`Content blocked due to ${result.promptFeedback.blockReason}.`);
            } else {
                throw new Error("Invalid response structure from Gemini.");
            }
        }

    } catch (error) {
        console.error("Gemini API Error:", error);
        explanationText.textContent = `Sorry, an error occurred: ${error.message}`;
    } finally {
        // Restore button state
        explainButtonText.textContent = 'Explain this Quote';
        explainQuoteBtn.disabled = false;
    }
}


// --- EVENT LISTENERS ---

// Main "Get Quote" button
newQuoteBtn.addEventListener('click', () => {
    let quotePromise;

    if (cachedQuote) {
        console.log('💡 CACHE HIT: Using cached data.');
        statusIndicator.textContent = 'Loaded from Cache ✨';
        quotePromise = Promise.resolve(cachedQuote);
    } else {
        console.log('🌐 CACHE MISS: Fetching from API...');
        statusIndicator.textContent = 'Fetching from Network...';
        newQuoteBtn.disabled = true;
        fetchNewBtn.disabled = true;
        buttonText.textContent = 'Loading...';

        quotePromise = fetch('https://dummyjson.com/quotes/random')
            .then(response => {
                if (!response.ok) throw new Error(`Network response was not ok: ${response.statusText}`);
                return response.json();
            })
            .then(data => {
                cachedQuote = data;
                console.log('💾 Saved to cache.');
                return data;
            })
            .finally(() => {
                newQuoteBtn.disabled = false;
                fetchNewBtn.disabled = false;
                buttonText.textContent = 'Get Quote';
            });
    }

    quotePromise
        .then(updateUI)
        .catch(error => {
            console.error('❌ [Promise Rejected]', error);
            statusIndicator.textContent = 'Error! Check console.';
            quoteTextElem.textContent = 'Could not fetch a quote. Please try again!';
            quoteAuthorElem.textContent = '';
            explainQuoteBtn.classList.add('hidden');
        });
});

// "Fetch New" button
fetchNewBtn.addEventListener('click', () => {
    cachedQuote = null;
    console.log('🗑️ Cache cleared.');
    newQuoteBtn.click();
});

// "Explain Quote" button (Gemini)
explainQuoteBtn.addEventListener('click', () => {
    if (!cachedQuote) return;

    const prompt = `Please provide a brief and insightful explanation for the following quote. Keep it concise (2-3 sentences). Also, give a one-sentence fun fact or context about the author. Format your response with bolded titles like **Meaning:** and **About the Author:**. The quote is: "${cachedQuote.quote}" by ${cachedQuote.author}.`;

    callGemini(prompt);
});
