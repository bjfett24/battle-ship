import { shipSelection, disableShip, squarePlacement } from "./game-page.js";

const chooseDirDialog = function (driver, ship, length, coord) {
    const popUp = document.createElement('dialog');
    popUp.classList.add('popUp');
    document.body.appendChild(popUp);

    const dialogContainer = document.createElement('div');
    dialogContainer.classList.add('dialogContainer');
    popUp.appendChild(dialogContainer);

    const dirForm = document.createElement('form');
    dirForm.classList.add('dir-form');
    dirForm.action = '#';
    dirForm.method = 'dialog';
    dialogContainer.appendChild(dirForm);

    const dirLabel = document.createElement('label');
    dirLabel.classList.add('direction', 'label');
    dirLabel.textContent = 'What direction?';
    dirForm.appendChild(dirLabel);

    const radioOptCont = document.createElement('div');
    radioOptCont.classList.add('radio-opt-container');
    dirForm.appendChild(radioOptCont);
    
    const dirHoriz = document.createElement('div');
    dirHoriz.classList.add('radio-option');
    radioOptCont.appendChild(dirHoriz);
    
    const horizLabel = document.createElement('label');
    horizLabel.classList.add('horizontal', 'label');
    horizLabel.for = 'horiz';
    horizLabel.textContent = 'Horizontal';
    dirHoriz.appendChild(horizLabel);

    const horizInput = document.createElement('input');
    horizInput.type = 'radio';
    horizInput.id = 'horiz';
    horizInput.name = 'shipDirection';
    dirHoriz.appendChild(horizInput);
    
    const dirVert = document.createElement('div');
    dirVert.classList.add('radio-option');
    radioOptCont.appendChild(dirVert);
    
    const vertLabel = document.createElement('label');
    vertLabel.classList.add('vertical', 'label');
    vertLabel.for = 'vert';
    vertLabel.textContent = 'Vertical';
    dirVert.appendChild(vertLabel);

    const vertInput = document.createElement('input');
    vertInput.type = 'radio';
    vertInput.id = 'vert';
    vertInput.name = 'shipDirection'
    dirVert.appendChild(vertInput);

    const createButton = document.createElement('button');
    createButton.type = 'submit';
    createButton.classList.add('createButton')
    createButton.textContent = 'Submit';
    dirForm.appendChild(createButton);

    dirForm.addEventListener('submit', () => {
        handleSubmit(driver, ship, length, coord, horizInput, vertInput);
    })

    popUp.showModal();
}

function handleSubmit(driver, ship, length, coord, horizInput, vertInput) {
    
    if (horizInput.checked || vertInput.checked) {
        const direction = getDirection(horizInput, vertInput);
        checkCollision(driver, ship, length, coord, direction);
    } else {
        uncheckedError();
    }
}

function getDirection(horizInput, vertInput) {
    let direction;
    if (horizInput.checked) {
        direction = 'h';
    } else if (vertInput.checked) {
        direction = 'v';
    }   
    return direction;
}

function uncheckedError() {
    const messageBox = document.createElement('div');
    messageBox.classList.add('error');
    messageBox.style.cssText = `
        position: fixed; top: 20px; left: 50%; transform: translateX(-50%);
        background-color: #ffdddd; color: #d8000c; padding: 10px 20px;
        border: 1px solid #d8000c; border-radius: 5px; z-index: 1001;
        font-family: sans-serif;
    `;
    messageBox.textContent = 'Please set a direction for your ship.';
    document.body.appendChild(messageBox);
    setTimeout(() => {
        messageBox.remove();
    }, 3000); // Remove after 3 seconds
}

function checkCollision(driver, ship, length, coord, direction) {
    if (driver.realPlayerBoard.checkForClearing(coord, direction, length)) {
        shipSelection(ship, false) // Remove selection after a square is clicked
        const realSquares = document.querySelectorAll('.my-board .square');
        driver.startPlacingProcess();
        disableShip(ship);
        squarePlacement(realSquares, false);

        driver.setRealShip(driver, coord, length, direction, 'real');
        const popUp = document.querySelector('.popUp')
        popUp.close(); // Close the dialog
    } else {
        const collision = document.createElement('div');
        collision.classList.add('error');
        collision.style.cssText = `
            position: fixed; top: 20px; left: 50%; transform: translateX(-50%);
            background-color: #ffdddd; color: #d8000c; padding: 10px 20px;
            border: 1px solid #d8000c; border-radius: 5px; z-index: 1001;
            font-family: sans-serif;
        `;
        collision.textContent = 'This placement causes a collision. Try again.';
        document.body.appendChild(collision);
        setTimeout(() => {
            collision.remove();
        }, 3000); // Remove after 3 seconds
    }
}

export {chooseDirDialog}