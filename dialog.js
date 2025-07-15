import { Driver } from "./driver.js";

const chooseDirDialog = function (driver, length, coord) {
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
    dirVert.appendChild(vertInput);


    const createButton = document.createElement('button');
    createButton.type = 'submit';
    createButton.classList.add('createButton')
    createButton.textContent = 'Submit';
    dirForm.appendChild(createButton);

    dirForm.addEventListener('submit', () => {
        let direction;
        if (horizInput.checked) {
            direction = 'h';
        } else {
            direction = 'v';
        }

        driver.setRealShip(coord, length, direction);
        
        
        
        popUp.close(); // Close the dialog

    })

    popUp.showModal();
}

export {chooseDirDialog}