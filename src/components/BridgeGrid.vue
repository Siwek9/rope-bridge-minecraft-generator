<template>
  <canvas ref="canvas-ref"></canvas>
  <div>nigger</div>
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

// function chainFunction(x: number, a: number, x0: number, y0: number) {}

// function drawLine(cfx: CanvasRenderingContext2D, values: BridgeValues) {
//   cfx.beginPath()
//   cfx.moveTo(0, values.a * Math.cosh(0) - values.y0)
//   for (let i = 1; i < 70; i++) {
//     cfx.lineTo(i, values.a * Math.cosh((i - values.x0) / values.a))
//   }
//   cfx.closePath()
// }

// function cetaneryCurve(a: number, x1: number, y1: number, x2: number, y2: number): number {
//   return 0
// }

onMounted(() => {
  cfx.value = canvas.value!.getContext('2d');
  // console.log('dupa');
  // console.log(cetaneryCurve(10, 20, 23, 5));
  // console.log(findLowestPoint(66, 0, 10, 70, 0));
  const a = 10;
  const P1 = { x: 0, y: 10 };
  const P2 = { x: 30, y: 0 };
  // const P1 = [0, 10];
  // const P2 = [70, 0];
  const lowestPoint = findLowestPoint(a, P1.x, P1.y, P2.x, P2.y);
  for (let i = P1.x; i <= P2.x; i++) {
    console.log(
      `x: ${i}, y: ${Math.round(cetaneryCurve(i, a, lowestPoint[0], lowestPoint[1]) * 2) / 2}`,
    );
  }
});
</script>
<style></style>
