const input=document.getElementById('number');
const converter=document.querySelector('form');
const output=document.getElementById('output');
const conversionTable={
  4000:'',
  1000: 'M',
  900: 'CM',
  500: 'D',
  400: 'CD',
  100: 'C',
  90: 'XC',
  50: 'L',
  40: 'XL',
  10: 'X',
  9: 'IX',
  5: 'V',
  4: 'IV',
  1: 'I'
};
const arabicToRoman=(n)=>{
  if (n==0) return ''
  let numberKey= Object.keys(conversionTable)
                  .reverse()
                  .find((key)=>n>=key)
  if(numberKey==4000){
    return `<span id='thousand'>${arabicToRoman(Math.trunc(n/1000))}</span>${arabicToRoman(n-(Math.trunc(n/1000)*1000))}`
  }
  return conversionTable[numberKey]+arabicToRoman(n-numberKey)
}
converter.addEventListener('submit',(e)=>{
  e.preventDefault();
  output.classList.remove('alert');
  output.classList.remove('result');
  const number=parseInt(input.value.trim(), 10);
  if(!input.value||isNaN(number)) {
    output.classList.add('alert');
    output.textContent='Please enter a valid number'
    input.value='';
  }
  else if(number<=0){
    output.classList.add('alert');
    output.textContent='Please enter a number greater than or equal to 1'
    input.value='';
  }
  else if(number>10e4){
    output.classList.add('alert');
    output.textContent="That's too much for me"
    input.value='';
  }
  else{
    output.classList.add('result');
    output.innerHTML=arabicToRoman(number);
    input.value='';
  }
})


