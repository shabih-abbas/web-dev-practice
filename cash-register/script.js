let cid = [
  ['PENNY', 0],
  ['NICKEL', 0],
  ['DIME', 0],
  ['QUARTER', 0],
  ['ONE', 0],
  ['FIVE', 0],
  ['TEN', 0],
  ['TWENTY', 0],
  ['HUNDRED', 0]
];
const cash= document.getElementById('cash');
const priceInp=document.getElementById('price');
const drawerInps=document.querySelectorAll('#cash-in-drawer input');
const changeDue=document.getElementById('change-due');
const okBtn=document.getElementById('purchase-btn');
const clearBtn=document.getElementById('clear-btn');
const statusSpan=document.getElementById('status');
const units=[0.01,0.05,0.1,0.25,1,5,10,20,100];

const updateUI=(due=[])=>{
  if(due[0]===false)
    changeDue.textContent=`INSUFFICIENT FUNDS $${due[1]} short`
  if(due[0]){
    changeDue.innerHTML=due.reduce((str,arr)=>str+` ${arr[0]}: $${arr[1]}<br>`,'');
    [...drawerInps].forEach((inp,i)=>inp.value=cid[i][1]);
  }
  statusSpan.textContent= [...drawerInps].some((inp)=>parseFloat(inp.value))?'OPEN':'CLOSED';
}

const sumOrSubFloats=(num1,num2,flag=1)=> flag? (num1*100+num2*100).toFixed()/100 : (num1*100-num2*100).toFixed()/100;
  
const calculateChange= (cash, price)=>{
  let change=sumOrSubFloats(cash,price,0);
  let changeArr=[];
  let i=units.length-1;
  while(change&&i>=0){
    if(change >= units[i]&&cid[i][1]){
      changeArr.length&&changeArr[changeArr.length-1][0]===cid[i][0]? changeArr[changeArr.length-1][1]=sumOrSubFloats(changeArr[changeArr.length-1][1],units[i]) : changeArr.push([cid[i][0],units[i]]);
      cid[i][1]=sumOrSubFloats(cid[i][1],units[i],0);
      change=sumOrSubFloats(change,units[i],0);
    }
    else i--;
  }
  return change? [false,change] : changeArr;
}


okBtn.addEventListener('click', ()=>{
  const cashInput=parseFloat(cash.value);
  const price=parseFloat(priceInp.value);
  let error=false;
  [...drawerInps].forEach((inp,i)=>{
    const value=parseFloat(inp.value)||0;
    if(!((value*100)%(units[i]*100))) cid[i][1]=value
    else {
      changeDue.textContent=`Please Enter ${cid[i][0]} in the multiples of ${units[i]}`;
      error=true;
    }
  })
  if(error) return;
  if(!cashInput||!price||cashInput<price) {
    changeDue.textContent='Please Enter the Bill and Cash amounts correctly!';
    return;
  }
  else if(cashInput==price){
    changeDue.textContent='No change due - customer paid with exact cash';
    return;
  }
  else {
    updateUI(calculateChange(cashInput,price));
    return;
  }
})
clearBtn.addEventListener('click',()=>{
  [...drawerInps].forEach(inp=>inp.value=0);
  cash.value='';
  priceInp.value='';
  changeDue.textContent='';
  statusSpan.textContent='';
})

