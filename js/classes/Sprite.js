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

  update(deltaTime) {    
    if(this.timer > this.interval) {
      this.timer = 0;
      if (this.frame.x >= this.frame.maxFrame) this.frame.x = 0;
      else this.frame.x += 1;    
    } else this.timer += deltaTime;
  }
}
