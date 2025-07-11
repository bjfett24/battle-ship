function populateGame() {
    const oldContainer = document.querySelector('.container');
    oldContainer.remove();

    const container = document.createElement('div');
    container.classList.add('game', 'container');
    document.body.appendChild(container);

    const title = document.createElement('div');
    title.classList.add('title');
    title.textContent = 'Battle Ships';
    container.appendChild(title);

    
}