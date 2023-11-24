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
  }
}

export class IdleLeft extends PlayerState {
  constructor(player) {
    super(player);
    this.image = document.querySelector("#kingIdleLeft");
  }
  enter() {
    this.player.image = this.image;
    this.player.maxFrame = 10;
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
  }
  enter() {
    this.player.image = this.image;
    this.player.maxFrame = 10;
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
  }
  enter() {
    this.player.image = this.image;
    this.player.maxFrame = 7;
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
  }
  enter() {
    this.player.image = this.image;
    this.player.maxFrame = 7;
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
  }
  enter() {
    this.player.loop = false;
    this.player.setFPS(10);    
    this.player.image = this.image;
    this.player.frameX = 0;
    this.player.maxFrame = 7;
  }
  update() {
    this.player.velocity.x *= 0.1;
  }
}
