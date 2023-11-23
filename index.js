import { Game } from "./js/classes/Game.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 1024; // 64 x 16
canvas.height = 576; // 64 x 9

const game = new Game({ canvas, ctx });

function animate() {
  game.render();
  window.requestAnimationFrame(animate);
}
animate();
