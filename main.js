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

function getNumberOfElements(heigthElement) {
   return document.documentElement.clientHeight / heigthElement + 1;
}
    
function startGame() {
    start.classList.add('hide');
    gameArea.innerHTML = '';
    for (let i = 0; i < getNumberOfElements(100); i++) {
        const line = document.createElement('div');
        line.classList.add('line');
        line.style.top = `${i * 100}px`;
        line.y = i * 100;
        gameArea.appendChild(line);
    }

    for (let i = 0; i < getNumberOfElements(100 * settings.traffic); i++) {
        const enemy = document.createElement('div');
        enemy.classList.add('enemy');
        enemy.y = -100 * settings.traffic * (i + 1);
        enemy.style.left = Math.floor((Math.random() * (gameArea.offsetWidth - 50))) + 'px';
        enemy.style.top = enemy.y + 'px';
        gameArea.appendChild(enemy);
    }
    settings.score = 0;
    settings.start = true;
    gameArea.appendChild(car);
    car.style.left = gameArea.offsetWidth / 2 - car.offsetWidth / 2
    car.style.top = 'auto';
    car.style.bottom = '10px';
    settings.x = car.offsetLeft;
    settings.y = car.offsetTop;
    requestAnimationFrame(playGame);
}

function playGame() {
    if (settings.start) {
        settings.score += settings.speed;
        score.textContent = 'Score: ' + settings.score;
        moveRoad();
        moveEnemy();
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

function moveEnemy() {
    let enemy = document.querySelectorAll('.enemy');
    enemy.forEach(item => {
        let carRect = car.getBoundingClientRect();
        let enemyRect = item.getBoundingClientRect();

        if (carRect.top <= enemyRect.bottom && 
            carRect.right >= enemyRect.left &&
            carRect.left <= enemyRect.right &&
            carRect.bottom >= enemyRect.top) {
            settings.start = false;
            start.classList.remove('hide');
            start.style.top = start.offsetHeight + 'px';
        }

        item.y += settings.speed / 2;
        item.style.top = item.y + 'px';
        if (item.y >= document.documentElement.clientHeight) {
            item.y = -100 * settings.traffic;
            item.style.left = Math.floor((Math.random() * (gameArea.offsetWidth - 50))) + 'px';
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

        
    