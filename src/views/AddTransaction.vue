<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useTransactionStore } from '../stores/transaction'

const store = useTransactionStore()
const router = useRouter()

onMounted(() => { if (!store.categories.length) store.fetchCategories() })

const form = ref({
  type: 'expense',
  category: '',
  description: '',
  amount: '',
  payment: '신용카드',
  date: new Date().toISOString().slice(0, 16)
})
const submitting = ref(false)

const filteredCats = computed(() => store.categories.filter(c => c.type === form.value.type))

const submit = async () => {
  if (!form.value.category || !form.value.amount) return
  submitting.value = true
  try {
    await store.addTransaction({
      ...form.value,
      amount: Number(form.value.amount),
      date: new Date(form.value.date).toISOString().slice(0, 19)
    })
    router.push('/transactions')
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <div>
    <div class="page-header">
      <div>
        <h1><i class="fa-solid fa-plus-circle text-primary"></i> 거래 추가</h1>
        <p>새로운 수입 또는 지출 내역을 기록합니다</p>
      </div>
    </div>

    <div class="card-panel" style="max-width: 640px;">
      <form @submit.prevent="submit">
        <div class="mb-3">
          <label class="form-label fw-semibold">거래 유형</label>
          <div class="btn-group w-100" role="group">
            <input type="radio" class="btn-check" id="t-exp" value="expense" v-model="form.type" />
            <label class="btn btn-outline-danger" for="t-exp"><i class="fa-solid fa-minus"></i> 지출</label>
            <input type="radio" class="btn-check" id="t-inc" value="income" v-model="form.type" />
            <label class="btn btn-outline-success" for="t-inc"><i class="fa-solid fa-plus"></i> 수입</label>
          </div>
        </div>

        <div class="row g-3">
          <div class="col-md-6">
            <label class="form-label fw-semibold">카테고리</label>
            <select v-model="form.category" class="form-select" required>
              <option value="" disabled>선택하세요</option>
              <option v-for="c in filteredCats" :key="c.id" :value="c.name">{{ c.name }}</option>
            </select>
          </div>
          <div class="col-md-6">
            <label class="form-label fw-semibold">금액 (₩)</label>
            <input v-model="form.amount" type="number" class="form-control" placeholder="10000" required />
          </div>
          <div class="col-md-6">
            <label class="form-label fw-semibold">결제수단</label>
            <select v-model="form.payment" class="form-select">
              <option>현금</option><option>체크카드</option><option>신용카드</option><option>계좌이체</option>
            </select>
          </div>
          <div class="col-md-6">
            <label class="form-label fw-semibold">날짜 / 시간</label>
            <input v-model="form.date" type="datetime-local" class="form-control" required />
          </div>
          <div class="col-12">
            <label class="form-label fw-semibold">내용</label>
            <input v-model="form.description" type="text" class="form-control" placeholder="예: 점심 회식" />
          </div>
        </div>

        <div class="d-flex gap-2 mt-4">
          <button type="submit" class="btn btn-primary" :disabled="submitting">
            <i class="fa-solid fa-check"></i> {{ submitting ? '저장 중...' : '저장' }}
          </button>
          <RouterLink to="/transactions" class="btn btn-outline-secondary">취소</RouterLink>
        </div>
      </form>
    </div>
  </div>
</template>
