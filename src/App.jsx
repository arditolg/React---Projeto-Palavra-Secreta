import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import StartScreen from './components/StartScreen'
import { useCallback, useEffect, useState } from 'react'

import {wordsList} from './data/words'
import Game from './components/Game'
import GameOver from './components/GameOver'

const stages = [
  { id: 1, name: "start"},
  { id: 2, name: "game"},
  { id: 3, name: "end"},
];

function App() {
  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(wordsList);

  const [picketWord, setPicketWord] = useState('')
  const [picketCategory, setPicketCategory] = useState('')
  const [letters, setLetters] = useState([])

  const guessesQty = 3

  const [guessedLetters, setGuessedLetters] = useState([])
  const [wrongLetters, setWrongLetters] = useState([])
  const [guesses, setGuesses] = useState(guessesQty)
  const [score, setScore] = useState(50)
  

  const pickWordAndCategory = useCallback(() => {
    const categories = Object.keys(words)
    const category = 
      categories[Math.floor(Math.random() * Object.keys(categories).length)]

    console.log(category)

    const word = words[category][Math.floor(Math.random() * words[category].length)]

    console.log(word)

    return {word, category}
  }, [words])

  const startGame = useCallback(() => {
    clearLetterStates()

    const {word, category} = pickWordAndCategory()

    let wordLetters = word.split('')

    wordLetters = wordLetters.map((l) => l.toLowerCase())

    console.log(word, category)
    console.log(wordLetters)

    setPicketWord(word)
    setPicketCategory(category)
    setLetters(wordLetters)

    setGameStage(stages[1].name)
  }, [pickWordAndCategory])

  const verifyLetter = (letter) => {
    const normalizedLetter = letter.toLowerCase()

    if(guessedLetters.includes(normalizedLetter) || wrongLetters.includes(normalizedLetter)){
      return;
    }

    if(letters.includes(normalizedLetter)){
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
        normalizedLetter,
      ])
    } else {
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters,
        normalizedLetter,
      ])

      setGuesses((actualGuesses) => actualGuesses - 1)
    }
  }

  const clearLetterStates = () => {
    setGuessedLetters([])
    setWrongLetters([])
  }

  useEffect(() => {

    if(guesses <= 0){

      clearLetterStates()
      setGameStage(stages[2].name)
    }

  }, [guesses])

  useEffect(() => {

    const uniqueLetters = [...new Set(letters)]

    if(guessedLetters.length === uniqueLetters.length){
      setScore((actualScore) => actualScore += 100)
      startGame()
    }
  }, [guessedLetters, letters, startGame])

  const retry = () => {

    setScore(0)
    setGuesses(guessesQty)

    setGameStage(stages[0].name)
  }

  return (
    <div className='App'>
      {gameStage === "start" && <StartScreen startGame={startGame}></StartScreen>}
      {gameStage === "game" && <Game verifyLetter={verifyLetter} picketWord={picketWord} picketCategory={picketCategory} letters={letters} guessedLetters={guessedLetters} wrongLetters={wrongLetters} guesses={guesses} score={score}></Game>}
      {gameStage === "end" && <GameOver retry={retry} score={score}></GameOver>}
    </div>
  )
}

export default App
