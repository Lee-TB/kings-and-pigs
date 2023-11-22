import { Player } from "./js/classes/Player.js";
import { Input } from "./js/classes/Input.js";
import { Sprite } from "./js/classes/Sprite.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 1024; // 64 x 16
canvas.height = 576; // 64 x 9

const player = new Player();
const input = new Input();
const backgroundLevel1 = new Sprite({ position: { x: 0, y: 0 }, imageElement: document.querySelector('#backgroundLevel2') });

function animate() {  
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  backgroundLevel1.draw(ctx)
  player.draw(ctx);
  player.update(canvas);

  if (input.activatedKeys.w.pressed || input.activatedKeys[" "].pressed) {
    if (player.velocity.y === 0) player.velocity.y = -7;
  }
  player.velocity.x = 0;
  if (input.activatedKeys.a.pressed) player.velocity.x = -2;
  if (input.activatedKeys.d.pressed) player.velocity.x = 2;

  window.requestAnimationFrame(animate);
}
animate();
