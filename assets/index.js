window.onload = function () {
  var stage = document.getElementById("stage");
  var ctx = stage.getContext("2d");
  document.addEventListener("keydown", keyPush);
  setInterval(game, 100);

  //Configurando velocidade
  const vel = 1;
  let vx = (vy = 0);
  //Configurando posição x e y
  let px = 10;
  let py = 15;
  //Configurando "peças"
  let tp = 20;
  let qpx = 35;
  let qpy = 20;
  //Configurando a "maçã"
  let ax = (ay = 15);

  //Score
  let score = 0;

  //Rastro e calda da cobra
  let trail = [];
  tail = 5;

  function game() {

    //Controle de posicionamento
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

    //Mostrando score = 0 (inicio)
    document.getElementById("score").value = score;

    //Configurando o desenho (canvas)
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, stage.width, stage.height);

    ctx.fillStyle = "red";
    ctx.fillRect(ax * tp, ay * tp, tp, tp);

    ctx.fillStyle = "gray";
    for (let i = 0; i < trail.length; i++) {
      ctx.fillRect(trail[i].x * tp, trail[i].y * tp, tp - 1, tp - 1);
      //GameOver
      if (trail[i].x == px && trail[i].y == py) {
        vx = vy = 0;
        tail = 5;
        score = 0;
      }
    }

    //controlando a calda
    trail.push({ x: px, y: py });
    while (trail.length > tail) {
      trail.shift();
    }

    //Pegando a "maçã"
    if (ax == px && ay == py) {
      tail++;
      score++;
      document.getElementById("score").value = score;
      ax = Math.floor(Math.random() * qpx);
      ay = Math.floor(Math.random() * qpy);
    }
  }

  //Configuração de controles
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
