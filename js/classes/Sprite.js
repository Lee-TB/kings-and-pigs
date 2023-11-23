export class Sprite {
  constructor({ position, image, sprite, frame, fps }) {
    this.position = position;
    this.image = image;
    this.sprite = sprite;
    this.frame = frame
    this.fps = fps;
    this.interval = 1000 / this.fps;
    this.timer = 0;
  }

  draw(ctx) {
    ctx.drawImage(
      this.image,
      this.frame.x * this.sprite.width,
      this.frame.y * this.sprite.height,
      this.sprite.width,
      this.sprite.height,
      this.position.x - this.sprite.width * 0.3,
      this.position.y - this.sprite.height * 0.2,
      this.sprite.width,
      this.sprite.height
    );
  }

  update(deltaTime) {    
    if(this.timer > this.interval) {
      this.timer = 0;
      if (this.frame.x >= this.frame.max.x) this.frame.x = 0;
      else this.frame.x += 1;    
    } else this.timer += deltaTime;
  }
}
