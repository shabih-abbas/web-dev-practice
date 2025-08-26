import { useState } from "react";
import './game.css'
const hands=[{emoji:'☝️', score: 1},{emoji:'✌️', score:2},{emoji:'🤟', score:3},{emoji:'🖖',score:4},{emoji:'🖐️', score:5},{emoji:'👍', score:6},{emoji:'👊', score:10}];

export default function Game(){
    const [score, setScore] = useState(0);
    const [move, setMove] = useState(null);
    const [compMove, setCompMove] = useState(null);
    let status = (move && move == compMove)? "played": "playing";
    const reset=()=>{
        setScore(0);
        setMove(null);
        setCompMove(null);
    }
    const handleClick=(e)=>{
        const newMove= e.target.value;
        const newCompMove= getMove()
        setCompMove(newCompMove);
        setMove(newMove);
        newMove != newCompMove && setScore(prev=> prev+hands[newMove].score);
    }
    const getMove=()=> Math.floor(Math.random()*7)
    
    return (
        <div className="main-game">
            <div className='field'>
                <div className="pitch">
                    {move!=null? hands[move].emoji: 'pick your hand'}
                </div>
                <div className="crease"></div>
                <div className="pitch">
                    {compMove!=null? hands[compMove].emoji: 'let me guess'}
                </div>
            </div>
            <div className="score">Your score: <span>{score}</span></div>
            {status=='played'&& <button onClick={reset} className="reset-btn">Play Again</button>}
            <div className="btn-container">{hands.map((hand, index)=> <button className="move-btn" key={hand.score} value={index} onClick={handleClick} disabled={status=='played'}>{hand.emoji}</button>)}</div>
        </div>
    )
}