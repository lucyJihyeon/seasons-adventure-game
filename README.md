# Weather Based Adventure Game

# Team Members
Lucy Kwon
Harika Patha
Jordan Ferrario

# Team Name
TEAM SEVEN

# Project Description

Welcome to our Weather Based Adventure Game! This project combines real-time weather data with a text-based adventure game, offering a unique and immersive gaming experience. Players can choose a city from a provided list, and the game will dynamically generate nodes based on the real-time weather data obtained from OpenWeather. As you progress through the game, your choices will shape the storyline, making each adventure a distinct experience.

## User Story

```
AS A player, I WANT to:
Play an adventure game with real-time weather data:
     Select a city.
     View a weather widget displaying the current weather data for the chosen city.
Restart the game if I fail:
     Have the option to restart the game and try again.
See a weather widget and Google Maps pin:
     Be immersed in the game by seeing a weather widget and a Google Maps pin for the chosen city.
```

## Acceptance Criteria

```
GIVEN I am taking a Adventure game
WHEN I input name and select the city 
THEN Locations Map and weather widget in the area is displayed
WHEN I click on start the game 
THEN I am presented with another question related to the game
WHEN I answer a question incorrectly
THEN The score is decreased and game is over when score reaches 0
WHEN all questions are answered correctly
THEN the game is over and takes to the score page
WHEN I click Start the game again
THEN take me to re-start the game 
WHEN I click on score
THEN Displays the score for each person with city and weather

```

## APIs Used
OpenWeather API
Google Maps API
TomTom

## CSS Framework
NES.css