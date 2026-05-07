<script setup>
import { onMounted, ref, computed } from 'vue'
import { useTransactionStore } from '../stores/transaction'

const store = useTransactionStore()
const filterType = ref('all')
const search = ref('')

onMounted(() => {
  if (!store.transactions.length) store.fetchTransactions()
})

const filtered = computed(() => {
  return store.transactions
    .filter(t => filterType.value === 'all' || t.type === filterType.value)
    .filter(t => !search.value || t.description.includes(search.value) || t.category.includes(search.value))
    .sort((a, b) => b.date.localeCompare(a.date))
})

const fmt = (n) => Number(n).toLocaleString('ko-KR')
const fmtDate = (d) => new Date(d).toLocaleString('ko-KR', { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })

const handleDelete = async (id) => {
  if (confirm('이 거래를 삭제하시겠습니까?')) await store.deleteTransaction(id)
}
</script>

<template>
  <div>
    <div class="page-header">
      <div>
        <h1><i class="fa-solid fa-list-ul text-primary"></i> 거래 내역</h1>
        <p>총 {{ filtered.length }}건의 거래</p>
      </div>
      <RouterLink to="/add" class="btn btn-primary">
        <i class="fa-solid fa-plus"></i> 거래 추가
      </RouterLink>
    </div>

    <div class="card-panel">
      <div class="row g-2 mb-3">
        <div class="col-md-8">
          <div class="input-group">
            <span class="input-group-text bg-white"><i class="fa-solid fa-magnifying-glass"></i></span>
            <input v-model="search" type="text" class="form-control" placeholder="카테고리 또는 내용 검색..." />
          </div>
        </div>
        <div class="col-md-4">
          <select v-model="filterType" class="form-select">
            <option value="all">전체</option>
            <option value="income">수입만</option>
            <option value="expense">지출만</option>
          </select>
        </div>
      </div>

      <div class="table-responsive">
        <table class="table table-hover align-middle">
          <thead>
            <tr>
              <th>날짜</th><th>구분</th><th>카테고리</th><th>내용</th><th>결제</th>
              <th class="text-end">금액</th><th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="t in filtered" :key="t.id">
              <td class="small text-muted">{{ fmtDate(t.date) }}</td>
              <td>
                <span class="badge" :class="t.type === 'income' ? 'badge-income' : 'badge-expense'">
                  {{ t.type === 'income' ? '수입' : '지출' }}
                </span>
              </td>
              <td>{{ t.category }}</td>
              <td>{{ t.description }}</td>
              <td><small class="text-muted"><i class="fa-solid fa-credit-card"></i> {{ t.payment }}</small></td>
              <td class="text-end" :class="t.type === 'income' ? 'amount-income' : 'amount-expense'">
                {{ t.type === 'income' ? '+' : '-' }}₩{{ fmt(t.amount) }}
              </td>
              <td>
                <button class="btn btn-sm btn-outline-danger" @click="handleDelete(t.id)">
                  <i class="fa-solid fa-trash"></i>
                </button>
              </td>
            </tr>
            <tr v-if="!filtered.length"><td colspan="7" class="text-center text-muted py-4">검색 결과가 없습니다</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
