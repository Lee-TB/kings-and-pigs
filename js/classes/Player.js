export class Player {
  constructor() {
    this.position = {
      x: 200,
      y: 300,
    };

    this.width = 100;
    this.height = 100;

    this.velocity = {
      x: 0,
      y: 0,
    };

    this.gravity = 0.1;
    this.bounce = 0;

    this.sides = {
      bottom: this.position.y + this.height,
    };
  }

  draw(ctx) {
    ctx.fillStyle = "red";
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  update(canvas) {
    this.position.y += this.velocity.y;

    // above bottom of Canvas
    if (this.sides.bottom + this.velocity.y < canvas.height) {
      this.velocity.y += this.gravity;
      this.sides.bottom = this.position.y + this.height;
    } else {
      this.bounce = -this.velocity.y * 0.3;
      this.velocity.y = this.bounce;
    }
  }
}
