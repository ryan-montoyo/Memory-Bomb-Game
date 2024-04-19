const tiles_container = document.querySelector(".tiles");
const colors = ['red', 'orange', 'yellow', 'green', 'dodgerblue', 'purple', 'white', 'teal'];
const color_picklist = [...colors, ...colors];
const tile_count = color_picklist.length;

//Game State

let revealed_count = 0;
let active_tile = null;
let awaiting_end_of_move = false;

function buildTile(color){
    const element = document.createElement('div');

    element.classList.add('tile');
    element.setAttribute('data-color', color);
    element.setAttribute('data-revealed', 'false');



    element.addEventListener('click', () => {
        const revealed = element.getAttribute('data-revealed');

        if(awaiting_end_of_move || revealed === 'true' || element === active_tile){
            return;
        }

        element.style.backgroundColor = color;

        if(!active_tile){
            active_tile = element;

            return;
        }

        const color_to_match = active_tile.getAttribute('data-color');

        if(color_to_match === color){
            active_tile.setAttribute('data-revealed', 'true');
            element.setAttribute('data-revealed', 'true');


            active_tile = null;
            awaiting_end_of_move = false;
            revealed_count += 2;

            if(revealed_count === tile_count){
                alert('You win! Refresh to play again.');
            }
            return;
        }

        awaiting_end_of_move = true;
        setTimeout(() => {
            element.style.backgroundColor = null;
            active_tile.style.backgroundColor = null;

            awaiting_end_of_move = false;
            active_tile = null;
        },500);


    });
    return element;
}

// SPAWN TILES ON SCREEN
for(let i = 0; i < tile_count; i++) {
    const random_index = Math.floor(Math.random() * color_picklist.length);
    const color = color_picklist[random_index];
    const tile = buildTile(color);

    color_picklist.splice(random_index, 1);

    tiles_container.appendChild(tile);
}

