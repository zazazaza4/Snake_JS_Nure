export class Snake {
  constructor(x, y, dx, dy, startCells = 1, size = 20, color) {
    this._position = {
      x,
      y
    };
    this._velocity = {
      dx,
      dy
    };
    this._startCells = startCells;
    this._cells = [];
    this._color = color;
    this._size = size;

    this._input = new PlayerControllerInput();
  }

  move() {
    const { forward, left, backward, right } = this._input._keys;

    if (left) {
      this._velocity.dx = -this._size;
      this._velocity.dy = 0;
    } else if (forward) {
      this._velocity.dx = 0;
      this._velocity.dy = -this._size;
    } else if (right) {
      this._velocity.dx = this._size;
      this._velocity.dy = 0;
    } else if (backward) {
      this._velocity.dx = 0;
      this._velocity.dy = this._size;
    }
  }

  collisionWalls(game) {
    if (game.width < this._position.x + this._size) {
      return true;
    } else if (0 > this._position.x) {
      return true;
    } else if (game.height < this._position.y + this._size) {
      return true;
    } else if (0 > this.position.y) {
      return true;
    }
    return false;
  }

  isСrossTailWithHead() {
    for (let j = 1; j < this._startCells; j++) {
      if (this._cells[0].x === this._cells[j].x && this._cells[0].y === this._cells[j].y) {
        return true;
      }
    }

    return false;
  }

  draw(root, createRect) {
    root.beginPath();
    root.fillStyle = this._color;
    this._cells.unshift({ x: this._position.x, y: this._position.y });
    root.rect(this.position.x, this.position.y, this._size, this._size);
    for (let i = 0; i < this._startCells; i++) {
      createRect(this._cells[i].x, this._cells[i].y, this._size - 0.2, this._size - 0.2);
    }
    root.fill();
    root.closePath();
  }

  set x(x = this._position.x) {
    this._position.x = x;
  }

  set y(y = this._position.y) {
    this._position.y = y;
  }

  set startCells(num) {
    this._startCells = num;
  }

  get startCells() {
    return this._startCells;
  }

  get position() {
    return this._position;
  }

  get velocity() {
    return this._velocity;
  }
}

class PlayerControllerInput {
  constructor() {
    this._Init();
  }

  _Init() {
    this._keys = {
      forward: false,
      backward: false,
      left: false,
      right: false
    };
    document.addEventListener('keydown', (e) => this._onKeyDown(e), false);
  }

  _onKeyDown(event) {
    switch (event.keyCode) {
      case 87:
      case 38: {
        this._keys.forward = true;
        this._keys.backward = false;
        this._keys.left = false;
        this._keys.right = false;
        break;
      }
      case 65:
      case 37: {
        this._keys.left = true;
        this._keys.forward = false;
        this._keys.backward = false;
        this._keys.right = false;
        break;
      }
      case 83:
      case 40: {
        this._keys.backward = true;
        this._keys.forward = false;
        this._keys.right = false;
        this._keys.left = false;
        break;
      }
      case 68:
      case 39: {
        this._keys.right = true;
        this._keys.backward = false;
        this._keys.forward = false;
        this._keys.left = false;
        break;
      }
      default:
        break;
    }
  }
}
