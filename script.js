const ALLOWED_GUESSES = 5
const WORD_LENGTH = 5
let userWon = false
let userGuesses = 0
let userCurrentWord = ""
let wordToGuess = "EARTH" //make sure the word is capitalized
let wordLetterFreqDict = {}
let weatherData = null
let weatherImage = null
let hintsData = null

let weatherCodes = {
	"0":{
		"day":{
			"description":"Sunny",
			"image":"http://openweathermap.org/img/wn/01d@2x.png"
		},
		"night":{
			"description":"Clear",
			"image":"http://openweathermap.org/img/wn/01n@2x.png"
		}
	},
	"1":{
		"day":{
			"description":"Mainly Sunny",
			"image":"http://openweathermap.org/img/wn/01d@2x.png"
		},
		"night":{
			"description":"Mainly Clear",
			"image":"http://openweathermap.org/img/wn/01n@2x.png"
		}
	},
	"2":{
		"day":{
			"description":"Partly Cloudy",
			"image":"http://openweathermap.org/img/wn/02d@2x.png"
		},
		"night":{
			"description":"Partly Cloudy",
			"image":"http://openweathermap.org/img/wn/02n@2x.png"
		}
	},
	"3":{
		"day":{
			"description":"Cloudy",
			"image":"http://openweathermap.org/img/wn/03d@2x.png"
		},
		"night":{
			"description":"Cloudy",
			"image":"http://openweathermap.org/img/wn/03n@2x.png"
		}
	},
	"45":{
		"day":{
			"description":"Foggy",
			"image":"http://openweathermap.org/img/wn/50d@2x.png"
		},
		"night":{
			"description":"Foggy",
			"image":"http://openweathermap.org/img/wn/50n@2x.png"
		}
	},
	"48":{
		"day":{
			"description":"Rime Fog",
			"image":"http://openweathermap.org/img/wn/50d@2x.png"
		},
		"night":{
			"description":"Rime Fog",
			"image":"http://openweathermap.org/img/wn/50n@2x.png"
		}
	},
	"51":{
		"day":{
			"description":"Light Drizzle",
			"image":"http://openweathermap.org/img/wn/09d@2x.png"
		},
		"night":{
			"description":"Light Drizzle",
			"image":"http://openweathermap.org/img/wn/09n@2x.png"
		}
	},
	"53":{
		"day":{
			"description":"Drizzle",
			"image":"http://openweathermap.org/img/wn/09d@2x.png"
		},
		"night":{
			"description":"Drizzle",
			"image":"http://openweathermap.org/img/wn/09n@2x.png"
		}
	},
	"55":{
		"day":{
			"description":"Heavy Drizzle",
			"image":"http://openweathermap.org/img/wn/09d@2x.png"
		},
		"night":{
			"description":"Heavy Drizzle",
			"image":"http://openweathermap.org/img/wn/09n@2x.png"
		}
	},
	"56":{
		"day":{
			"description":"Light Freezing Drizzle",
			"image":"http://openweathermap.org/img/wn/09d@2x.png"
		},
		"night":{
			"description":"Light Freezing Drizzle",
			"image":"http://openweathermap.org/img/wn/09n@2x.png"
		}
	},
	"57":{
		"day":{
			"description":"Freezing Drizzle",
			"image":"http://openweathermap.org/img/wn/09d@2x.png"
		},
		"night":{
			"description":"Freezing Drizzle",
			"image":"http://openweathermap.org/img/wn/09n@2x.png"
		}
	},
	"61":{
		"day":{
			"description":"Light Rain",
			"image":"http://openweathermap.org/img/wn/10d@2x.png"
		},
		"night":{
			"description":"Light Rain",
			"image":"http://openweathermap.org/img/wn/10n@2x.png"
		}
	},
	"63":{
		"day":{
			"description":"Rain",
			"image":"http://openweathermap.org/img/wn/10d@2x.png"
		},
		"night":{
			"description":"Rain",
			"image":"http://openweathermap.org/img/wn/10n@2x.png"
		}
	},
	"65":{
		"day":{
			"description":"Heavy Rain",
			"image":"http://openweathermap.org/img/wn/10d@2x.png"
		},
		"night":{
			"description":"Heavy Rain",
			"image":"http://openweathermap.org/img/wn/10n@2x.png"
		}
	},
	"66":{
		"day":{
			"description":"Light Freezing Rain",
			"image":"http://openweathermap.org/img/wn/10d@2x.png"
		},
		"night":{
			"description":"Light Freezing Rain",
			"image":"http://openweathermap.org/img/wn/10n@2x.png"
		}
	},
	"67":{
		"day":{
			"description":"Freezing Rain",
			"image":"http://openweathermap.org/img/wn/10d@2x.png"
		},
		"night":{
			"description":"Freezing Rain",
			"image":"http://openweathermap.org/img/wn/10n@2x.png"
		}
	},
	"71":{
		"day":{
			"description":"Light Snow",
			"image":"http://openweathermap.org/img/wn/13d@2x.png"
		},
		"night":{
			"description":"Light Snow",
			"image":"http://openweathermap.org/img/wn/13n@2x.png"
		}
	},
	"73":{
		"day":{
			"description":"Snow",
			"image":"http://openweathermap.org/img/wn/13d@2x.png"
		},
		"night":{
			"description":"Snow",
			"image":"http://openweathermap.org/img/wn/13n@2x.png"
		}
	},
	"75":{
		"day":{
			"description":"Heavy Snow",
			"image":"http://openweathermap.org/img/wn/13d@2x.png"
		},
		"night":{
			"description":"Heavy Snow",
			"image":"http://openweathermap.org/img/wn/13n@2x.png"
		}
	},
	"77":{
		"day":{
			"description":"Snow Grains",
			"image":"http://openweathermap.org/img/wn/13d@2x.png"
		},
		"night":{
			"description":"Snow Grains",
			"image":"http://openweathermap.org/img/wn/13n@2x.png"
		}
	},
	"80":{
		"day":{
			"description":"Light Showers",
			"image":"http://openweathermap.org/img/wn/09d@2x.png"
		},
		"night":{
			"description":"Light Showers",
			"image":"http://openweathermap.org/img/wn/09n@2x.png"
		}
	},
	"81":{
		"day":{
			"description":"Showers",
			"image":"http://openweathermap.org/img/wn/09d@2x.png"
		},
		"night":{
			"description":"Showers",
			"image":"http://openweathermap.org/img/wn/09n@2x.png"
		}
	},
	"82":{
		"day":{
			"description":"Heavy Showers",
			"image":"http://openweathermap.org/img/wn/09d@2x.png"
		},
		"night":{
			"description":"Heavy Showers",
			"image":"http://openweathermap.org/img/wn/09n@2x.png"
		}
	},
	"85":{
		"day":{
			"description":"Light Snow Showers",
			"image":"http://openweathermap.org/img/wn/13d@2x.png"
		},
		"night":{
			"description":"Light Snow Showers",
			"image":"http://openweathermap.org/img/wn/13n@2x.png"
		}
	},
	"86":{
		"day":{
			"description":"Snow Showers",
			"image":"http://openweathermap.org/img/wn/13d@2x.png"
		},
		"night":{
			"description":"Snow Showers",
			"image":"http://openweathermap.org/img/wn/13n@2x.png"
		}
	},
	"95":{
		"day":{
			"description":"Thunderstorm",
			"image":"http://openweathermap.org/img/wn/11d@2x.png"
		},
		"night":{
			"description":"Thunderstorm",
			"image":"http://openweathermap.org/img/wn/11n@2x.png"
		}
	},
	"96":{
		"day":{
			"description":"Light Thunderstorms With Hail",
			"image":"http://openweathermap.org/img/wn/11d@2x.png"
		},
		"night":{
			"description":"Light Thunderstorms With Hail",
			"image":"http://openweathermap.org/img/wn/11n@2x.png"
		}
	},
	"99":{
		"day":{
			"description":"Thunderstorm With Hail",
			"image":"http://openweathermap.org/img/wn/11d@2x.png"
		},
		"night":{
			"description":"Thunderstorm With Hail",
			"image":"http://openweathermap.org/img/wn/11n@2x.png"
		}
	}
}

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

    const nth = (d) => {
        if (d > 3 && d < 21) return 'th';
        switch (d % 10) {
          case 1:  return "st";
          case 2:  return "nd";
          case 3:  return "rd";
          default: return "th";
        }
      };

    let hint = hintsData[0]["word"]
    document.getElementById("wurdle-hint").innerHTML = `Hint: ${hint}`;
    let currentDate = new Date(weatherData["daily"]["time"][0]);
    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][currentDate.getMonth()];
    const date = currentDate.getDate();
    let bulletinText = `ISSUE #10 - ISLAMABAD, PK - ${date}<sup>${nth(date)}</sup> of ${month}, ${currentDate.getFullYear()} - Temperature: ${weatherData["daily"]["temperature_2m_max"][0]}°C - ${weatherCodes[weatherData["daily"]["weather_code"][0]]["day"]["description"]} expected`
    document.getElementById("bulletin").innerHTML = bulletinText;

    weatherTextToDisplay = "Weather forecast for " + new Date(weatherData["daily"]["time"][1]).toDateString() + ": ";
    weatherTextToDisplay += weatherCodes[weatherData["daily"]["weather_code"][1]]["day"]["description"] + " expected\n";
    weatherTextToDisplay += "Temperature: " + weatherData["daily"]["temperature_2m_max"][1] + "°C"
    weatherForecastText = document.getElementById("weather-forecast-text")
    weatherForecastText.textContent = weatherTextToDisplay;

    weatherImage = weatherCodes[weatherData["daily"]["weather_code"][1]]["day"]["image"]
    const iconElement = document.getElementById("weather-icon");
    const iconUrl = weatherImage;
    iconElement.src = iconUrl;

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
        text.style.transition = "all 0.25s linear";
        document.getElementById("word").appendChild(text);
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
            document.getElementById("word").appendChild(text);
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
const weatherApiUrl = "https://api.open-meteo.com/v1/forecast?latitude=33.72&longitude=73.07&daily=weather_code,temperature_2m_max&timezone=auto&forecast_days=3"

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
    fetch(weatherApiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then(data => {
      console.log("JSON data:", data);
      weatherData = data;
      const hintsAPI = `https://api.datamuse.com/words?ml=${wordToGuess}`
      fetch(hintsAPI)
        .then(response => {
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.json();
        })
        .then(data => {
        console.log("JSON data:", data);
        console.log("word to guess: ", wordToGuess)
        hintsData = data;
        initializeElements(); // Call initializeElements() after weather data is fetched
        })
        .catch(error => {
        console.error("Error fetching data:", error);
        });
    })
    .catch(error => {
      console.error("Error fetching data:", error);
    });
  })
  .catch(error => {
    console.error("Error fetching data:", error);
  });

document.addEventListener("keyup", handleKey)