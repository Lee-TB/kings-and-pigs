import { Sprite } from "./Sprite.js";

const playerSpriteImages = {
  idleLeft: document.querySelector("#idleKingLeft"),
  idleRight: document.querySelector("#idleKingRight"),
}

export class Player extends Sprite {
  constructor({ position, collisionBlocks = [] }) {
    super({
      position: position,
      image: playerSpriteImages.idleLeft,
      sprite: {
        width: 156,
        height: 116,
      },
      frame: {
        x: 0,
        y: 0,
        max: {
          x: 10,
        },
      },
      fps: 30
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
  }

  draw(ctx) {
    super.draw(ctx)
    ctx.strokeStyle = "blue";
    // ctx.strokeRect(this.position.x, this.position.y, this.width, this.height);    

  }

  update(deltaTime) {
    super.update(deltaTime);
    // Horizontal Update
    this.position.x += this.velocity.x;
    this.handleHorizontalCollision();

    // Vertical Update
    this.velocity.y += this.gravity; // Gravity
    this.position.y += this.velocity.y;
    this.handleVerticalCollision();
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
