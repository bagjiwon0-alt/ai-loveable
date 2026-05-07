# 💰 스마트 가계부 대시보드

> Vue 3 (Composition API) + Pinia + Bootstrap 5 + Google Charts로 만든 **고성능 가계부 SPA**

![Vue3](https://img.shields.io/badge/Vue-3-4FC08D?style=flat&logo=vue.js)
![Pinia](https://img.shields.io/badge/Pinia-State%20Management-221E0F?style=flat)
![Bootstrap5](https://img.shields.io/badge/Bootstrap-5-7952B3?style=flat&logo=bootstrap)
![License](https://img.shields.io/badge/License-MIT-green?style=flat)

---

## 📋 목차
- [✨ 주요 기능](#-주요-기능)
- [🛠 기술 스택](#-기술-스택)
- [📁 폴더 구조](#-폴더-구조)
- [🚀 시작하기](#-시작하기)
- [📡 API 엔드포인트](#-api-엔드포인트)
- [💻 주요 코드](#-주요-코드)
- [📸 실행 화면](#-실행-화면)
- [🎯 개발 예정](#-개발-예정)

---

## ✨ 주요 기능

| 기능 | 설명 | 아이콘 |
|------|------|--------|
| 📊 **대시보드** | 월별 수입/지출 요약, 실시간 통계 및 차트 분석 | 📊 |
| 💳 **거래 관리** | 거래 내역 CRUD, 검색/필터링, 카테고리별 분류 | 💳 |
| 📈 **차트 분석** | Google Charts를 이용한 파이/라인/바 차트 시각화 | 📈 |
| 🔍 **검색 & 필터** | 날짜, 카테고리, 금액별 거래 내역 검색 | 🔍 |
| ⚡ **실시간 업데이트** | Pinia 스토어로 모든 컴포넌트 실시간 반영 | ⚡ |

---

## 🛠 기술 스택

### Frontend
| 기술 | 버전 | 용도 |
|-----|------|------|
| **Vue 3** | ^3.x | UI 프레임워크 (Composition API, `<script setup>`) |
| **Pinia** | ^2.x | 상태 관리 (stores/transaction.js) |
| **Vite** | ^5.x | 번들러 & 개발 서버 |
| **Bootstrap 5** | ^5.x | CSS 프레임워크 (그리드, 컴포넌트) |
| **Google Charts** | API | 대화형 차트 라이브러리 |
| **Font Awesome 6** | CDN | 아이콘 라이브러리 |

### Backend & Tools
| 기술 | 용도 |
|-----|------|
| **axios** | HTTP 클라이언트 (API 요청) |
| **json-server** | Mock REST API 서버 |
| **json-server-auth** | 인증 미들웨어 (선택사항) |

---

## 📁 폴더 구조

```
ai-loveable/
├── 📄 package.json
├── 📄 vite.config.js
├── 📄 db.json                  # Mock 데이터 (거래 100건)
├── 📄 README.md
├── src/
│   ├── 📄 main.js              # Vue 애플리케이션 진입점
│   ├── 📄 App.vue              # 루트 컴포넌트
│   ├── 📁 assets/
│   │   └── 🎨 main.css         # 글로벌 스타일
│   ├── 📁 router/
│   │   └── 📄 index.js         # Vue Router 설정
│   ├── 📁 stores/              # Pinia 스토어
│   │   ├── 📄 api.js           # axios 인스턴스 (baseURL: json-server)
│   │   └── 📄 transaction.js   # 거래 상태관리 (CRUD)
│   ├── 📁 components/          # 재사용 가능한 컴포넌트
│   │   ├── 📄 StatCard.vue     # 통계 카드
│   │   ├── 📄 GoogleChart.vue  # Google Charts 래퍼
│   │   └── 📄 Navigation.vue   # 네비게이션 바
│   └── 📁 views/               # 페이지 컴포넌트
│       ├── 📄 Dashboard.vue    # 대시보드 (차트 + 통계)
│       ├── 📄 Transactions.vue # 거래 목록 (CRUD)
│       └── 📄 AddTransaction.vue # 거래 추가
└── 📁 public/                  # 정적 파일
```

---

## 🚀 시작하기

### 📦 설치

```bash
# 1️⃣ 프로젝트 클론
git clone https://github.com/bagjiwon0-alt/ai-loveable.git
cd ai-loveable

# 2️⃣ 의존성 설치
npm install
```

### ▶️ 실행

```bash
# 🔥 json-server와 Vite 동시 실행 (추천)
npm start

# 또는 각각 터미널에서 실행
npm run server   # 터미널 1: http://localhost:3001
npm run dev      # 터미널 2: http://localhost:5173
```

### 📋 npm Scripts

| 명령어 | 설명 |
|--------|------|
| `npm start` | json-server + Vite 동시 실행 (concurrently) |
| `npm run dev` | Vite 개발 서버 시작 |
| `npm run server` | json-server 시작 (포트 3001) |
| `npm run build` | 프로덕션 빌드 |
| `npm run preview` | 빌드된 결과 미리보기 |

---

## 📡 API 엔드포인트

### json-server 기본 설정
- **Base URL**: `http://localhost:3001`
- **Mock 데이터**: `db.json` (초기 거래 100건)

### 엔드포인트

| 메서드 | 경로 | 설명 | 요청/응답 |
|--------|------|------|----------|
| **GET** | `/transactions` | 모든 거래 조회 | 배열 반환 |
| **GET** | `/transactions/:id` | 특정 거래 조회 | 거래 객체 반환 |
| **POST** | `/transactions` | 새 거래 추가 | 생성된 객체 반환 |
| **PUT** | `/transactions/:id` | 거래 수정 | 수정된 객체 반환 |
| **DELETE** | `/transactions/:id` | 거래 삭제 | 삭제 확인 |
| **GET** | `/categories` | 카테고리 목록 | 배열 반환 |

### 요청 예시

```bash
# 📥 거래 조회
curl http://localhost:3001/transactions

# ➕ 거래 추가
curl -X POST http://localhost:3001/transactions \
  -H "Content-Type: application/json" \
  -d '{
    "date": "2026-05-07",
    "category": "식비",
    "amount": 25000,
    "description": "점심 식사",
    "type": "expense"
  }'

# 🗑️ 거래 삭제
curl -X DELETE http://localhost:3001/transactions/1
```

---

## 💻 주요 코드

### 1️⃣ Pinia 스토어 (상태 관리)

```javascript
// src/stores/transaction.js
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import api from './api';

export const useTransactionStore = defineStore('transaction', () => {
  const transactions = ref([]);
  const loading = ref(false);
  const error = ref(null);

  // 📥 거래 목록 조회
  const fetchTransactions = async () => {
    loading.value = true;
    try {
      const { data } = await api.get('/transactions');
      transactions.value = data;
      error.value = null;
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  // ➕ 거래 추가
  const addTransaction = async (transaction) => {
    try {
      const { data } = await api.post('/transactions', transaction);
      transactions.value.push(data);
      return data;
    } catch (err) {
      error.value = err.message;
      throw err;
    }
  };

  // 🗑️ 거래 삭제
  const deleteTransaction = async (id) => {
    try {
      await api.delete(`/transactions/${id}`);
      transactions.value = transactions.value.filter(t => t.id !== id);
    } catch (err) {
      error.value = err.message;
      throw err;
    }
  };

  // 📊 월별 지출 계산
  const monthlyExpenses = computed(() => {
    return transactions.value
      .filter(t => t.type === 'expense')
      .reduce((acc, t) => {
        const month = new Date(t.date).toLocaleString('ko-KR', { year: 'numeric', month: '2-digit' });
        acc[month] = (acc[month] || 0) + t.amount;
        return acc;
      }, {});
  });

  return {
    transactions,
    loading,
    error,
    fetchTransactions,
    addTransaction,
    deleteTransaction,
    monthlyExpenses,
  };
});
```

### 2️⃣ axios API 인스턴스

```javascript
// src/stores/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터
api.interceptors.request.use(
  (config) => {
    console.log('📤 API 요청:', config.url);
    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터
api.interceptors.response.use(
  (response) => {
    console.log('📥 API 응답:', response.status);
    return response;
  },
  (error) => {
    console.error('❌ API 오류:', error.message);
    return Promise.reject(error);
  }
);

export default api;
```

### 3️⃣ 대시보드 Vue 컴포넌트

```vue
<!-- src/views/Dashboard.vue -->
<template>
  <div class="dashboard">
    <h1 class="mb-4">📊 대시보드</h1>

    <!-- 통계 카드 -->
    <div class="row mb-4">
      <div class="col-md-3">
        <StatCard 
          title="총 수입" 
          :amount="totalIncome" 
          color="success"
          icon="fa-arrow-up"
        />
      </div>
      <div class="col-md-3">
        <StatCard 
          title="총 지출" 
          :amount="totalExpense" 
          color="danger"
          icon="fa-arrow-down"
        />
      </div>
      <div class="col-md-3">
        <StatCard 
          title="순 수익" 
          :amount="netIncome" 
          color="primary"
          icon="fa-wallet"
        />
      </div>
      <div class="col-md-3">
        <StatCard 
          title="거래 건수" 
          :amount="transactions.length" 
          color="info"
          icon="fa-list"
        />
      </div>
    </div>

    <!-- 차트 -->
    <div class="row">
      <div class="col-md-6 mb-4">
        <GoogleChart chart-type="PieChart" :data="categoryData" title="📈 카테고리별 분포" />
      </div>
      <div class="col-md-6 mb-4">
        <GoogleChart chart-type="LineChart" :data="trendData" title="📊 월별 추이" />
      </div>
    </div>

    <!-- 최근 거래 -->
    <div class="recent-transactions">
      <h3 class="mb-3">🕐 최근 거래</h3>
      <table class="table table-hover">
        <thead class="table-dark">
          <tr>
            <th>날짜</th>
            <th>카테고리</th>
            <th>설명</th>
            <th>금액</th>
            <th>유형</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="t in recentTransactions" :key="t.id">
            <td>{{ new Date(t.date).toLocaleDateString('ko-KR') }}</td>
            <td><span class="badge bg-info">{{ t.category }}</span></td>
            <td>{{ t.description }}</td>
            <td :class="t.type === 'income' ? 'text-success' : 'text-danger'">
              {{ t.type === 'income' ? '+' : '-' }} ₩{{ t.amount.toLocaleString() }}
            </td>
            <td>
              <span :class="`badge ${t.type === 'income' ? 'bg-success' : 'bg-danger'}`">
                {{ t.type === 'income' ? '수입' : '지출' }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useTransactionStore } from '../stores/transaction';
import StatCard from '../components/StatCard.vue';
import GoogleChart from '../components/GoogleChart.vue';

const store = useTransactionStore();

// 데이터 로드
onMounted(() => {
  store.fetchTransactions();
});

const { transactions } = store;

// 💰 총 수입
const totalIncome = computed(() => {
  return transactions.value
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
});

// 💸 총 지출
const totalExpense = computed(() => {
  return transactions.value
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
});

// 📈 순 수익
const netIncome = computed(() => totalIncome.value - totalExpense.value);

// 최근 거래 (최신 5건)
const recentTransactions = computed(() => {
  return transactions.value
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);
});

// 📊 카테고리별 데이터 (Google Charts 형식)
const categoryData = computed(() => {
  const categories = {};
  transactions.value.forEach(t => {
    if (t.type === 'expense') {
      categories[t.category] = (categories[t.category] || 0) + t.amount;
    }
  });
  return [
    ['카테고리', '금액'],
    ...Object.entries(categories).map(([k, v]) => [k, v])
  ];
});

// 📈 월별 추이 데이터
const trendData = computed(() => {
  const months = {};
  transactions.value.forEach(t => {
    const month = new Date(t.date).toLocaleString('ko-KR', { year: 'numeric', month: 'short' });
    months[month] = (months[month] || 0) + (t.type === 'income' ? t.amount : -t.amount);
  });
  return [
    ['월', '금액'],
    ...Object.entries(months).map(([k, v]) => [k, v])
  ];
});
</script>

<style scoped>
.dashboard {
  padding: 20px;
}

.recent-transactions {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
}

.table {
  background: white;
}

.badge {
  font-size: 0.85rem;
  padding: 0.4rem 0.6rem;
}
</style>
```

### 4️⃣ StatCard 컴포넌트

```vue
<!-- src/components/StatCard.vue -->
<template>
  <div :class="`card bg-${color} text-white`" style="cursor: pointer; transition: transform 0.2s;">
    <div class="card-body">
      <div class="d-flex justify-content-between align-items-start">
        <div>
          <p class="card-text mb-0 opacity-75">{{ title }}</p>
          <h3 class="card-title mb-0">{{ formatAmount(amount) }}</h3>
        </div>
        <i :class="`fas ${icon}`" style="font-size: 2rem; opacity: 0.8;"></i>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  amount: Number,
  color: String,
  icon: String,
});

const formatAmount = (amount) => {
  return typeof amount === 'number' ? `₩${amount.toLocaleString()}` : amount;
};
</script>

<style scoped>
.card {
  border: none;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
}

.card-body {
  padding: 1.5rem;
}

.card-title {
  font-weight: bold;
  font-size: 1.75rem;
}
</style>
```

---

## 📸 실행 화면

### 🏠 대시보드 화면
```
┌─────────────────────────────────────────────────────────────┐
│ 💰 스마트 가계부 대시보드                         [🏠] [💳] │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ 📈 총 수입   │  │ 📉 총 지출   │  │ 💵 순 수익   │      │
│  │  ₩5,000,000  │  │  ₩2,500,000  │  │  ₩2,500,000  │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│                                                               │
│  ┌─────────────────────┐  ┌─────────────────────┐           │
│  │ 📊 카테고리별 분포   │  │ 📈 월별 추이        │           │
│  │                     │  │                     │           │
│  │   식비 45%  █████   │  │ 5월    ₩800,000     │           │
│  │   교통 25%  ███     │  │ 6월    ₩1,200,000   │           │
│  │   쇼핑 20%  ██      │  │ 7월    ₩950,000     │           │
│  │   기타 10%  █       │  │                     │           │
│  └─────────────────────┘  └─────────────────────┘           │
│                                                               │
│  🕐 최근 거래                                                │
│  ┌──────────┬─────────┬──────────┬──────────┬────────┐     │
│  │ 날짜     │ 카테고리 │ 설명     │ 금액     │ 유형   │     │
│  ├──────────┼─────────┼──────────┼──────────┼────────┤     │
│  │ 2026-05-07│ 식비   │ 점심 식사 │ -25,000  │ 지출   │     │
│  │ 2026-05-06│ 교통   │ 택시요금 │ -15,000  │ 지출   │     │
│  │ 2026-05-05│ 급여   │ 월급    │ +3,000,000│ 수입   │     │
│  └──────────┴─────────┴──────────┴──────────┴────────┘     │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

### 💳 거래 목록 화면
```
┌─────────────────────────────────────────────────────────────┐
│ 💳 거래 내역 관리                                 [검색] [➕]│
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  🔍 검색 및 필터                                            │
│  ┌────────────────────────────────────────────────────┐    │
│  │ 📅 시작일: 2026-05-01   📅 종료일: 2026-05-31    │    │
│  │ 📂 카테고리: [모두 ▼]   💰 금액 범위: ___  ~ ___ │    │
│  │                              [검색] [초기화]       │    │
│  └────────────────────────────────────────────────────┘    │
│                                                               │
│  거래 목록 (총 47건)                                         │
│  ┌──────────┬─────────┬──────────┬──────────┬─────────┐    │
│  │ 날짜     │ 카테고리 │ 설명     │ 금액     │ 작업    │    │
│  ├──────────┼─────────┼──────────┼──────────┼─────────┤    │
│  │ 2026-05-07│ 식비   │ 저녁 식사 │ -35,000  │ [🗑️]   │    │
│  │ 2026-05-06│ 교통   │ 버스 정기권│-80,000  │ [🗑️]   │    │
│  │ 2026-05-05│ 쇼핑   │ 옷 구매  │ -120,000 │ [🗑️]   │    │
│  │ 2026-05-04│ 급여   │ 보너스  │ +500,000 │ [🗑️]   │    │
│  │ 2026-05-03│ 식비   │ 마트 장보기│ -95,000 │ [🗑️]   │    │
│  └──────────┴─────────┴──────────┴──────────┴─────────┘    │
│                                                    [이전] [다음]│
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

### ➕ 거래 추가 화면
```
┌─────────────────────────────────────────────────────────────┐
│ ➕ 새 거래 추가                                              │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  📝 거래 정보                                                │
│  ┌────────────────────────────────────────────────────┐    │
│  │ 📅 날짜 *          [2026-05-07]                   │    │
│  │ 💰 금액 *          [           ]  ₩              │    │
│  │ 📂 카테고리 *       [식비      ▼]                  │    │
│  │ 📝 설명            [                          ]   │    │
│  │ 📋 유형 *           ◉ 수입   ○ 지출              │    │
│  │                                                    │    │
│  │           [저장] [취소]                          │    │
│  └────────────────────────────────────────────────────┘    │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

### 📊 차트 화면 세부
```
┌─────────────────────────────────────────────────────────────┐
│ 📊 카테고리별 지출 분포                                      │
│                                                               │
│                    ╭─────────╮                               │
│                 ╱─────────────────╲                          │
│               ╱         식비         ╲                       │
│              │         45.3%          │                      │
│              │                        │   교통: 25.1%        │
│              │      ╭──────────╮      │   쇼핑: 15.2%        │
│              │    ╱              ╲    │   기타: 14.4%        │
│              │   ╱  교통  쇼핑    ╲   │                      │
│               ╲ ╱                 ╱ ╱                        │
│                ╲─────────────────╱                           │
│                   ╰─────────────╯                            │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

---

## 🎯 개발 예정

- [ ] 🔐 사용자 인증 & 회원가입 (json-server-auth)
- [ ] 📱 반응형 모바일 UI 개선
- [ ] 💾 데이터 내보내기 (CSV, Excel)
- [ ] 📧 월별 리포트 이메일 발송
- [ ] 🎯 예산 설정 & 경고 알림
- [ ] 📊 더 많은 차트 유형 (Histogram, Scatter 등)
- [ ] 🌙 다크 모드
- [ ] 🌐 다국어 지원 (i18n)

---

## 📝 라이센스

MIT License © 2026 bagjiwon0-alt

---

## 👨‍💻 기여

버그 리포트, 기능 제안, PR은 언제든 환영합니다! 🎉

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📞 연락처

- **GitHub**: [@bagjiwon0-alt](https://github.com/bagjiwon0-alt)
- **Issues**: [GitHub Issues](https://github.com/bagjiwon0-alt/ai-loveable/issues)

---

**⭐ 이 프로젝트가 도움이 되었다면 별을 눌러주세요!**
