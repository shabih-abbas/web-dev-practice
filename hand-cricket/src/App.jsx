import Logo from '/logo.svg'
import './App.css'
import Game from './game.jsx'

export default function App() {
  return (
    <>
      <div className='header'>
        <img src={Logo} alt="logo" className='logo' />
        <h1 className='heading'>Hand Cricket</h1>
        <Game />
      </div>
    </>
  )
}
  