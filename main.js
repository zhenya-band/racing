const score = document.querySelector('.score'),
    start = document.querySelector('.start'),
    gameArea = document.querySelector('.game-area');

const car = document.createElement('div');
car.classList.add('car');

start.addEventListener('click', startGame);
document.addEventListener('keydown', startRun);
document.addEventListener('keyup', stopRun);

const keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowRight: false,
    ArrowLeft: false
};

const settings = {
    start: false,
    score: 0,
    speed: 3,
    traffic: 3
};

function getNumberOfLines(heigthElement) {
   return document.documentElement.clientHeight / heigthElement + 1;
}
    
function startGame() {
    start.classList.add('hide');

    for (let i = 0; i < 20; i++) {
        const line = document.createElement('div');
        line.classList.add('line');
        line.style.top = `${i * 100}px`;
        line.y = i * 100;
        gameArea.appendChild(line);
    }

    settings.start = true;
    gameArea.appendChild(car);
    settings.x = car.offsetLeft;
    settings.y = car.offsetTop;
    requestAnimationFrame(playGame);
}

function playGame() {
    if (settings.start) {
        moveRoad();
        if (keys.ArrowLeft && settings.x > 0) {
            settings.x -= settings.speed;
        }
        if (keys.ArrowRight && settings.x < (gameArea.offsetWidth - car.offsetWidth)) {
            settings.x += settings.speed;
        }

        if (keys.ArrowUp && settings.y > 0) {
            settings.y -= settings.speed;
        }

        if (keys.ArrowDown && settings.y) {
            settings.y += settings.speed;
        }

        car.style.left = settings.x + 'px';
        car.style.top = settings.y + 'px';
        requestAnimationFrame(playGame);
    }
}

function moveRoad() {
    let lines = document.querySelectorAll('.line');
    lines.forEach(item => {
        item.y += settings.speed;
        item.style.top = item.y + 'px';
        if (item.y >= document.documentElement.clientHeight) {
            item.y = -100;
        }

    });
}

function startRun(e) {
    e.preventDefault();
    keys[e.key] = true;
}

function stopRun(e) {
    e.preventDefault();
    keys[e.key] = false;
}

        
    