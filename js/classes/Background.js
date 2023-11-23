export class Background {
  constructor({ position, image }) {
    this.position = position;
    this.image = image;
  }
  draw(ctx) {
    ctx.drawImage(this.image, this.position.x, this.position.y);
  }
}
