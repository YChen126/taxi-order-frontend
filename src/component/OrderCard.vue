<script setup>

import { defineProps } from 'vue';

const props = defineProps({
    order: Object
})

</script>

<template>
    <div class="order-card">
        <p>
            <strong>起點:</strong> {{order.start}}
            <strong>終點:</strong> {{order.end}}
            <strong>搭車時間:</strong> {{order.time}}
        </p>
        <router-link
        :to="{ 
            name: 'OrderDetail',
            params: { id: order.id },
            query: {
                start: order.start,
                end: order.end,
                time: order.time
            }
        }"> 訂單詳情
        </router-link>
    </div>
</template>

<style scoped>
    .order-card {
        border: 1px solid #ccc;
        padding: 10px;
        margin-bottom: 12px;
        border-radius: 8px;
        background-color: #f9f9f9;
    }
</style>