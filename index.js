const myCanvas = { width: 300, height: 300};
const backgroundColor = [0,255,0];
const lineColor = [255,0,0];
const activeLineColor = [204, 212, 53];
const lineWidth = 1;
const activelineWidth = 6;
const sounds = Array.from({ length: 6 });
const getRandomColor = () => `#${Math.floor(Math.random() * 2 * 24).toString(16).padStart(6,'0')}`

const ball1 = {
    x: 300,
    y: 300,
    size: 50,
    speed: 1,
    fillColor: [255,0,0],
    strokeColor: [204,212,53],
    ballStrokeWeight: 2,
    rightSound: sounds[0],
    leftSound: sounds[1],
    soundLength: 2000,
} 

const ball2 = {
    x: 300,
    y: 100,
    size: 10,
    speed: 2,
    fillColor: [255,0,0],
    strokeColor: [204,212,53],
    ballStrokeWeight: 2,
    rightSound: sounds[2],
    leftSound: sounds[3],
    soundLength: 1000,
} 

const ball3 = {
    x: 300,
    y: 200,
    size: 30,
    speed: 2,
    fillColor: [255,0,0],
    strokeColor: [204,212,53],
    ballStrokeWeight: 2,
    rightSound: sounds[4],
    leftSound: sounds[5],
    soundLength: 500,
} 

const leftEdge = {
    x1: 60,
    y1: 0,
    x2: 60,
    y2: 600,
    color: lineColor,
    width: lineWidth,

}

const rightEdge = {
    x1: 200,
    y1: 0,
    x2: 200,
    y2: 600,
    color: lineColor,
    width: lineWidth,
}


const balls = [ball1, ball2, ball3];



function preload(){

    sounds.forEach((sound, i) => {
        sounds[i] = loadSound(`sounds/${i}.mp3`)
    })

    console.log(sounds);

    ball1.rightSound = sounds[0];
    ball1.leftSound = sounds[1];
    ball2.rightSound = sounds[2];
    ball2.leftSound = sounds[3];
    ball3.rightSound = sounds[4];
    ball3.leftSound = sounds[5];

    // for(let i = 0; i < sounds.length; i++){
    //     sounds[i] = loadSound(`sounds/${i}.mp3`)
    // }
}

function setup(){
    createCanvas(myCanvas.width, myCanvas.height);
    background(backgroundColor);
}



function draw(){
    
    background(backgroundColor);

    balls.forEach((ball) => {
        updateBall(ball);
        displayBall(ball);
    })
    drawLine(leftEdge);
    drawLine(rightEdge);
}


function updateBall(ball){
    console.log(ball.x);
    if(ball.x + ball.size/2 > rightEdge.x1 ){
        ball.speed *= -1;
        ball.rightSound.play();
        activateLine(rightEdge);
    } else if(ball.x - ball.size/2 < leftEdge.x1 ){
        ball.speed *= -1;
        ball.leftSound.play();
        activateLine(leftEdge);
    }
    ball.x+= ball.speed;
}


const displayBall = ({x, y, size, strokeColor, fillColor, ballStrokeWeight}) => {
        stroke(strokeColor);
        fill(fillColor);
        strokeWeight(ballStrokeWeight);
        ellipse(x, y, size);
}

function drawLine({x1, y1, x2, y2, color, width}){
    stroke(color);
    strokeWeight(width);
    line(x1, y1, x2, y2);
}



function activateLine(line){

    line.color = activeLineColor;
    line.width = activelineWidth;
    setTimeout(() => resetLines(line), 500);

}


function resetLines(line){
    line.color = lineColor;
    line.width = lineWidth;
}

function mousePressed(){
    getRandomColor();
    blendMode (Lightest)
}

class ball {
    constructor(x,y,color){
        this.x=x
        this.y=y
        this.color=color
    }
    move(val){
        this.x += val.x
        this.y += val.y
    }
}

