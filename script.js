const ALLOWED_GUESSES = 5
const WORD_LENGTH = 5
let userWon = false
let userGuesses = 0
let userCurrentWord = ""
let wordToGuess = "EARTH" //make sure the word is capitalized
let wordLetterFreqDict = {}

function initializeElements() {
    tilesElement = document.getElementById("tiles")

    for (let i = 0; i < ALLOWED_GUESSES; i++) {
        let row = document.createElement("div")
        // console.log("Row created")
        row.className = "tiles-row"

        for (let j=0; j < WORD_LENGTH; j++) {
            let box = document.createElement("div")
            box.className = "row-box"
            box.style.transitionDelay = (WORD_LENGTH + j-4) * 0.25 + "s"
            row.appendChild(box)
        }

        tilesElement.appendChild(row)
    }

    for (let i=0;i<WORD_LENGTH;i++)
    {
        if (!(wordToGuess[i] in wordLetterFreqDict))
        {
            wordLetterFreqDict[wordToGuess[i]] = 1
        }
        else
        {
            wordLetterFreqDict[wordToGuess[i]] += 1
        }
    }

    // console.log(tilesElement)
    // console.log(wordLetterFreqDict)
}

function addLetter(letterASCII) {
    // console.log("Current word length: " + userCurrentWord.length)
    // console.log("Current word: " + userCurrentWord)
    if (userCurrentWord.length < WORD_LENGTH)
    {
        // console.log("User guesses:" + userGuesses)
        userCurrentWord += String.fromCharCode(letterASCII)
        let row = document.getElementsByClassName("tiles-row")[userGuesses]
        let box = row.children[userCurrentWord.length - 1]
        box.textContent = String.fromCharCode(letterASCII)
        // console.log(userCurrentWord)
    }
}

function deleteLetter() {
    if (userCurrentWord.length > 0)
    {
        userCurrentWord = userCurrentWord.substring(0, userCurrentWord.length - 1)
        let row = document.getElementsByClassName("tiles-row")[userGuesses]
        let box = row.children[userCurrentWord.length]
        box.textContent = ""
        // console.log(userCurrentWord)
    }
}

function checkGuess() {
    letterFreq = 0
    yellowFreq = 0
    sameLetterIndexes = []
    var tempWordDict = {...wordLetterFreqDict};
    let tempWord = wordToGuess;
    wordElement = document.getElementById("word")
    if (userCurrentWord == wordToGuess)
    {
        for (let i = 0; i < WORD_LENGTH; i++)
        {
            let row = document.getElementsByClassName("tiles-row")[userGuesses]
            let box = row.children[i]
            box.style.backgroundColor = 'green'
            box.style.color = 'white'
        }
        let text = document.createElement("p")
        text.textContent = "Congratulations! The word was: " + wordToGuess.toUpperCase()
        requestAnimationFrame(() => {
            // Add the smooth transition class to show the text element smoothly
            text.classList.add("show");
          });
      
          // Use requestAnimationFrame to ensure smooth transition
          requestAnimationFrame(() => {
            wordElement.appendChild(text);
          });
        userWon = true
        userCurrentWord = ""
    }
    else
    {
        for (let i = 0; i <WORD_LENGTH;i++)
        {
            firstInstanceIndex = tempWord.indexOf(userCurrentWord[i])
            console.log("First instance: " + firstInstanceIndex)
            if (firstInstanceIndex == -1)
            {
                let row = document.getElementsByClassName("tiles-row")[userGuesses]
                let box = row.children[i]
                box.style.backgroundColor = '#6a6e68'
                box.style.color = 'white'
            }
            else
            {
                if (firstInstanceIndex == i && tempWordDict[userCurrentWord[i]] != 0)
                {
                    let row = document.getElementsByClassName("tiles-row")[userGuesses]
                    let box = row.children[i]
                    box.style.backgroundColor = '#80cf5f'
                    box.style.color = 'white'
                    tempWordDict[userCurrentWord[i]] -= 1
                }
                else
                {
                    let row = document.getElementsByClassName("tiles-row")[userGuesses]
                    let box = row.children[i]
                    box.style.backgroundColor = '#cfc25f'
                    box.style.color = 'white'
                }
                tempWord = tempWord.slice(0, firstInstanceIndex) + tempWord.slice(firstInstanceIndex + 1);
                console.log("Temp word now: " + tempWord)
            }
        }
        userGuesses++
        userCurrentWord = ""

        if (userGuesses >= 5)
        {
            let text = document.createElement("p")
            text.textContent = "You lost! The word was: " + wordToGuess.toUpperCase()
            requestAnimationFrame(() => {
                // Add the smooth transition class to show the text element smoothly
                text.classList.add("show");
              });
          
              // Use requestAnimationFrame to ensure smooth transition
              requestAnimationFrame(() => {
                wordElement.appendChild(text);
              });
        }
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
        tilesElement.classList.add("shake");
        setTimeout(() => {
        tilesElement.classList.remove("shake");
        }, 500);
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
        tilesElement.classList.add("shake");
        setTimeout(() => {
        tilesElement.classList.remove("shake");
        }, 500);
        console.log("Letters allowed only.")
    }
}

const apiUrl = "https://random-word-api.herokuapp.com/word?length=5";

fetch(apiUrl)
  .then(response => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then(data => {
    console.log("JSON data:", data);
    wordToGuess = data[0].toUpperCase()
  })
  .catch(error => {
    console.error("Error fetching data:", error);
  });

initializeElements()
document.addEventListener("keyup", handleKey)