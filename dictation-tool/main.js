document.getElementById('dictation-form').addEventListener('submit', function(event) {
    event.preventDefault(); // prevent the form from actually submitting (reloading the page)

    const inputText = document.getElementById('dictation-input').value;
    console.log('Submitted text:', inputText);

    const dictactionText = transformForDictation(inputText);

    document.getElementById("transformed-text").textContent = dictactionText;
});

// Select specific inputs
const pausePerLetterInput = document.getElementById('pausePerLetter');
const pausePerCommaInput = document.getElementById('pausePerComma');
const pausePerPointInput = document.getElementById('pausePerPoint');
const verbaliseCommataInput = document.getElementById('verbaliseCommata');
const verbalisePointsInput = document.getElementById('verbalisePoints');

let pausePerLetter = 0.3;
let pausePerComma = 1.;
let pausePerPoint = 2.;
let verbaliseCommata = false;
let verbalisePoints = false;

// Add event listeners for number input
pausePerLetterInput.addEventListener('input', (e) => {
    pausePerLetter = e.target.value;
});
pausePerCommaInput.addEventListener('input', (e) => {
    pausePerComma = e.target.value;
});
pausePerPointInput.addEventListener('input', (e) => {
    pausePerPoint = e.target.value;
});

// Add event listener for checkbox
verbaliseCommataInput.addEventListener('change', (e) => {
    verbaliseCommata = e.target.checked;
});
verbalisePointsInput.addEventListener('change', (e) => {
    verbalisePoints = e.target.checked;
});

function autoResize(textarea) {
    textarea.style.height = 'auto'; // Reset height
    textarea.style.height = textarea.scrollHeight + 'px'; // Set height to scrollHeight
}
autoResize(document.getElementById('dictation-input'));

function transformForDictation(textInput) {
    console.log(typeof textInput);
    if (typeof textInput !== "string") {
        console.error("received non text input");
        return "ERROR";
    }
    // first split the text into words
    const words = textInput.split(/\s/);
    // initialize the dictation text as an empty string
    let dictactionText = "";
    // for each word: count the letters and create a pause to follow it, depending on the letter count
    let lineStarts = true;
    let sentenceEnds = false;
    for (let word of words) {
        if (sentenceEnds) {
            // if a sentence ended on the word before: a new line starts here
            lineStarts = true;
            sentenceEnds = false; 
        }
        let pause = word.length * pausePerLetter;
        // check if it contains commas or pointation (which would lead to longer pauses)
        if (word.indexOf(",") !== -1) {
            pause += pausePerComma;
            if (verbaliseCommata)
                word = word.replace(",","<say-as interpret-as=\"verbatim\">,</say-as>");
        }
        if (word.indexOf(".") !== -1) {
            sentenceEnds = true;
            pause += pausePerPoint;
            if (verbalisePoints)
                word = word.replace(".","<say-as interpret-as=\"verbatim\">.</say-as>");
        }
        // add the word, then the pause
        if (lineStarts) {
            lineStarts = false;
            dictactionText += "\n\t";
        }
        dictactionText += word + " <break time=\""+pause.toFixed(1)+"s\"/> ";
    }
    // finally, wrap in <speak>
    dictactionText = "<speak>"+dictactionText+"\n</speak>";
    return dictactionText;
}