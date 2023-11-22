import { Player } from "./js/classes/Player.js";
import { Input } from "./js/classes/Input.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 1024; // 64 x 16
canvas.height = 576; // 64 x 9

const player = new Player();
const input = new Input();

function animate() {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  player.draw(ctx);
  player.update(canvas);

  player.velocity.x = 0;
  if (input.activatedKeys.w.pressed || input.activatedKeys[" "].pressed) {
    if (player.velocity.y === 0) player.velocity.y = -7;
  } else if (input.activatedKeys.a.pressed) player.velocity.x = -1;
  else if (input.activatedKeys.d.pressed) player.velocity.x = 1;

  window.requestAnimationFrame(animate);
}
animate();
