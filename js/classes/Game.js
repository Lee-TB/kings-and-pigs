import "../utils/Array.js";
import { Player } from "./Player.js";
import { Input } from "./Input.js";
import { Sprite } from "./Sprite.js";
import { CollisionBlock } from "./CollisionBlock.js";
import { collisionsLevel1 } from "../data/collisions.js";

export class Game {
  constructor({ canvas, ctx }) {
    this.canvas = canvas;
    this.ctx = ctx;

    this.player = new Player();
    this.input = new Input();
    this.backgroundLevel1 = new Sprite({
      position: { x: 0, y: 0 },
      imageElement: document.querySelector("#backgroundLevel1"),
    });
    this.collisionBlocks = [];
    this.createCollisionBlockObjects();
  }

  render(deltaTime) {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.backgroundLevel1.draw(this.ctx);
    this.collisionBlocks.forEach((collisionBlock) => {
      collisionBlock.draw(this.ctx);
    });
    this.player.draw(this.ctx);
    this.player.update(this.canvas);

    if (
      this.input.activatedKeys.w.pressed ||
      this.input.activatedKeys[" "].pressed
    ) {
      if (this.player.velocity.y === 0) this.player.velocity.y = -7;
    }
    this.player.velocity.x = 0;
    if (this.input.activatedKeys.a.pressed) this.player.velocity.x = -2;
    if (this.input.activatedKeys.d.pressed) this.player.velocity.x = 2;
  }

  createCollisionBlockObjects() {
    const collisions2D = collisionsLevel1.chunk(16);
    collisions2D.forEach((row, yIndex) => {
      row.forEach((cell, xIndex) => {
        if (cell === 292) {
          this.collisionBlocks.push(
            new CollisionBlock({
              position: {
                x: xIndex * 64,
                y: yIndex * 64,
              },
            })
          );
        }
      });
    });
  }
}
