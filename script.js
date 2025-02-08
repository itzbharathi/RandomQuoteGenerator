const backupQuotes = [
    { text: "The only limit to our realization of tomorrow is our doubts of today.", author: "Franklin D. Roosevelt" },
    { text: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius" },
    { text: "The best way to predict the future is to invent it.", author: "Alan Kay" },
    { text: "Do what you can, with what you have, where you are.", author: "Theodore Roosevelt" },
    { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
    { text: "Act as if what you do makes a difference. It does.", author: "William James" },
    { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
    { text: "Do what you feel in your heart to be right – for you’ll be criticized anyway.", author: "Eleanor Roosevelt" },
    { text: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
    { text: "Keep your face always toward the sunshine—and shadows will fall behind you.", author: "Walt Whitman" },
    { text: "Everything you’ve ever wanted is on the other side of fear.", author: "George Addair" },
    { text: "It’s not whether you get knocked down, it’s whether you get up.", author: "Vince Lombardi" },
    { text: "You only live once, but if you do it right, once is enough.", author: "Mae West" },
    { text: "Happiness depends upon ourselves.", author: "Aristotle" },
    { text: "Turn your wounds into wisdom.", author: "Oprah Winfrey" },
    { text: "In the middle of every difficulty lies opportunity.", author: "Albert Einstein" },
    { text: "What you get by achieving your goals is not as important as what you become by achieving your goals.", author: "Zig Ziglar" },
    { text: "Believe in yourself and all that you are. Know that there is something inside you that is greater than any obstacle.", author: "Christian D. Larson" },
    { text: "If you want to lift yourself up, lift up someone else.", author: "Booker T. Washington" },
    { text: "Do what you love and the money will follow.", author: "Marsha Sinetar" },
    { text: "Act as if what you do makes a difference. It does.", author: "William James" },
    { text: "Stay hungry, stay foolish.", author: "Steve Jobs" },
    { text: "Effort only fully releases its reward after a person refuses to quit.", author: "Napoleon Hill" }
];

let lastQuotes = [];

async function getQuote() {
    let loadingElement = document.getElementById("loading");
    let quoteElement = document.getElementById("quote");
    let authorElement = document.getElementById("author");

    loadingElement.classList.remove("hidden");
    quoteElement.innerText = "";
    authorElement.innerText = "";

    try {
        const response = await fetch("https://type.fit/api/quotes");
        if (!response.ok) throw new Error("API Error");

        const data = await response.json();
        let randomQuote;

        do {
            randomQuote = data[Math.floor(Math.random() * data.length)];
        } while (lastQuotes.includes(randomQuote.text)); // Ensure unique quotes

        quoteElement.innerHTML = `"${randomQuote.text}"`;
        authorElement.innerText = `- ${randomQuote.author || "Unknown"}`;

        updateHistory(randomQuote.text);
    } catch (error) {
        console.error("Error fetching quote:", error);
        let fallbackQuote;

        do {
            fallbackQuote = backupQuotes[Math.floor(Math.random() * backupQuotes.length)];
        } while (lastQuotes.includes(fallbackQuote.text)); // Prevent repeats

        quoteElement.innerText = `"${fallbackQuote.text}"`;
        authorElement.innerText = `- ${fallbackQuote.author}`;

        updateHistory(fallbackQuote.text);
    } finally {
        loadingElement.classList.add("hidden");
    }
}

function copyQuote() {
    let text = document.getElementById("quote").innerText + " " + document.getElementById("author").innerText;
    navigator.clipboard.writeText(text).then(() => alert("Copied to clipboard!"));
}

function tweetQuote() {
    let text = document.getElementById("quote").innerText + " " + document.getElementById("author").innerText;
    let url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
}

function updateHistory(quoteText) {
    if (lastQuotes.length >= 10) lastQuotes.shift(); // Store last 10 quotes
    lastQuotes.push(quoteText);

    let historyElement = document.getElementById("quote-history");
    historyElement.innerHTML = lastQuotes.map(q => `<li>"${q}"</li>`).join("");
}

// Load a quote on page load
getQuote();
