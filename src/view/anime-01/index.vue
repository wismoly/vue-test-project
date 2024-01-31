<template>
  <div class="container">
    <div class="coordinates">
      <div>X:<span class="posX">95</span></div>
      <div>Y:<span class="posY">80</span></div>
    </div>

    <svg
      id="svg-ele"
      width="190"
      height="160"
      viewBox="0 0 190 160"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M 10 80 Q 95 80 180 80"
        stroke="white"
        fill="transparent"
        id="curve"
      />

      <circle cx="10" cy="80" r="2" fill="white" id="start-point" />
      <circle cx="180" cy="80" r="2" fill="white" id="end-point" />
      <circle cx="95" cy="80" r="5" fill="#FDD835" id="control-point" />
    </svg>
  </div>
</template>
<script setup>
import { onMounted, nextTick } from "vue";
import anime from "animejs";
onMounted(() => {
  nextTick(() => {
    const svg = document.getElementById("svg-ele");
    const curve = document.getElementById("curve");
    const controlPoint = document.getElementById("control-point");
    const posXLabel = document.querySelector(".posX");
    const posYLabel = document.querySelector(".posY");
    const svgViewBoxWidth = 190;

    let isMouseDown = false;
    let point = {
      x: 95,
      y: 80,
    };

    function updateCurve(x, y) {
      let svgRect = svg.getBoundingClientRect();
      let scale = svgRect.width / svgViewBoxWidth;
      let width = svgRect.width / scale - 5;
      let height = svgRect.height / scale - 6;

      // update point coordinates to mouse/touch position when dragging
      if (x && y) {
        point.x = Math.ceil((x - svgRect.x) / scale);
        point.y = Math.ceil((y - svgRect.y) / scale);
      }

      // clamp the coordinates to the limits of the SVG viewbox
      point.x = point.x < 5 ? 5 : point.x;
      point.y = point.y < 5 ? 5 : point.y;
      point.x = point.x > width ? Math.ceil(width) : point.x;
      point.y = point.y > height ? Math.ceil(height) : point.y;

      // update coordinate labels
      posXLabel.textContent = point.x.toFixed(2);
      posYLabel.textContent = point.y.toFixed(2);

      // update coordinates for control point and curve
      controlPoint.setAttribute("cx", point.x);
      controlPoint.setAttribute("cy", point.y);

      curve.setAttribute(
        "d",
        curve
          .getAttribute("d")
          .replace(/Q (\d+(\.\d+)?) (\d+(\.\d+)?)/, `Q ${point.x} ${point.y}`)
      );
    }

    function onMouseDown() {
      isMouseDown = true;
    }

    function onMouseMove(ev) {
      if (isMouseDown) {
        updateCurve(ev.clientX, ev.clientY);
      }
    }

    function onMouseUp() {
      isMouseDown = false;

      // animate the control point and curve back to
      // the initial positions with a bouncy effect
      // using the anime.js animation library
      anime({
        targets: point,
        x: 95, // target X coordinate
        y: 80, // target Y coordinate
        duration: 1000,
        easing: "easeOutElastic(1.5, 0.2)",
        update: function () {
          updateCurve();
        },
      });
    }

    controlPoint.addEventListener("mousedown", onMouseDown);
    controlPoint.addEventListener("touchstart", onMouseDown);

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("touchmove", (ev) => {
      updateCurve(ev.touches[0].clientX, ev.touches[0].clientY);
    });

    document.addEventListener("mouseup", onMouseUp);
    document.addEventListener("touchend", onMouseUp);
  });
});
</script>
<style lang="css" scoped>
.container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  background: rgb(84, 92, 97);
  background: radial-gradient(
    circle,
    rgba(84, 92, 97, 1) 0%,
    rgba(23, 41, 48, 1) 100%
  );
}

svg {
  width: 90vw;
  height: auto;
  background-color: transparent;
}

#control-point {
  cursor: grab;
}

#control-point:active {
  cursor: grabbing;
}

.coordinates {
  font-size: 20px;
  text-align: center;
  display: flex;
  justify-content: center;
  gap: 20px;
  font-size: 20px;
  color: #fff;
}
</style>
