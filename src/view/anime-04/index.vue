<template>
  <div class="container">
    <div class="wrapper">
      <div class="rotating-cards">
        <div class="rotating-cards__el">
          <img src="https://source.unsplash.com/RDYxZhW_ptw/800x600" />
        </div>
        <div class="rotating-cards__el">
          <img src="https://source.unsplash.com/6MfaRNHSs64/800x600" />
        </div>
        <div class="rotating-cards__el">
           <img src="https://source.unsplash.com/RDYxZhW_ptw/800x600" />
        </div>
        <div class="rotating-cards__el">
          <img src="https://source.unsplash.com/Xos3_0qhnmA/800x600" />
        </div>
        <div class="rotating-cards__el">
          <img src="https://source.unsplash.com/wmYcY_LyXmU/800x600" />
        </div>
      </div>
      <div class="txt">
        <h4>anime.js powered card stack rotator</h4>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted, nextTick } from "vue";
import anime from "animejs";
import Letterize from "letterizejs";

onMounted(() => {
  nextTick(() => {
    const elements = document.querySelectorAll(".rotating-cards__el");
    const inners = document.querySelectorAll(".rotating-cards__el img");
    const total = elements.length - 1;
    const innerOffset = 100;
    const watchTime = 1000;
    const duration = 3000;
    const tilt = -5;
    const gap = 60;
    const depth = 60;
    const factor = 1; // -1 to go from right to left
    const ease = "spring(0.5, 100, 3, 0)";
    const tl = anime.timeline({
      easing: ease,
      loop: true,
    });
    let firstHalf = [],
      secHalf = [],
      setObj = [],
      transforms = [],
      innerFH = [],
      innerSH = [],
      setInners = [],
      innerTransforms = [];

    for (let i = 0; i <= total / 2; i++) {
      transforms.push({
        translateX: factor * gap * i,
        rotateY: -factor * tilt * i,
        translateZ: -depth * i,
      });
      innerTransforms.push({
        translateX: Number(((factor * i * 2 * innerOffset) / total).toFixed(2)),
      });
    }

    for (let i = total / 2; i < total; i++) {
      transforms.push({
        translateX: -factor * gap * (total - i),
        rotateY: factor * tilt * (total - i),
        translateZ: -depth * (total - i),
      });
      innerTransforms.push({
        translateX: Number(
          ((-factor * (total - i) * 2 * innerOffset) / total).toFixed(2)
        ),
      });
    }

    elements.forEach((el, index) => {
      if (index === 0) {
        setObj = transforms[total];
        setInners = innerTransforms[total];
      } else {
        setObj = transforms[index - 1];
        setInners = innerTransforms[index - 1];
      }
      anime.set(el, setObj);
      anime.set(inners[index], setInners);
    });

    transforms.forEach((el, index) => {
      el.delay = watchTime;
      el.duration = duration;
      innerTransforms[index].delay = watchTime;
      innerTransforms[index].duration = duration;
    });

    transforms[total / 2 + 1].easing = "spring(0, 100, 100, 0)";
    innerTransforms[total / 2 + 1].easing = "spring(0, 100, 100, 0)";

    elements.forEach((el, index) => {
      firstHalf = transforms.slice(0, index);
      secHalf = transforms.slice(index, total + 1);
      firstHalf.forEach((el) => secHalf.push(el));
      tl.add(
        {
          targets: el,
          keyframes: secHalf,
        },
        0
      );
      innerFH = innerTransforms.slice(0, index);
      innerSH = innerTransforms.slice(index, total + 1);
      innerFH.forEach((el) => innerSH.push(el));
      tl.add(
        {
          targets: inners[index],
          keyframes: innerSH,
        },
        0
      );
    });
  });
});
</script>
<style lang="scss">
$perspective: 800px;
$bg: #e6e6e6;
$offset: 30px;
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: $bg;
}
.wrapper {
  width: 300px;
  height: 400px;
  perspective: $perspective;
  transform-style: preserve-3d;
}
.txt {
  text-align: center;
  font-family: "Helvetica", sans-serif;
  font-size: 16px;
  color: darken($bg, 40%);
}
.rotating-cards {
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
}
.rotating-cards__el {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 20px;
  box-shadow: 0 0 30px -10px rgba(#000, 1);
}
</style>
