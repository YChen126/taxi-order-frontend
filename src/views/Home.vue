<script setup>
import { ref , computed} from 'vue'
import Navbar from '@/component/Navbar.vue'
import OrderCard from '@/component/OrderCard.vue'
import { useOrderStore } from '@/stores/orderStore'

const orderStore = useOrderStore()
const orders =  computed(() => orderStore.orders)

// create order
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

    orderStore.addOrder(newOrder.value)
    newOrder.value = { start: '', end: '', time: '' }
    showForm.value = false
}

// filter
const selectFilter = ref({
    start: '',
    end: '',
    time: '',
})

const selectedStart = computed(() => selectFilter.value.start)
const selectedEnd = computed(() => selectFilter.value.end)
const selectedTime = computed(() => selectFilter.value.time)

const uniqueStartPoints = computed(() => {
    if (!orders.value) return []
    return [...new Set(orders.value.map(order => order.start))]
})

const uniqueEndPoints = computed(() => {
    if (!orders.value) return []
    return [...new Set(orders.value.map(order => order.end))]
})

const uniqueTimes = computed(() => {
    if (!orders.value) return []
    return [...new Set(orders.value.map(order => order.time))]
})

const filteredOrders = computed(() => {
    if (!orders.value) return []
    
    return orders.value.filter(order => {
        const matchStart = !selectedStart.value || order.start === selectedStart.value
        const matchEnd = !selectedEnd.value || order.end === selectedEnd.value
        const matchTime = !selectedTime.value || order.time === selectedTime.value
        return matchStart && matchEnd && matchTime
    })
})

</script>

<template>
    <div class="home">
        <h2>OrderList</h2>

        <!-- navbar -->
        <Navbar
            v-model="selectFilter"
            :startOptions="uniqueStartPoints"
            :endOptions="uniqueEndPoints"
            :timeOptions="uniqueTimes"
        ></Navbar>

        <!-- create order -->
        <button @click="showForm = !showForm">
            {{ showForm ? 'Cancel Order' : 'Create Order' }}
        </button>

        <!-- create order form -->
         <div v-if="showForm" class="order-form">
            <input type="text" v-model="newOrder.start" placeholder="起點">
            <input type="text" v-model="newOrder.end" placeholder="終點">
            <input type="text" v-model="newOrder.time" placeholder="搭車時間">
            <button @click="addOrder">建立訂單</button>
         </div>

        <!-- show the result -->
        <OrderCard
            v-for="order in filteredOrders"
            :key="order.id"
            :order="order"
        ></OrderCard>
    </div>
</template>

<style scoped>
    .home {
        padding: 16px;
    }

    .order-form {
        margin: 16px 0;
        display: flex;
        flex-direction: column;
        gap: 8px;
    }
</style>