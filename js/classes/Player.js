export class Player {
  constructor() {
    this.position = {
      x: 200,
      y: 300,
    };

    this.width = 100;
    this.height = 100;

    this.sides = {
      top: this.position.y,
      bottom: this.position.y + this.height,
      left: this.position.x,
      right: this.position.x + this.width,
    };
  }

  draw(ctx) {
    ctx.fillStyle = "red";
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  update(canvas) {
    if (this.sides.bottom < canvas.height) {
      this.position.y += 1;
      this.sides.bottom = this.position.y + this.height;
    }
  }
}
