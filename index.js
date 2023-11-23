import { Game } from "./js/classes/Game.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 1024; // 64 x 16
canvas.height = 576; // 64 x 9

const game = new Game({ canvas, ctx });

let lastTime = 0;
function animate(timeStamp = 0) {
  const deltaTime = timeStamp - lastTime;
  lastTime = timeStamp;
  
  game.render(deltaTime);

  window.requestAnimationFrame(animate);
}
animate();
