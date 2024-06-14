const textInput=document.getElementById('text-input');
const container=document.getElementById('container');
const result=document.getElementById('result');
container.addEventListener('submit', (e)=>{
  e.preventDefault();
  let input=textInput.value.replace(/[\s\W_]/g,'').toLowerCase();
  if(!(input)) {
    result.style.display='none';
    alert('Please input a value')
    }
  else{
    result.style.display='block';
    result.textContent= (input===input.split('').reverse().join('')) ? `${textInput.value} is a palindrome` : `${textInput.value} is not a palindrome`;
  }
});
textInput.addEventListener('change', ()=>{
  if(textInput.value=='')
    result.style.display='none';
});
