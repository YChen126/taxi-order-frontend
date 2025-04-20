<script setup>
import { ref , computed} from 'vue'

const orders = ref([
    {id: 1, start:'桃園高鐵', end: '男9舍', time:'17:00'},
    {id: 2, start:'桃園高鐵', end: '男9舍', time:'17:00'},
    {id: 3, start:'桃園高鐵', end: '男9舍', time:'17:00'},
])

//control funciton for create order
const showForm = ref(false)
const newOrder = ref({
    start: '',
    end: '',
    time: '',
})

function addOrder() {
    if (!newOrder.value.start || !newOrder.value.end || !newOrder.value.time) {
        alert('填寫完整資料')
        return
    }

    orders.value.push({
        id: Date.now(),
        ...newOrder.value,
    })

    newOrder.value = { start: '', end: '', time: '' }
    showForm.value = false
}

//filter in navbar
const selectedStart = ref('')

const uniqueStartPoints = computed(() => {
    const points = orders.value.map(order => order.start)
    return [...new Set(points)]
})

const filteredOrders = computed(() => {
    if(!selectedStart.value) return orders.value
    return orders.value.filter(order => order.start === selectedStart.value)
})

</script>

<template>
    <div class="home">
        <h2>OrderList</h2>

        <!-- navbar -->
         <div class="navbar">
            <label for="start">起點:</label>
            <select v-model="selectedStart" id="start">
                <option value="">全部</option>
                <option v-for="loc in uniqueStartPoints" :key="loc" :value="loc">
                    {{ loc }}
                </option>
            </select>
         </div>

        <button @click="showForm = !showForm">
            {{ showForm ? 'Cancel Order' : 'Create Order' }}
        </button>

        <!-- Order form -->
         <div v-if="showForm" class="order-form">
            <input type="text" v-model="newOrder.start" placeholder="起點">
            <input type="text" v-model="newOrder.end" placeholder="終點">
            <input type="text" v-model="newOrder.time" placeholder="搭車時間">
            <button @click="addOrder">建立訂單</button>
         </div>

        <div v-for="order in filteredOrders" :key="order.id" class="order-card">
            <p>
                <strong>起點:</strong> {{order.start}}
                <strong>終點:</strong> {{order.end}}
                <strong>搭車時間:</strong> {{order.time}}
            </p>
            <router-link   :to="`/order/${order.id}`">
                訂單詳情
            </router-link>
        </div>
    </div>
</template>

<style scoped>
    .home {
        padding: 16px;
    }

    .navbar {
        margin-bottom: 16px;
    }

    .order-card {
        border: 1px solid #ccc;
        padding: 10px;
        margin-bottom: 12px;
        border-radius: 8px;
        background-color: #f9f9f9;
    }

    .order-form {
        margin: 16px 0;
        display: flex;
        flex-direction: column;
        gap: 8px;
    }
</style>