<template>
  <canvas ref="canvas-ref"></canvas>
  <div></div>
</template>
<script lang="ts" setup>
import type { BridgeValues } from '@/bridge_values';
import { cetaneryCurve, findLowestPoint } from '@/cetanery_curve';
import { onMounted, ref, useTemplateRef, watch } from 'vue';

const canvas = useTemplateRef<HTMLCanvasElement>('canvas-ref');
const cfx = ref<CanvasRenderingContext2D | null>();
// import type BridgeValues
const values = ref<BridgeValues>({
  a: 10,
  x0: 35,
  y0: -10,
});

watch(values, () => {}, { deep: true });

// function drawLine(cfx: CanvasRenderingContext2D, values: BridgeValues) {
//   cfx.beginPath()
//   cfx.moveTo(0, values.a * Math.cosh(0) - values.y0)
//   for (let i = 1; i < 70; i++) {
//     cfx.lineTo(i, values.a * Math.cosh((i - values.x0) / values.a))
//   }
//   cfx.closePath()
// }

function drawGrid(
  canvas: HTMLCanvasElement,
  cellSize: number,
  a: number,
  P0: { x: number; y: number },
  P1: { x: number; y: number },
  P2: { x: number; y: number },
) {
  const cfx = canvas.getContext('2d');
  if (cfx == null) {
    return;
  }

  const xStart = P1.x;
  const xEnd = P2.x;
  const yStart = (P1.y > P2.y ? P1.y : P2.y) + 1;
  const yEnd = Math.round(P0.y - a) - 1;

  console.log(xStart);
  console.log(xEnd);
  console.log(yStart);
  console.log(yEnd);

  canvas.height = (yStart - yEnd) * cellSize;
  canvas.width = (xEnd - xStart) * cellSize;
  cfx.moveTo(0, 0);
  for (let i = xStart; i <= xEnd; i++) {
    for (let j = yStart; j >= yEnd; j--) {}
  }

  // cfx.value.moveTo(0, 0);
}

onMounted(() => {
  cfx.value = canvas.value!.getContext('2d');

  const a = 20;
  const P1 = { x: 0, y: 10 };
  const P2 = { x: 30, y: 20 };
  const lowestPoint = findLowestPoint(a, P1.x, P1.y, P2.x, P2.y);
  drawGrid(canvas.value!, 10, a, lowestPoint, P1, P2);
  console.log(lowestPoint);
  for (let i = P1.x; i <= P2.x; i++) {
    console.log(
      `x: ${i}, y: ${Math.round(cetaneryCurve(i, a, lowestPoint.x, lowestPoint.y) * 2) / 2}`,
    );
  }
});
</script>
<style></style>
