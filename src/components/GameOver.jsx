import React from 'react'
import './GameOver.css'

const GameOver = ({retry, score}) => {
  return (
    <div>
        <h1>Fim de Jogo</h1>
        <span>A sua pontuação foi: {score}</span>
        <button onClick={retry}>Resetar o Jogo</button>
    </div>
  )
}

export default GameOver