const ALLOWED_GUESSES = 5
const WORD_LENGTH = 5
let userWon = false
let userGuesses = 0
let userCurrentWord = ""
let wordToGuess = "EARTH" //make sure the word is capitalized

function initializeElements() {
    tilesElement = document.getElementById("tiles")

    for (let i = 0; i < ALLOWED_GUESSES; i++) {
        let row = document.createElement("div")
        console.log("Row created")
        row.className = "tiles-row"

        for (let j=0; j < WORD_LENGTH; j++) {
            let box = document.createElement("div")
            box.className = "row-box"
            row.appendChild(box)
        }

        tilesElement.appendChild(row)
    }

    console.log(tilesElement)
}

function addLetter(letterASCII) {
    console.log("Current word length: " + userCurrentWord.length)
    console.log("Current word: " + userCurrentWord)
    if (userCurrentWord.length < WORD_LENGTH)
    {
        console.log("User guesses:" + userGuesses)
        userCurrentWord += String.fromCharCode(letterASCII)
        let row = document.getElementsByClassName("tiles-row")[userGuesses]
        let box = row.children[userCurrentWord.length - 1]
        box.textContent = String.fromCharCode(letterASCII)
        console.log(userCurrentWord)
    }
}

function deleteLetter() {
    if (userCurrentWord.length > 0)
    {
        userCurrentWord = userCurrentWord.substring(0, userCurrentWord.length - 1)
        let row = document.getElementsByClassName("tiles-row")[userGuesses]
        let box = row.children[userCurrentWord.length]
        box.textContent = ""
        console.log(userCurrentWord)
    }
}

function checkGuess() {
    letterFreq = 0
    yellowFreq = 0
    sameLetterIndexes = []
    if (userCurrentWord == wordToGuess)
    {
        for (let i = 0; i < WORD_LENGTH; i++)
        {
            let row = document.getElementsByClassName("tiles-row")[userGuesses]
            let box = row.children[i]
            box.style.backgroundColor = 'green'
            box.style.color = 'white'
        }
        console.log("You won!")
        userWon = true
        userCurrentWord = ""
    }
    else
    {
        for (let i = 0; i < WORD_LENGTH; i++)
        {
            if (userCurrentWord[i] == wordToGuess[i])
            {
                let row = document.getElementsByClassName("tiles-row")[userGuesses]
                let box = row.children[i]
                box.style.backgroundColor = 'green'
                box.style.color = 'white'
            }
            else
            {
                for (let j = 0; j < WORD_LENGTH; j++)
                {
                    let row = document.getElementsByClassName("tiles-row")[userGuesses]
                    let box = row.children[i]
                    if (userCurrentWord[i] == wordToGuess[j] && box.style.backgroundColor != 'green') //fix this if.
                    {
                        letterFreq++
                    }
                    else
                    {
                        box.style.backgroundColor = 'grey'
                        box.style.color = 'white'
                    }
                }
                console.log("Letter freq " + userCurrentWord[i] + ": " + letterFreq)
                for (let j = 0; j < WORD_LENGTH; j++)
                {
                    if ((userCurrentWord[i] == wordToGuess[j]) && yellowFreq < letterFreq)
                    {
                        let row = document.getElementsByClassName("tiles-row")[userGuesses]
                        let box = row.children[i]
                        box.style.backgroundColor = 'yellow'
                        box.style.color = 'white'
                        yellowFreq++
                    }
                }
                yellowFreq = 0
                letterFreq = 0
            }
        }
        userGuesses++
        userCurrentWord = ""
        console.log("User guesses incremented.")
    }
}

function handleKey(event) {
    console.log(event.key)
    console.log(event.keyCode)
    if (userGuesses > ALLOWED_GUESSES || userWon == true)
    {
        return
    }
    if (event.keyCode == 13 && userCurrentWord.length == WORD_LENGTH)
    {
        checkGuess()
    }
    else if (event.keyCode == 13 && userCurrentWord.length < WORD_LENGTH)
    {
        //shakebox animation - enter full word
        console.log("Enter full word.")
    }
    else if ((event.keyCode >= 65 && event.keyCode <= 90) || (event.keyCode >= 97 && event.keyCode <= 122))
    {
        addLetter(event.keyCode)
    }
    else if (event.keyCode == 8)
    {
        deleteLetter()
    }
    else if (event.keyCode == 17 || event.keyCode == 16 || event.keyCode == 20 || event.keyCode == 18)
    {
        return
    }
    else
    {
        //shakebox animation - only letters allowed
        console.log("Letters allowed only.")
    }
}

initializeElements()
document.addEventListener("keyup", handleKey)