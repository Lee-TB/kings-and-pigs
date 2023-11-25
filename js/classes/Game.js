import "../utils/Array.js";
import { Player } from "./Player.js";
import { Input } from "./Input.js";
import { Background } from "./Background.js";
import { CollisionBlock } from "./CollisionBlock.js";
import { Door } from "./Door.js";

import {
  collisionsLevel1,
  collisionsLevel2,
  collisionsLevel3,
} from "../data/collisions.js";
import { STATES } from "./PlayerState.js";

export class Game {
  constructor({ canvas, ctx }) {
    this.canvas = canvas;
    this.ctx = ctx;    

    this.player = new Player({
      position: {
        x: 0,
        y: 0,
      },
    });

    this.input = new Input();

    this.level = 3;
    this.levels = {
      1: {
        background: new Background({
          position: { x: 0, y: 0 },
          image: document.querySelector("#backgroundLevel1"),
        }),
        collisionBlocks: this.createCollisionBlocks(collisionsLevel1),
        doors: [
          new Door({
            position: { x: 767, y: 272 },
            width: 92,
            height: 112,
          }),
        ],
        player: {
          position: {
            x: 64 * 3.5,
            y: 64 * 4.5,
          },
          state: STATES.IDLE_RIGHT
        },
      },
      2: {
        background: new Background({
          position: { x: 0, y: 0 },
          image: document.querySelector("#backgroundLevel2"),
        }),
        collisionBlocks: this.createCollisionBlocks(collisionsLevel2),
        doors: [
          new Door({
            position: { x: 772, y: 336 },
            width: 92,
            height: 112,
          }),
        ],
        player: {
          position: {
            x: 64 * 1.5,
            y: 64 * 2,
          },
          state: STATES.IDLE_RIGHT
        },
      },
      3: {
        background: new Background({
          position: { x: 0, y: 0 },
          image: document.querySelector("#backgroundLevel3"),
        }),
        collisionBlocks: this.createCollisionBlocks(collisionsLevel3),
        doors: [
          new Door({
            position: { x: 176, y: 335 },
            width: 92,
            height: 112,
          }),
        ],
        player: {
          position: {
            x: 64 * 12.5,
            y: 64 * 2.5,
          },
          state: STATES.IDLE_LEFT
        },
      },
    };

    this.player.set({
      position: this.levels[this.level].player.position,
      collisionBlocks: this.levels[this.level].collisionBlocks,
      state: this.levels[this.level].player.state,
    });

    this.overlay = {
      opacity: 0,
    };
  }

  render(deltaTime) {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.levels[this.level].background.draw(this.ctx);
    this.levels[this.level].collisionBlocks.forEach((collisionBlock) => {
      collisionBlock.draw(this.ctx);
    });
    this.levels[this.level].doors.forEach((door) => {
      door.draw(this.ctx);
      door.update(deltaTime);
      door.onComplete = () => {
        this.ctx.save();
        this.ctx.globalAlpha = this.overlay.opacity;
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.restore();
        gsap.to(this.overlay, {
          opacity: 1,
        });
      };
    });

    this.player.draw(this.ctx);
    this.player.update(deltaTime);
    this.playerMovement();
  }

  playerMovement() {
    if (
      this.input.activatedKeys.w.pressed ||
      this.input.activatedKeys[" "].pressed
    ) {
      const enterDoorIndex = this.findIndexOfEnterDoor();
      if (enterDoorIndex !== -1) {
        // enter door
        this.player.setState(STATES.ENTER_DOOR);
        this.levels[this.level].doors[enterDoorIndex].autoplay = true;
      } else {
        // jump
        if (this.player.velocity.y === 0) this.player.velocity.y = -7;
      }
    }

    this.player.velocity.x = 0;
    if (this.input.activatedKeys.a.pressed) this.player.velocity.x = -2;
    if (this.input.activatedKeys.d.pressed) this.player.velocity.x = 2;
  }

  findIndexOfEnterDoor() {
    return this.levels[this.level].doors.findIndex((door) =>
      this.player.checkCollision(door.hitbox)
    );
  }

  createCollisionBlocks(data) {
    const collisionBlocks = []
    const data2D = data.chunk(16);
    data2D.forEach((row, yIndex) => {
      row.forEach((cell, xIndex) => {
        if (cell === 292) {
          collisionBlocks.push(
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
    return collisionBlocks;
  }
}
