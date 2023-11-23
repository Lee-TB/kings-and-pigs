import { Sprite } from "./Sprite.js";
import {
  STATES,
  IdleLeft,
  IdleRight,
  RunLeft,
  RunRight,
} from "./PlayerState.js";

export class Player extends Sprite {
  constructor({ position, collisionBlocks = [] }) {
    super({
      position: position,
      image: document.querySelector("#kingRunLeft"),
      sprite: {
        width: 156,
        height: 116,
      },
      frame: {
        x: 0,
        y: 0,
        maxFrame: 7,
      },
      fps: 30,
    });

    this.position = position;

    this.collisionBlocks = collisionBlocks;

    this.width = 64;
    this.height = 64;

    this.velocity = {
      x: 0,
      y: 0,
    };

    this.gravity = 0.2;
    this.bounce = 0;

    this.states = {
      [STATES.IDLE_LEFT]: new IdleLeft(this),
      [STATES.IDLE_RIGHT]: new IdleRight(this),
      [STATES.RUN_LEFT]: new RunLeft(this),
      [STATES.RUN_RIGHT]: new RunRight(this),
    };
    this.setState(STATES.IDLE_LEFT)
  }

  draw(ctx) {
    super.draw(ctx);
    ctx.strokeStyle = "blue";
    // ctx.strokeRect(this.position.x, this.position.y, this.width, this.height);
  }

  update(deltaTime) {
    super.update(deltaTime);
    
    // check update state
    this.currentState.update();

    // Horizontal Update
    this.position.x += this.velocity.x;
    this.handleHorizontalCollision();

    // Vertical Update
    this.velocity.y += this.gravity; // Gravity
    this.position.y += this.velocity.y;
    this.handleVerticalCollision();
  }

  setState(state) {
    this.currentState = this.states[state];
    this.currentState.enter();
  }

  checkCollision(objectA, objectB) {
    return (
      objectA.position.x <= objectB.position.x + objectB.width &&
      objectA.position.x + objectA.width >= objectB.position.x &&
      objectA.position.y <= objectB.position.y + objectB.height &&
      objectA.position.y + objectA.height >= objectB.position.y
    );
  }

  handleHorizontalCollision() {
    for (let i = 0; i < this.collisionBlocks.length; i++) {
      const collisionBlock = this.collisionBlocks[i];
      if (this.checkCollision(collisionBlock, this)) {
        // Wall slide
        this.velocity.y *= 0.8;

        // To left
        if (this.velocity.x < 0) {
          this.position.x =
            collisionBlock.position.x + collisionBlock.width + 0.1;
          break;
        }
        // To right
        if (this.velocity.x > 0) {
          this.position.x = collisionBlock.position.x - this.width - 0.1;
          break;
        }
      }
    }
  }

  handleVerticalCollision() {
    for (let i = 0; i < this.collisionBlocks.length; i++) {
      const collisionBlock = this.collisionBlocks[i];
      if (this.checkCollision(collisionBlock, this)) {
        // Bottom up
        if (this.velocity.y < 0) {
          this.position.y =
            collisionBlock.position.y + collisionBlock.height + 0.1;
          this.velocity.y = Math.abs(this.velocity.y * 0.01);
          break;
        }
        // Top down
        if (this.velocity.y > 0) {
          this.position.y = collisionBlock.position.y - this.height - 0.1;
          this.bounce = -this.velocity.y * 0.3;
          this.bounce = Math.abs(this.bounce) < 1e-1 ? 0 : this.bounce;
          this.velocity.y = this.bounce;
          break;
        }
      }
    }
  }
}
