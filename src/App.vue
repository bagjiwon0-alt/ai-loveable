<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="app-shell">
    <aside class="sidebar">
      <div class="brand">
        <i class="fa-solid fa-wallet brand-icon"></i>
        <div>
          <div class="brand-title">MoneyBook</div>
          <div class="brand-sub">Smart Ledger</div>
        </div>
      </div>
      <nav class="nav flex-column gap-1">
        <RouterLink to="/" class="nav-link" active-class="active" exact-active-class="active">
          <i class="fa-solid fa-chart-pie"></i> 대시보드
        </RouterLink>
        <RouterLink to="/transactions" class="nav-link" active-class="active">
          <i class="fa-solid fa-list-ul"></i> 거래 내역
        </RouterLink>
        <RouterLink to="/add" class="nav-link" active-class="active">
          <i class="fa-solid fa-plus-circle"></i> 거래 추가
        </RouterLink>
      </nav>
      <div class="sidebar-footer">
        <i class="fa-solid fa-circle-info"></i> Vue 3 · Pinia · Bootstrap 5
      </div>
    </aside>
    <main class="main-content">
      <RouterView />
    </main>
  </div>
</template>
