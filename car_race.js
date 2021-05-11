var player = {
  start: false,
};
var Ec = {};
var enemy = {};
var b = 0;
document.querySelector(".start").innerText = "CLICK HERE TO START \n"+" PLAY WITH TAP TAP ON ARROWS";
document.querySelector(".start").style.textAlign = "center";
document.querySelector(".start").addEventListener("click", startTheGame);

function startTheGame() {
  player.start = true;
  start();
  function start() {
    var Score = document.createElement("div");
    Score.setAttribute("class", "score");
    document.querySelector(".s").appendChild(Score);
    var Sline1 = document.createElement("div");
    Sline1.setAttribute("class", "sline1");
    document.querySelector(".playArea").appendChild(Sline1);
    var Sline2 = document.createElement("div");
    Sline1.style.marginLeft = 0;
    Sline1.style.color = "white";
    Sline1.style.height = 780 + "px";
    Sline1.style.width = 10 + "px";
    Sline2.setAttribute("class", "sline2");
    document.querySelector(".playArea").appendChild(Sline2);
    Sline2.style.height = 780 + "px";
    Sline2.style.width = 10 + "px";
    player.start = true;

    nw();
    lm();
    window.requestAnimationFrame(score);
    function nw() {
      enemyC(); //1st time when called doesn't run foreach command but runs it when it is called multiple time
      console.log(player.start)
      if (player.start==true) {
        console.log(player.start);
        window.requestAnimationFrame(nw);
      }
    }

    function lm() {
      if (player.start == true) {
        lineM();
        window.requestAnimationFrame(lm);
      }
    }

    function score() {
      if (player.start) {
        b += 1;
        document.querySelector(".score").innerHTML = "SCORE" + "<br>" + b;
        document.querySelector(".score").style.textAlign = "center";
        window.requestAnimationFrame(score);
      }
    }

    document.querySelector(".start").classList.add("hide");
    document.querySelector(".playArea").classList.remove("hide");
    // document.querySelector(".playArea").innerHTML="";//samzhna hai

    for (var i = 0; i < 5; i++) {
      var wline = document.createElement("div");
      wline.setAttribute("class", "wroad");
      document.querySelector(".playArea").appendChild(wline);

      document.querySelectorAll(".wroad")[i].style.top = i * 250 + "px";

      wline.y = i * 250;
    }

    var car = document.createElement("div");
    car.setAttribute("class", "car");
    document.querySelector(".playArea").appendChild(car);
    document.querySelectorAll(".car")[0].style.backgroundColor = "white";
    player.x = car.offsetLeft;
    player.y = car.offsetTop;

    for (var i = 0; i < 3; i++) {
      var Ecar = document.createElement("div");
      Ecar.setAttribute("class", "Ecar");
      document.querySelector(".playArea").appendChild(Ecar);
      Ecar.y = i * 210;

      // document.querySelectorAll(".Ecar")[i].style.top = i * 0 + "px";
      document.querySelectorAll(".Ecar")[i].style.backgroundImage =
        "url('car.png')";
      document.querySelectorAll(".Ecar")[i].style.backgroundSize = "40px 80px";
      var randl = Math.floor(Math.random() * 400);

      document.querySelectorAll(".Ecar")[i].style.marginLeft = randl + "px";
    }

    document.querySelectorAll(".Ecar")[0].style.backgroundColor = "yellow";
    document.querySelectorAll(".Ecar")[1].style.backgroundColor = "blue";
    document.querySelectorAll(".Ecar")[2].style.backgroundColor = "red";

    var click = {
      ArrowUP: "false",
      ArrowDown: "false",
      ArrowLeft: "false",
      ArrowRight: "false",
    };

    document.addEventListener("keydown", keyPressed);
    document.addEventListener("keyup", keyup);

    function keyPressed(p) {
      if (player.start) {
        window.requestAnimationFrame(keyPressed);
        if (p.key == "ArrowUp" && player.y > 20) {
          player.y = player.y - 10;
        } else if (p.key == "ArrowDown" && player.y < 48.8 * 16 - 165) {
          player.y += 10;
        } else if (p.key == "ArrowLeft" && player.x > 0) {
          player.x -= 20;
        } else if (p.key == "ArrowRight" && player.x < 480 - 40) {
          player.x += 20;
        }
        document.querySelector(".car").style.top = player.y + "px";
        document.querySelector(".car").style.left = player.x + "px";
        p.key = "false";
      } else {
        var bl = document.createElement("br");
        document.querySelector(".score").style.fontSize="large";
        document.querySelector(".score").innerText =
          "You banged your score is:\n " + b + "\nCLICK HERE TO START AGAIN";
        document.querySelector(".score").addEventListener("click", startGameAgain);
      }
    }
    function startGameAgain() {
      player.start = true;
      b = 0;
      var rand2=Math.floor(Math.random()*340);
      document.querySelector(".car").style.backgroundColor="white";
      document.querySelector(".car").style.left=rand2+'px';
      player.x=car.offsetLeft;
      nw();
      lm();
      window.requestAnimationFrame(score);
    }

    function keyup(e) {
      e.key = "false";
    }

    function lineM() {
      var w1 = document.querySelectorAll(".wroad");
      w1.forEach(function (value) {
        if (value.y >= 660) {
          value.y -= 757;
        }

        value.y += 5;
        value.style.top = value.y + "px";
      });
    }
    function endgame() {
      player.start = false;
      document.querySelector(".car").style.backgroundColor="red";
    }
    function enemyC() {
      var randl = Math.floor(Math.random() * 400);

      var enmy = document.querySelectorAll(".Ecar");

      enmy.forEach(function (value) {
        if (collide(value)) {
          endgame();
        }
        if (value.y >= 655) {
          value.y -= 740;
          value.style.marginLeft = randl + "px";
        }

        value.y += 10;
        value.style.top = value.y + "px";
      });
    }

    function collide(b) {
      //to be understood
      var a = document.querySelector(".car");
      aRect = a.getBoundingClientRect();
      bRect = b.getBoundingClientRect();
      return !(
        aRect.bottom < bRect.top ||
        aRect.top > bRect.bottom ||
        aRect.right < bRect.left ||
        aRect.left > bRect.right
      );
    }
  }
}
