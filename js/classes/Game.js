import "../utils/Array.js";
import { Player } from "./Player.js";
import { Input } from "./Input.js";
import { Sprite } from "./Sprite.js";
import { CollisionBlock } from "./CollisionBlock.js";
import { collisionsLevel3 } from "../data/collisions.js";

export class Game {
  constructor({ canvas, ctx }) {
    this.canvas = canvas;
    this.ctx = ctx;

    this.collisionBlocks = [];
    this.createCollisionBlockObjects();
    console.log(this.collisionBlocks);

    this.player = new Player({
      position: {
        x: 64 * 3,
        y: 64 * 3,
      },
      canvas,
      ctx,
      collisionBlocks: this.collisionBlocks
    });
    this.input = new Input();
    this.backgroundLevel3 = new Sprite({
      position: { x: 0, y: 0 },
      imageElement: document.querySelector("#backgroundLevel3"),
    });
   
  }

  render() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.backgroundLevel3.draw(this.ctx);
    this.collisionBlocks.forEach((collisionBlock) => {
      collisionBlock.draw(this.ctx);
    });
    this.player.draw();
    this.player.update();
    this.playerMovement(); 
  }

  playerMovement() {  
    if (
      this.input.activatedKeys.w.pressed ||
      this.input.activatedKeys[" "].pressed
    ) {
      if(this.player.velocity.y === 0) this.player.velocity.y = -7;
    }

    this.player.velocity.x = 0;
    if (this.input.activatedKeys.a.pressed) this.player.velocity.x = -2;
    if (this.input.activatedKeys.d.pressed) this.player.velocity.x = 2;
  }

  createCollisionBlockObjects() {
    const collisions2D = collisionsLevel3.chunk(16);
    console.log(collisions2D);
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
