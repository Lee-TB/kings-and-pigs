export class Player {
  constructor() {
    this.position = {
      x: 200,
      y: 300,
    };

    this.width = 64;
    this.height = 64;

    this.velocity = {
      x: 0,
      y: 0,
    };

    this.gravity = 0.2;
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
    this.position.x += this.velocity.x;

    this.position.y += this.velocity.y;
    this.sides.bottom = this.position.y + this.height;
    // bottom boundary
    if (this.sides.bottom + this.velocity.y < canvas.height) {
      this.velocity.y += this.gravity;
    } else {
      this.bounce = -this.velocity.y * 0.3;
      this.bounce = Math.abs(this.bounce) < 1e-6 ? 0 : this.bounce;
      this.velocity.y = this.bounce;
    }
  }
}
