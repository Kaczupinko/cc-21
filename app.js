const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
// comit
const basketWidth = 80;
const basketHeight = 20;
let basketX = (canvas.width - basketWidth) / 2;

const eggWidth = 20;
const eggHeight = 30;
let eggs = [];

document.addEventListener("mousemove", mouseMoveHandler, false);

function mouseMoveHandler(e) {
    let relativeX = e.clientX - canvas.offsetLeft;
    if (relativeX > 0 && relativeX < canvas.width) {
        basketX = relativeX - basketWidth / 2;
    }
}

function createEgg() {
    eggs.push({
        x: Math.random() * (canvas.width - eggWidth),
        y: 0,
        speed: 1 + Math.random() * 3,
    });
}

function drawBasket() {
    ctx.beginPath();
    ctx.rect(basketX, canvas.height - basketHeight, basketWidth, basketHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function drawEggs() {
    for (let i = 0; i < eggs.length; i++) {
        let egg = eggs[i];
        ctx.beginPath();
        ctx.rect(egg.x, egg.y, eggWidth, eggHeight);
        ctx.fillStyle = "#FFA500";
        ctx.fill();
        ctx.closePath();
        egg.y += egg.speed;
    }
}

function detectCollision() {
    for (let i = 0; i < eggs.length; i++) {
        let egg = eggs[i];
        if (egg.y + eggHeight >= canvas.height - basketHeight &&
            egg.x + eggWidth > basketX &&
            egg.x < basketX + basketWidth) {
            eggs.splice(i, 1);
        }
    }
}

function removeOffscreenEggs() {
    for (let i = 0; i < eggs.length; i++) {
        if (eggs[i].y > canvas.height) {
            eggs.splice(i, 1);
        }
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBasket();
    drawEggs();
    detectCollision();
    removeOffscreenEggs();
}

setInterval(draw, 10);
setInterval(createEgg, 2000);
