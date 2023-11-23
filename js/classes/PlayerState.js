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
  }
}
