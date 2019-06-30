class Forza4 {

  constructor(el, width, height) {

    this.width = width, this.height = height;
    this.playing = true;

    this.initGrid(el);

    this.player = 'blue';

    [...document.getElementsByClassName('cells')].forEach(el => {
      el.addEventListener('click', (e) => {
        this.update(e);
      });
    });

  }

  update(e) {
    if (this.playing) {

      let id = e.target.id;
      let x = id[1],
        y = this.height - 1;

      while (y >= 0 && document.getElementById('x' + x + 'y' + (y)).className.indexOf('active') <= 0) y--;

      y++;

      if (document.getElementById('x' + x + 'y' + y)) {
        document.getElementById('x' + x + 'y' + y).className += (' active ' + this.player);
        if (this.player == 'blue') this.player = 'red';
        else this.player = 'blue';
        let winner = this.check(x, y);
        if (winner != 'none') {
          alert(winner + ' player won!');
          this.playing = false;
        }
      }

    }
  }

  initGrid(el) {
    for (let x = 0; x < this.width; x++) {
      let el = document.createElement('div');
      for (let y = 0; y < this.height; y++) {
        let cell = document.createElement('div');
        cell.className = 'cells';
        cell.id = 'x' + x + 'y' + (this.height - y - 1);
        el.appendChild(cell);
      }
      el.className = 'column';
      playField.appendChild(el);
    }
  }

  check(x, y) {

    let player = document.getElementById('x' + x + 'y' + y).className.replace('active ', '').replace('cells ', '');

    // vertical
    for (let x = 0; x < this.width; x++)
      for (let y = 0; y < this.height - 3; y++)
        if (document.getElementById('x' + x + 'y' + (y + 1)).className.indexOf(player) > 0 && document.getElementById('x' + x + 'y' + (y + 2)).className.indexOf(player) > 0 && document.getElementById('x' + x + 'y' + (y + 3)).className.indexOf(player) > 0 && document.getElementById('x' + x + 'y' + y).className.indexOf(player) > 0) return player;

    // horizontal
    for (let x = 0; x < this.width - 3; x++)
      for (let y = 0; y < this.height; y++)
        if (document.getElementById('x' + (x + 1) + 'y' + y).className.indexOf(player) > 0 && document.getElementById('x' + (x + 2) + 'y' + y).className.indexOf(player) > 0 && document.getElementById('x' + (x + 3) + 'y' + y).className.indexOf(player) > 0 && document.getElementById('x' + x + 'y' + y).className.indexOf(player) > 0) return player;

    // diagonal '/'
    for (let x = 0; x < this.width - 3; x++)
      for (let y = 0; y < this.height - 3; y++)
        if (document.getElementById('x' + (x + 1) + 'y' + (y + 1)).className.indexOf(player) > 0 && document.getElementById('x' + (x + 2) + 'y' + (y + 2)).className.indexOf(player) > 0 && document.getElementById('x' + (x + 3) + 'y' + (y + 3)).className.indexOf(player) > 0 && document.getElementById('x' + x + 'y' + y).className.indexOf(player) > 0) return player;

    // diagonal '\'
    for (let x = 3; x < this.width; x++)
      for (let y = 0; y < this.height - 3; y++)
        if (document.getElementById('x' + (x - 1) + 'y' + (y + 1)).className.indexOf(player) > 0 && document.getElementById('x' + (x - 2) + 'y' + (y + 2)).className.indexOf(player) > 0 && document.getElementById('x' + (x - 3) + 'y' + (y + 3)).className.indexOf(player) > 0 && document.getElementById('x' + x + 'y' + y).className.indexOf(player) > 0) return player;

    return 'none';
  }

}
