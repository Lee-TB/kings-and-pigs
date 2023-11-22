import { Player } from "./js/classes/Player.js";
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 1024; // 64 x 16
canvas.height = 576; // 64 x 9

const player = new Player();
function animate() {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  player.draw(ctx);
  player.update(canvas);

  window.requestAnimationFrame(animate);
}
animate();
