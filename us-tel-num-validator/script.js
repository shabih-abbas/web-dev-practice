const userInput= document.getElementById('user-input');
const checkBtn= document.getElementById('check-btn');
const clearBtn= document.getElementById('clear-btn');
const resultsDiv= document.getElementById('results-div');
const dialog= document.querySelector('dialog');
const isValid=(num)=> /^(1\s?)?(\(\d{3}\)|\d{3})[\s-]?\d{3}[\s-]?\d{4}$/.test(num);
const check=(input)=>{
  if(!input) {
    dialog.classList.add('show');
    setTimeout(()=>{
        dialog.classList.remove('show');
    },3000);
    return
  }
  const result=document.createElement('p');
  if(isValid(input)){
      result.className='valid';
      result.appendChild(document.createTextNode(`Valid US number: ${input}`))
      resultsDiv.appendChild(result)
    }
  else{
    result.className='invalid';
      result.appendChild(document.createTextNode(`Invalid US number: ${input}`))
      resultsDiv.appendChild(result)
  }
}
clearBtn.addEventListener('click',()=>{
  resultsDiv.innerHTML='';
})
checkBtn.addEventListener('click',()=>{
  check(userInput.value);  
})
userInput.addEventListener('keydown',(e)=>{
  if(e.key=='Enter') check(userInput.value);
  if(e.key==='Escape') resultsDiv.innerHTML='';
})