let inputInstance = null;

export class Input {
  constructor() {
    if (inputInstance) {
      return inputInstance;
    }
    inputInstance = this;

    this.activatedKeys = {
      w: {
        pressed: false,
      },
      " ": {
        pressed: false,
      },
      a: {
        pressed: false,
      },
      d: {
        pressed: false,
      },
      e: {
        pressed: false,
      },
      arrowright: {
        pressed: false,
      },
      arrowleft: {
        pressed: false,
      },
      arrowup: {
        pressed: false,
      },
      arrowdown: {
        pressed: false,
      },
    };
    this.debug = false;

    window.addEventListener("keydown", (event) => {
      const key = event.key.toLocaleLowerCase();
      switch (key) {
        case "w":
        case " ":
          this.activatedKeys[key].pressed = true;
          break;
        case "a":
          this.activatedKeys[key].pressed = true;
          break;
        case "d":
          this.activatedKeys[key].pressed = true;
          break;
        case "e":
          this.activatedKeys[key].pressed = true;
          break;
        case "arrowright":
          this.activatedKeys[key].pressed = true;
          break;
        case "arrowleft":
          this.activatedKeys[key].pressed = true;
          break;
        case "arrowup":
          this.activatedKeys[key].pressed = true;
          break;
        case "arrowdown":
          this.activatedKeys[key].pressed = true;
          break;
        case "/":
          this.debug = !this.debug;
          break;
      }
    });

    window.addEventListener("keyup", (event) => {
      const key = event.key.toLocaleLowerCase();
      switch (key) {
        case "w":
        case " ":
          this.activatedKeys[key].pressed = false;
          break;
        case "a":
          this.activatedKeys[key].pressed = false;
          break;
        case "d":
          this.activatedKeys[key].pressed = false;
          break;
        case "e":
          this.activatedKeys[key].pressed = false;
          break;
        case "arrowright":
          this.activatedKeys[key].pressed = false;
          break;
        case "arrowleft":
          this.activatedKeys[key].pressed = false;
          break;
        case "arrowup":
          this.activatedKeys[key].pressed = false;
          break;
        case "arrowdown":
          this.activatedKeys[key].pressed = false;
          break;
      }
    });
  }
}
