<script setup>
// Google Charts 래퍼 (loader.js 동적 로딩)
import { ref, onMounted, watch, nextTick } from 'vue'

const props = defineProps({
  type: { type: String, required: true }, // 'PieChart', 'ColumnChart', 'LineChart' ...
  data: { type: Array, required: true },
  options: { type: Object, default: () => ({}) },
  height: { type: String, default: '320px' }
})

const chartEl = ref(null)
let chartInstance = null
let googleLoaded = false

const loadGoogle = () => new Promise((resolve) => {
  if (window.google && window.google.charts) {
    window.google.charts.load('current', { packages: ['corechart', 'bar', 'line'], language: 'ko' })
    window.google.charts.setOnLoadCallback(resolve)
    return
  }
  const script = document.createElement('script')
  script.src = 'https://www.gstatic.com/charts/loader.js'
  script.onload = () => {
    window.google.charts.load('current', { packages: ['corechart', 'bar', 'line'], language: 'ko' })
    window.google.charts.setOnLoadCallback(resolve)
  }
  document.head.appendChild(script)
})

const draw = () => {
  if (!googleLoaded || !chartEl.value || !props.data.length) return
  const dataTable = window.google.visualization.arrayToDataTable(props.data)
  chartInstance = new window.google.visualization[props.type](chartEl.value)
  chartInstance.draw(dataTable, props.options)
}

onMounted(async () => {
  await loadGoogle()
  googleLoaded = true
  await nextTick()
  draw()
  window.addEventListener('resize', draw)
})

watch(() => [props.data, props.options], () => draw(), { deep: true })
</script>

<template>
  <div ref="chartEl" :style="{ width: '100%', height }"></div>
</template>
