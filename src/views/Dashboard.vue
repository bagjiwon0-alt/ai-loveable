<script setup>
import { onMounted, computed } from 'vue'
import { useTransactionStore } from '../stores/transaction'
import StatCard from '../components/StatCard.vue'
import GoogleChart from '../components/GoogleChart.vue'

const store = useTransactionStore()

onMounted(() => {
  if (!store.transactions.length) store.fetchTransactions()
  if (!store.categories.length) store.fetchCategories()
})

const fmt = (n) => '₩ ' + Number(n).toLocaleString('ko-KR')

const pieData = computed(() => {
  const rows = [['카테고리', '금액']]
  Object.entries(store.expenseByCategory).forEach(([k, v]) => rows.push([k, v]))
  return rows
})

const trendData = computed(() => {
  const rows = [['월', '수입', '지출']]
  store.monthlyTrend.forEach(m => rows.push([m.month, m.income, m.expense]))
  return rows
})

const paymentData = computed(() => {
  const map = {}
  store.transactions.filter(t => t.type === 'expense').forEach(t => {
    map[t.payment] = (map[t.payment] || 0) + Number(t.amount)
  })
  const rows = [['결제수단', '금액']]
  Object.entries(map).forEach(([k, v]) => rows.push([k, v]))
  return rows
})

const pieOptions = {
  pieHole: 0.55,
  legend: { position: 'right', textStyle: { fontSize: 12 } },
  chartArea: { width: '90%', height: '85%' },
  colors: ['#4f46e5','#10b981','#f59e0b','#ef4444','#06b6d4','#ec4899','#8b5cf6','#14b8a6','#f97316','#64748b']
}
const trendOptions = {
  legend: { position: 'top' },
  chartArea: { width: '85%', height: '70%' },
  colors: ['#10b981', '#ef4444'],
  curveType: 'function',
  pointSize: 6
}
const barOptions = {
  legend: { position: 'none' },
  chartArea: { width: '75%', height: '80%' },
  colors: ['#4f46e5'],
  bars: 'horizontal'
}
</script>

<template>
  <div>
    <div class="page-header">
      <div>
        <h1><i class="fa-solid fa-chart-line text-primary"></i> 대시보드</h1>
        <p>전체 자산 현황과 소비 패턴을 한눈에 확인하세요</p>
      </div>
      <button class="btn btn-primary" @click="store.fetchTransactions()">
        <i class="fa-solid fa-arrows-rotate"></i> 새로고침
      </button>
    </div>

    <div v-if="store.loading" class="text-center py-5">
      <div class="spinner-border text-primary"></div>
    </div>

    <div v-else-if="store.error" class="alert alert-danger">
      <i class="fa-solid fa-triangle-exclamation"></i> {{ store.error }} — json-server가 실행 중인지 확인하세요 (npm run server)
    </div>

    <template v-else>
      <!-- Stat Cards -->
      <div class="row g-3 mb-4">
        <div class="col-md-6 col-lg-3">
          <StatCard label="잔액" :value="fmt(store.balance)" icon="fa-solid fa-wallet" color="primary" />
        </div>
        <div class="col-md-6 col-lg-3">
          <StatCard label="총 수입" :value="fmt(store.totalIncome)" icon="fa-solid fa-arrow-trend-up" color="success" />
        </div>
        <div class="col-md-6 col-lg-3">
          <StatCard label="총 지출" :value="fmt(store.totalExpense)" icon="fa-solid fa-arrow-trend-down" color="danger" />
        </div>
        <div class="col-md-6 col-lg-3">
          <StatCard label="거래 건수" :value="store.transactions.length + ' 건'" icon="fa-solid fa-receipt" color="warning" />
        </div>
      </div>

      <!-- Charts -->
      <div class="row g-3 mb-4">
        <div class="col-lg-8">
          <div class="card-panel">
            <h5><i class="fa-solid fa-chart-line text-primary"></i> 월별 수입 / 지출 추이</h5>
            <GoogleChart type="LineChart" :data="trendData" :options="trendOptions" height="340px" />
          </div>
        </div>
        <div class="col-lg-4">
          <div class="card-panel">
            <h5><i class="fa-solid fa-chart-pie text-primary"></i> 카테고리별 지출</h5>
            <GoogleChart type="PieChart" :data="pieData" :options="pieOptions" height="340px" />
          </div>
        </div>
      </div>

      <div class="row g-3">
        <div class="col-lg-5">
          <div class="card-panel">
            <h5><i class="fa-solid fa-credit-card text-primary"></i> 결제수단별 지출</h5>
            <GoogleChart type="BarChart" :data="paymentData" :options="barOptions" height="280px" />
          </div>
        </div>
        <div class="col-lg-7">
          <div class="card-panel">
            <div class="d-flex justify-content-between align-items-center mb-3">
              <h5 class="mb-0"><i class="fa-solid fa-clock-rotate-left text-primary"></i> 최근 거래</h5>
              <RouterLink to="/transactions" class="btn btn-sm btn-outline-primary">전체 보기</RouterLink>
            </div>
            <div class="table-responsive">
              <table class="table table-hover">
                <thead>
                  <tr>
                    <th>구분</th><th>카테고리</th><th>내용</th><th class="text-end">금액</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="t in store.recentTransactions" :key="t.id">
                    <td>
                      <span class="badge" :class="t.type === 'income' ? 'badge-income' : 'badge-expense'">
                        <i :class="t.type === 'income' ? 'fa-solid fa-plus' : 'fa-solid fa-minus'"></i>
                        {{ t.type === 'income' ? '수입' : '지출' }}
                      </span>
                    </td>
                    <td>{{ t.category }}</td>
                    <td class="text-muted small">{{ t.description }}</td>
                    <td class="text-end" :class="t.type === 'income' ? 'amount-income' : 'amount-expense'">
                      {{ t.type === 'income' ? '+' : '-' }}{{ fmt(t.amount).replace('₩ ', '') }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
