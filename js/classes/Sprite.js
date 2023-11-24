export class Sprite {
  constructor({
    position,
    image,
    spriteWidth,
    spriteHeight,
    fps,
    maxFrame,
    loop = true,
    autoplay = true,
  }) {
    this.position = position;
    this.image = image;
    this.spriteWidth = spriteWidth;
    this.spriteHeight = spriteHeight;
    this.frameX = 0;
    this.maxFrame = maxFrame;
    this.loop = loop;
    this.autoplay = autoplay;
    this.fps = fps;
    this.interval = 1000 / this.fps;
    this.timer = 0;
  }

  setFPS(fps) {
    this.fps = fps;
    this.interval = 1000 / this.fps;
  }

  draw(ctx) {
    ctx.drawImage(
      this.image,
      this.frameX * this.spriteWidth,
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.position.x,
      this.position.y,
      this.spriteWidth,
      this.spriteHeight
    );
  }

  update(deltaTime) {
    if (this.autoplay) {      
      if (this.timer > this.interval) {
        this.timer = 0;
        if (this.loop) {
          if (this.frameX >= this.maxFrame) this.frameX = 0;
          else this.frameX += 1;
        } else {
          if (this.frameX >= this.maxFrame) this.frameX = this.maxFrame;
          else this.frameX += 1;
        }
      } else this.timer += deltaTime;
    }
  }
}
