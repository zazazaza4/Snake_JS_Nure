export class Apple {
  constructor(x, y, size, color) {
    this._position = {
      x,
      y
    };

    this._color = color;
    this._size = size;
  }

  draw(root) {
    root.beginPath();
    root.rect(this._position.x, this._position.y, this._size, this._size);
    root.fillStyle = this._color;
    root.fill();
    root.closePath();
  }

  _random(max = 24) {
    return Math.floor(Math.random() * max);
  }

  newPosition(grip = this._size) {
    this._position.x = this._random() * grip;
    this._position.y = this._random() * grip;
  }

  get position() {
    return this._position;
  }
}
