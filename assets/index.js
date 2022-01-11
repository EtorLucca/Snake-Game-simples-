window.onload = function () {
  var stage = document.getElementById("stage");
  var ctx = stage.getContext("2d");
  document.addEventListener("keydown", keyPush);
  setInterval(game, 100);

  const vel = 1;
  let vx = (vy = 0);
  let px = 10;
  let py = 15;
  let tp = 20;
  let qpx = 35;
  let qpy = 20; 
  let ax = (ay = 15);
  let score = 0;

  let trail = [];
  tail = 5;

  function game() {
    px += vx;
    py += vy;
    if (px < 0) {
      px = qpx - 1;
    }
    if (px > qpx - 1) {
      px = 0;
    }
    if (py < 0) {
      py = qpy - 1;
    }
    if (py > qpy - 1) {
      py = 0;
    }

    document.getElementById("score").value = score;

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, stage.width, stage.height);

    ctx.fillStyle = "red";
    ctx.fillRect(ax * tp, ay * tp, tp, tp);

    ctx.fillStyle = "gray";
    for (let i = 0; i < trail.length; i++) {
      ctx.fillRect(trail[i].x * tp, trail[i].y * tp, tp - 1, tp - 1);
      if (trail[i].x == px && trail[i].y == py) {
        vx = vy = 0;
        tail = 5;
        score = 0;
      }
    }

    trail.push({ x: px, y: py });
    while (trail.length > tail) {
      trail.shift();
    }

    if (ax == px && ay == py) {
      tail++;
      score++;
      document.getElementById("score").value = score;
      ax = Math.floor(Math.random() * qpx);
      ay = Math.floor(Math.random() * qpy);
    }
  }

  function keyPush(event) {
    switch (event.keyCode) {
      case 37:
        vx = -vel;
        vy = 0;
        break;
      case 38:
        vx = 0;
        vy = -vel;
        break;
      case 39:
        vx = vel;
        vy = 0;
        break;
      case 40:
        vx = 0;
        vy = vel;
        break;
    }
  }
};