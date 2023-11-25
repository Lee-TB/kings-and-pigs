import { Input } from "./Input.js";

export const STATES = {
  IDLE_RIGHT: 0,
  IDLE_LEFT: 1,
  RUN_LEFT: 2,
  RUN_RIGHT: 3,
  ENTER_DOOR: 4,
};

class PlayerState {
  constructor(player) {    
    this.player = player;
    this.input = new Input();
    this.fps = 30;
    this.loop = true;
  }
}

export class IdleLeft extends PlayerState {
  constructor(player) {
    super(player);
    this.image = document.querySelector("#kingIdleLeft");
    this.maxFrame = 10;
  }
  enter() {
    this.player.image = this.image;
    this.player.maxFrame = this.maxFrame;
    this.player.setFPS(this.fps)
    this.player.loop = this.loop;
    this.player.frameX = 0;
  }
  update() {
    if (this.player.velocity.x < 0) {
      this.player.setState(STATES.RUN_LEFT);
    }
    if (this.player.velocity.x > 0) {
      this.player.setState(STATES.RUN_RIGHT);
    }
  }
}

export class IdleRight extends PlayerState {
  constructor(player) {
    super(player);
    this.image = document.querySelector("#kingIdleRight");
    this.maxFrame = 10;
  }
  enter() {
    this.player.image = this.image;
    this.player.maxFrame = this.maxFrame;
    this.player.setFPS(this.fps)
    this.player.loop = this.loop;
    this.player.frameX = 0;
  }
  update() {
    if (this.player.velocity.x < 0) {
      this.player.setState(STATES.RUN_LEFT);
    }
    if (this.player.velocity.x > 0) {
      this.player.setState(STATES.RUN_RIGHT);
    }
  }
}

export class RunRight extends PlayerState {
  constructor(player) {
    super(player);
    this.image = document.querySelector("#kingRunRight");
    this.maxFrame = 7;
  }
  enter() {
    this.player.image = this.image;
    this.player.maxFrame = this.maxFrame;
    this.player.setFPS(this.fps)
    this.player.loop = this.loop;
    this.player.frameX = 0;
  }
  update() {
    if (this.player.velocity.x === 0) {
      this.player.setState(STATES.IDLE_RIGHT);
    }
    if (this.player.velocity.x < 0) {
      this.player.setState(STATES.RUN_LEFT);
    }
  }
}

export class RunLeft extends PlayerState {
  constructor(player) {
    super(player);
    this.image = document.querySelector("#kingRunLeft");
    this.maxFrame = 7;
  }
  enter() {
    this.player.image = this.image;
    this.player.maxFrame = this.maxFrame;
    this.player.setFPS(this.fps)
    this.player.loop = this.loop;
    this.player.frameX = 0;
  }
  update() {
    if (this.player.velocity.x === 0) {
      this.player.setState(STATES.IDLE_LEFT);
    }
    if (this.player.velocity.x > 0) {
      this.player.setState(STATES.RUN_RIGHT);
    }
  }
}

export class EnterDoor extends PlayerState {
  constructor(player) {
    super(player);
    this.image = document.querySelector("#kingEnterDoor");
    this.maxFrame = 7;
    this.fps = 10;
    this.loop = false;
  }
  enter() {
    this.player.image = this.image;
    this.player.maxFrame = this.maxFrame;
    this.player.setFPS(this.fps)    
    this.player.loop = this.loop;
    this.player.frameX = 0;
  }
  update() {
    this.player.velocity.x *= 0.1;
  }
}
