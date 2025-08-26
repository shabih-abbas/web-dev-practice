let creatures=[];
async function loadCreatures(){
  const res = await fetch("https://rpg-creature-api.freecodecamp.rocks/api/creatures")
  creatures= await res.json()
}
loadCreatures()
const creatureExists = (query) => creatures.some(creature => creature.id==query || creature.name.toLowerCase()==query.toLowerCase())
const showResult = (creature) =>{
  document.getElementById("result").style.display="block";
  document.getElementById("creature-name").textContent=creature.name;
  document.getElementById("creature-id").textContent=" #"+creature.id;
  document.getElementById("weight").textContent="Weight: "+creature.weight;
  document.getElementById("height").textContent="Height: "+creature.height;
  document.getElementById("sp-name").textContent=creature.special.name
  document.getElementById("sp-description").textContent=creature.special.description
  document.getElementById("hp").textContent=creature.stats[0].base_stat
  document.getElementById("attack").textContent=creature.stats[1].base_stat
  document.getElementById("defense").textContent=creature.stats[2].base_stat
  document.getElementById("special-attack").textContent=creature.stats[3].base_stat
  document.getElementById("special-defense").textContent=creature.stats[4].base_stat
  document.getElementById("speed").textContent=creature.stats[5].base_stat
  document.getElementById("types").innerHTML=creature.types.map(type => `<span class="type">${type.name}</span>`).join("")
}
const loadCreature= (query) => {
  try{
    fetch(`https://rpg-creature-api.freecodecamp.rocks/api/creature/${query}`)
    .then(res=> res.json())
    .then(data=> showResult(data))
  }
  catch(err){
    console.log(err)
  }
}
document.getElementById("search-button")
.addEventListener("click", (e)=>{
  e.preventDefault();
  const query= document.getElementById("search-input").value
  if(creatureExists(query))
    loadCreature(query)
  else
    { 
      document.getElementById("result").style.display="none";
      alert("Creature not found")
    }
})
document.getElementById("search-input")
  .addEventListener("change", (e)=>{
    if(e.target.value==="")
      document.getElementById("result").style.display="none";
  })




