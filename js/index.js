//Content parameters
let limit = 50;
let page = 1

document.addEventListener("DOMContentLoaded", () =>{ //Load DOM Content
    let back = document.querySelector('#back');
    let forward = document.querySelector('#forward');
   
    back.addEventListener('click', moveBack);
    forward.addEventListener('click', moveForward);

    let monsterEntrySection = document.querySelector('#create-monster');
   
    let newMonsterForm = document.createElement('form'); //Create form for new monster entries
    newMonsterForm.id = 'monster-entry';
    
    newMonsterForm.innerHTML = `
        <input id = 'name' type = 'text' placeholder = 'Name'>
        <input id = 'age' type = 'number' placeholder = 'Age'>
        <input id = 'description' type = 'text' placeholder = ' Description'>
        <input id = 'submit' type = 'submit' value = 'Create a Monster'>
    `;

    monsterEntrySection.appendChild(newMonsterForm);
    // console.log(monsterEntrySection)

    newMonsterForm.addEventListener('submit', createMonster);

    fetchMonsters();
});

function fetchMonsters(){ //Fetch Monster from API
    fetch(`http://localhost:3000/monsters/?_limit=${limit}&_page=${page}`)
        .then(res => res.json())
        .then((data) => {
            console.log(limit);
            console.log(page);
            console.log(data);
            let monsterContainer = document.querySelector('#monster-container');
            monsterContainer.innerHTML = '';
            data.forEach((result) => buildCard(result))
        })
};

function buildCard(monster){ //Build monster cards
    let monsterContainer = document.querySelector('#monster-container');
    let monsterCard = document.createElement('div');
    monsterCard.className = 'monster-card';
    monsterCard.innerHTML = `
        <h2>${monster.name}</h2>
        <p><em>Age:</em> ${monster.age}</p>
        <p><em>Description:</em> ${monster.description}</p>
        `
    monsterContainer.appendChild(monsterCard);
}

//Navigation Buttons

function moveBack(){ 
    if (page > 1){
        page --;
    }
    fetchMonsters();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function moveForward(){
    page++;
    fetchMonsters();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

//Function to handle new monster entry
function createMonster(e){
    e.preventDefault();
    let monsterObj = {
        name: e.target.name.value,
        age: e.target.age.value,
        description: e.target.description.value
    }
    buildCard(monsterObj);
    submitMonster(monsterObj)
}

//Submit new monster to the API
function submitMonster(monsterObj) {
    fetch('http://localhost:3000/monsters', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json" 
        },
        
        body: JSON.stringify(monsterObj)
        })
        .then(res => res.json())
        .then(monster => console.log(monster))
    }