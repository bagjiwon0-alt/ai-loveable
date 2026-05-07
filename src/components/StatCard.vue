<script setup>
defineProps({
  label: String,
  value: [String, Number],
  icon: String,
  color: { type: String, default: 'primary' }
})
const palette = {
  primary:  { bg: '#eef2ff', fg: '#4f46e5' },
  success:  { bg: '#d1fae5', fg: '#10b981' },
  danger:   { bg: '#fee2e2', fg: '#ef4444' },
  warning:  { bg: '#fef3c7', fg: '#f59e0b' }
}
</script>

<template>
  <div class="stat-card d-flex align-items-center gap-3">
    <div class="stat-icon" :style="{ background: palette[color].bg, color: palette[color].fg }">
      <i :class="icon"></i>
    </div>
    <div>
      <div class="stat-label">{{ label }}</div>
      <div class="stat-value">{{ value }}</div>
    </div>
  </div>
</template>
