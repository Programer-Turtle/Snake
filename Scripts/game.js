const Canvas = document.getElementById("Canvas");
const ctx = Canvas.getContext("2d");

let GameGrid = [[]];
const Snake = {
  x: 7,
  y: 7,
  length: 3,
  dir: 0,
  TailSpot: [],
};

const Apple = {
  x: -1,
  y: -1,
};

ctx.fillStyle = "blue";
ctx.fillRect(0, 0, 20, 20);

function Die() {
  console.log("Died");
  Snake.TailSpot = [];
  Draw();
  clearInterval(GameLoop);
}

function PutApple() {
  Apple.x = -1;
  Apple.y = -1;
  const RandomX = Math.floor(Math.random() * 29);
  const RandomY = Math.floor(Math.random() * 29);
  const TouchingSnake = Snake.TailSpot.some(
    ([tx, ty]) => tx === RandomX && ty === RandomY
  );
  if (TouchingSnake) {
    PutApple();
  } else {
    Apple.x = RandomX;
    Apple.y = RandomY;
  }
}

async function Draw() {
  ctx.clearRect(0, 0, Canvas.width, Canvas.height);
  ctx.fillStyle = "red";
  ctx.fillRect(Apple.x * 20, Apple.y * 20, 20, 20);
  for (let index = 0; index < Snake.TailSpot.length; index++) {
    let CurrentPart = Snake.TailSpot[index];
    ctx.fillStyle = "lime";
    ctx.fillRect(CurrentPart[0] * 20, CurrentPart[1] * 20, 20, 20);
  }
  requestAnimationFrame(Draw);
}

Draw();

let GameLoop = setInterval(() => {
  console.log(Snake.length);
  //Move Snake Head
  switch (Snake.dir) {
    case 0:
      Snake.y -= 1;
      break;
    case 1:
      Snake.x += 1;
      break;
    case 2:
      Snake.y += 1;
      break;
    case 3:
      Snake.x -= 1;
      break;
  }

  //Check If Died
  const hitSelf = Snake.TailSpot.some(
    ([tx, ty]) => tx === Snake.x && ty === Snake.y
  );

  if (hitSelf || Snake.x > 29 || Snake.x < 0 || Snake.y > 29 || Snake.y < 0) {
    Die();
  }

  if (Snake.TailSpot.length + 1 > Snake.length) {
    Snake.TailSpot.splice(0, 1);
  }
  Snake.TailSpot.push([Snake.x, Snake.y]);

  //Check If Touching Apple
  if (Snake.x == Apple.x && Snake.y == Apple.y) {
    Snake.length += 1;
    PutApple();
  }
}, 50);

document.addEventListener("keydown", (Key) => {
  switch (Key.code) {
    case "ArrowUp":
      if (Snake.dir != 2) {
        Snake.dir = 0;
      }
      break;
    case "ArrowRight":
      if (Snake.dir != 3) {
        Snake.dir = 1;
      }
      break;
    case "ArrowDown":
      if (Snake.dir != 0) {
        Snake.dir = 2;
      }
      break;
    case "ArrowLeft":
      if (Snake.dir != 1) {
        Snake.dir = 3;
      }
      break;
  }
});

PutApple();
