<script setup>

import {ref} from 'vue'
import { useRouter } from 'vue-router';

const router = useRouter()
const role = ref('')
const name = ref('')

function login() {
    if (!role.value || !name.value) {
        alert('請填寫完整資訊')
        return
    }
    router.push('/home')
}

</script>

<template>
    <div class="login-container">
        <h2>Login</h2>
        <label>
            <input type="radio" value="passenger"v-model="role">
            Passenger
        </label>
        <label>
            <input type="radio" value="driver"v-model="role">
            driver
        </label>
        <br><br>

        <input type="text" v-model="name" placeholder="please enter your name">
        <button @click="login">Login</button>
    </div>
</template>


<style scoped>
    .login-container {
        display: flex;
        flex-direction: column;
        max-width: 300px;
        margin: auto;
    }
</style>