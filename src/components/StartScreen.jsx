import React from 'react'
import './StartScreen.css'

const StartScreen = ({startGame}) => {
  return (
    <div className='start'>
        <h1>Qual é a Palavra</h1>
        <p>Clique no Botão para iniciar</p>
        <button onClick={startGame}>Começar o Jogo</button>
    </div>
  )
}

export default StartScreen