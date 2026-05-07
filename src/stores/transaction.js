import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from './api'

export const useTransactionStore = defineStore('transaction', () => {
  // state
  const transactions = ref([])
  const categories = ref([])
  const loading = ref(false)
  const error = ref(null)

  // getters
  const totalIncome = computed(() =>
    transactions.value.filter(t => t.type === 'income').reduce((s, t) => s + Number(t.amount), 0)
  )
  const totalExpense = computed(() =>
    transactions.value.filter(t => t.type === 'expense').reduce((s, t) => s + Number(t.amount), 0)
  )
  const balance = computed(() => totalIncome.value - totalExpense.value)

  const expenseByCategory = computed(() => {
    const map = {}
    transactions.value.filter(t => t.type === 'expense').forEach(t => {
      map[t.category] = (map[t.category] || 0) + Number(t.amount)
    })
    return map
  })

  const monthlyTrend = computed(() => {
    const map = {}
    transactions.value.forEach(t => {
      const ym = t.date.slice(0, 7)
      if (!map[ym]) map[ym] = { income: 0, expense: 0 }
      map[ym][t.type] += Number(t.amount)
    })
    return Object.keys(map).sort().map(k => ({ month: k, ...map[k] }))
  })

  const recentTransactions = computed(() =>
    [...transactions.value].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 8)
  )

  // actions — axios 로 json-server 호출
  const fetchTransactions = async () => {
    loading.value = true
    error.value = null
    try {
      const { data } = await api.get('/transactions')
      transactions.value = data
    } catch (e) {
      error.value = e.message
    } finally {
      loading.value = false
    }
  }

  const fetchCategories = async () => {
    try {
      const { data } = await api.get('/categories')
      categories.value = data
    } catch (e) {
      error.value = e.message
    }
  }

  const addTransaction = async (payload) => {
    const { data } = await api.post('/transactions', payload)
    transactions.value.unshift(data)
    return data
  }

  const deleteTransaction = async (id) => {
    await api.delete(`/transactions/${id}`)
    transactions.value = transactions.value.filter(t => t.id !== id)
  }

  return {
    transactions, categories, loading, error,
    totalIncome, totalExpense, balance,
    expenseByCategory, monthlyTrend, recentTransactions,
    fetchTransactions, fetchCategories, addTransaction, deleteTransaction
  }
})
