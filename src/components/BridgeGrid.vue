<template>
  <canvas ref="canvas-ref"></canvas>
</template>
<script lang="ts" setup>
import type { BridgeValues } from '@/bridge_values'
import { onMounted, ref, useTemplateRef, watch } from 'vue'

const canvas = useTemplateRef<HTMLCanvasElement>('canvas-ref')
const cfx = ref<CanvasRenderingContext2D | null>()
// import type BridgeValues
const values = ref<BridgeValues>({
  a: 10,
  x0: 35,
  y0: -10,
})

watch(values, () => {}, { deep: true })

// function chainFunction(x: number, a: number, x0: number, y0: number) {}

function drawLine(cfx: CanvasRenderingContext2D, values: BridgeValues) {
  cfx.beginPath()
  cfx.moveTo(0, values.a * Math.cosh(0) - values.y0)
  for (let i = 1; i < 70; i++) {
    cfx.lineTo(i, values.a * Math.cosh((i - values.x0) / values.a))
  }
  cfx.closePath()
}

onMounted(() => {
  cfx.value = canvas.value!.getContext('2d')
})
</script>
<style></style>
