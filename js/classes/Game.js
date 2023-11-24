import "../utils/Array.js";
import { Player } from "./Player.js";
import { Input } from "./Input.js";
import { Background } from "./Background.js";
import { CollisionBlock } from "./CollisionBlock.js";
import { collisionsLevel1, collisionsLevel3 } from "../data/collisions.js";
import { Sprite } from "./Sprite.js";
import { STATES } from "./PlayerState.js";
import { Door } from "./Door.js";

export class Game {
  constructor({ canvas, ctx }) {
    this.canvas = canvas;
    this.ctx = ctx;

    this.collisionBlocks = [];
    this.createCollisionBlockObjects();

    this.player = new Player({
      position: {
        x: 64 * 3.5,
        y: 64 * 4.5,
      },
      collisionBlocks: this.collisionBlocks,
    });

    this.input = new Input();

    this.backgroundLevels = [
      new Background({
        position: { x: 0, y: 0 },
        image: document.querySelector("#backgroundLevel1"),
      }),
      new Background({
        position: { x: 0, y: 0 },
        image: document.querySelector("#backgroundLevel2"),
      }),
      new Background({
        position: { x: 0, y: 0 },
        image: document.querySelector("#backgroundLevel3"),
      }),
    ];
    this.doors = [
      new Door({
        position: { x: 767, y: 272 },
        width: 92,
        height: 112,
      }),
    ];
  }

  render(deltaTime) {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.backgroundLevels[0].draw(this.ctx);
    this.collisionBlocks.forEach((collisionBlock) => {
      collisionBlock.draw(this.ctx);
    });

    this.doors[0].draw(this.ctx);
    this.doors[0].update(deltaTime);

    this.player.draw(this.ctx);
    this.player.update(deltaTime);
    this.playerMovement();
  }

  playerMovement() {
    if (
      this.input.activatedKeys.w.pressed ||
      this.input.activatedKeys[" "].pressed
    ) {
      if (
        this.player.checkCollision(this.doors[0].hitbox)
      ) {
        // enter door
        this.player.setState(STATES.ENTER_DOOR);
        this.doors[0].autoplay = true;
      } else {
        // jump
        if (this.player.velocity.y === 0) this.player.velocity.y = -7;
      }
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
