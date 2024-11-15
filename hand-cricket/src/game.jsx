import { useState, useEffect } from "react";
import './game.css'
const hands=[{emoji:'☝️', score: 1},{emoji:'✌️', score:2},{emoji:'🤟', score:3},{emoji:'🖖',score:4},{emoji:'🖐️', score:5},{emoji:'👍', score:6},{emoji:'👊', score:10}];

export default function Game(){
    const [status, setStatus] = useState('playing');
    const [score, setScore] = useState(0);
    const [move, setMove] = useState(null);
    const [compMove, setCompMove] = useState(null);
    useEffect(()=>{
        if(move!=null&&compMove!=null){
            if(move==compMove){
                setStatus('played')
            }
            else{
                setScore((prev)=>prev+hands[move].score)
            }
        }
        
    },[move,compMove])
    const reset=()=>{
        setScore(0);
        setCompMove(null);
        setMove(null);
        setStatus('playing');
    }
    const handleClick=(e)=>{
        setMove(parseInt(e.target.value));
        setCompMove(getMove());
    }
    const getMove=()=> Math.floor(Math.random()*6)
    
    return (
        <div>
            <div className='field'>
                <div className="pitch">
                    {move!=null? hands[move].emoji: 'pick a move'}
                </div>
                <div className="crease"></div>
                <div className="pitch">
                    {compMove!=null? hands[compMove].emoji: 'I will respond'}
                </div>
            </div>
            <div className="score">Your score: <span>{score}</span></div>
            {status=='played'&& <button onClick={reset} className="reset-btn">Play Again</button>}
            <div>{hands.map((hand, index)=> <button key={hand.score} value={index} onClick={handleClick} disabled={status=='played'}>{hand.emoji}</button>)}</div>
        </div>
    )
}