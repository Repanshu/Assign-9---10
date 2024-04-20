document.addEventListener("DOMContentLoaded", function() {
  let canvas = document.getElementById("main");
  let ctx = canvas.getContext("2d");

  let brushColor = "black";
  let brushSize = 5;

  function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  function highlightButton(buttonId) {
    let buttons = document.querySelectorAll(".btn");
    buttons.forEach(button => {
      if (button.id === buttonId) {
        button.classList.add("active");
      } else {
        button.classList.remove("active");
      }
    });
  }

  document.getElementById("black").addEventListener("click", function() {
    brushColor = "black";
    highlightButton("black");
  });

  document.getElementById("red").addEventListener("click", function() {
    brushColor = "red";
    highlightButton("red");
  });

  document.getElementById("blue").addEventListener("click", function() {
    brushColor = "blue";
    highlightButton("blue");
  });

  document.getElementById("yellow").addEventListener("click", function() {
    brushColor = "yellow";
    highlightButton("yellow");
  });

  document.getElementById("erase").addEventListener("click", function() {
    brushColor = "white";
    highlightButton("erase");
  });

  document.getElementById("slider").addEventListener("input", function() {
    brushSize = this.value;
    document.getElementById("brushSize").textContent = brushSize;
  });

  document.getElementById("new").addEventListener("click", function() {
    clearCanvas();
    highlightButton(null);
  });

  let painting = false;

  function startPosition(e) {
    painting = true;
    draw(e);
  }

  function endPosition() {
    painting = false;
    ctx.beginPath();
  }

  function draw(e) {
    if (!painting) return;

    ctx.lineWidth = brushSize;
    ctx.lineCap = "round";
    ctx.strokeStyle = brushColor;

    ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
  }

  canvas.addEventListener("mousedown", startPosition);
  canvas.addEventListener("mouseup", endPosition);
  canvas.addEventListener("mousemove", draw);
});
