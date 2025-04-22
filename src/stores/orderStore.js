import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useOrderStore = defineStore('orderStore', () => {
    const orders = ref([
        { id: 1, start: '桃園高鐵', end: '男9舍', time: '17:00' },
        { id: 2, start: '桃園高鐵', end: '男9舍', time: '17:00' },
    ])

    function addOrder(order) {
        orders.value.push({id: Date.now(), ...order})
    }

    return { orders, addOrder }
})