<script setup>

import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const orders = [
    { id: 1, start: '行政大樓', end: '男宿', time: '17:00' },
    { id: 2, start: '圖書館', end: '體育館', time: '17:30' },
    { id: 3, start: '女宿', end: '後門', time: '18:00' },
]

const orderId = Number(route.params.id)

const order = orders.find(o => o.id === orderId)
</script>

<template>
    <div class="order-detail"> 
        <h2>訂單詳細資訊</h2>

        <div v-if="order">
            <p><strong>出發地:</strong> {{ order.start }}</p>
            <p><strong>目的地:</strong> {{ order.end }}</p>
            <p><strong>搭車時間:</strong> {{ order.time }}</p>
        </div>
        <div v-else>
            <p>⚠️ 找不到此訂單。</p>
        </div>

        <router-link to="/home">
            <button>返回首頁</button>
        </router-link>
    </div>
</template>

<style scoped>
    .order-detail {
        padding: 16px;
    }
</style>