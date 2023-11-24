import { Sprite } from "./Sprite.js";
import {
  STATES,
  IdleLeft,
  IdleRight,
  RunLeft,
  RunRight,
  EnterDoor,
} from "./PlayerState.js";

export class Player extends Sprite {
  constructor({ position, collisionBlocks = [] }) {
    super({
      position: position,
      image: document.querySelector("#kingRunLeft"),
      spriteWidth: 156,
      spriteHeight: 116,
      maxFrame: 7,
      fps: 30,
    });

    this.position = position;

    this.collisionBlocks = collisionBlocks;

    this.width = 48;
    this.height = 48;

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
      [STATES.ENTER_DOOR]: new EnterDoor(this),
    };
    this.setState(STATES.IDLE_RIGHT);
  }

  draw(ctx) {
    ctx.strokeStyle = "blue";
    ctx.strokeRect(this.position.x, this.position.y, this.width, this.height);
    ctx.drawImage(
      this.image,
      this.frameX * this.spriteWidth,
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.position.x - this.spriteWidth * 0.35,
      this.position.y - this.spriteHeight * 0.35,
      this.spriteWidth,
      this.spriteHeight
    );
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
    const newState = this.states[state];
    if (
      this.currentState &&
      this.currentState.constructor === newState.constructor
    )
      return;      
    this.currentState = newState;
    this.currentState.enter();
  }

  checkCollision(object) {
    return (
      this.position.x <= object.position.x + object.width &&
      this.position.x + this.width >= object.position.x &&
      this.position.y <= object.position.y + object.height &&
      this.position.y + this.height >= object.position.y
    );
  }

  handleHorizontalCollision() {
    for (let i = 0; i < this.collisionBlocks.length; i++) {
      const collisionBlock = this.collisionBlocks[i];
      if (this.checkCollision(collisionBlock)) {
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
      if (this.checkCollision(collisionBlock)) {
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
