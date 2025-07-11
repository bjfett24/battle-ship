import { populateGame } from './game-page.js';

function populateStart() {
    
    const container = document.createElement('div');
    container.classList.add('start', 'container');
    document.body.appendChild(container);

    const startGroup = document.createElement('div');
    startGroup.classList.add('group');
    container.appendChild(startGroup);

    const title = document.createElement('div');
    title.textContent = 'Battle Ships';
    title.classList.add('title');
    startGroup.appendChild(title);

    const startButton = document.createElement('button');
    startButton.classList.add('button');
    startButton.textContent = "New Game";
    startButton.addEventListener('click', populateGame)
    startGroup.appendChild(startButton);

}

export { populateStart };