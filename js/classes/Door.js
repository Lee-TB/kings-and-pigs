import { Sprite } from "./Sprite.js";

export class Door extends Sprite {
  constructor({ position, width, height }) {
    super({
      position: position,
      image: document.querySelector("#doorOpen"),
      spriteWidth: 92,
      spriteHeight: 112,
      maxFrame: 4,
      fps: 10,
      loop: false,
      autoplay: false,
    });
    this.width = width;
    this.height = height;
    this.hitbox = {
      position: {...this.position, x: this.position.x + this.width*0.45},
      width: this.width/6,
      height: this.height
    }
  }

  draw(ctx) {
    super.draw(ctx);
    ctx.fillRect(this.hitbox.position.x, this.hitbox.position.y, this.hitbox.width, this.hitbox.height);
  }
}
