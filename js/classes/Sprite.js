export class Sprite {
  constructor({ position, imageElement }) {
    this.position = position;
    this.image = imageElement;
  }
  draw(ctx) {
    ctx.drawImage(this.image, this.position.x, this.position.y);
  }
}
