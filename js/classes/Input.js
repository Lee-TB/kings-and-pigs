let instance = null;

export class Input {
  constructor() {
    if(instance) {
      return instance;
    }
    instance = this;

    console.log('new Input object');

    this.activatedKeys = {
      w: {
        pressed: false
      },
      " ": {
        pressed: false
      },
      a: {
        pressed: false
      },
      d: {
        pressed: false
      }
    };

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
      }
    });
  }
}

