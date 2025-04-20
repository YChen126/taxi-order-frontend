import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import OrderDetail from '../views/OrderDetail.vue'

const routes = [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    { path: '/home', component: Home },
    { path: '/order/:id', component: OrderDetail,
      name: 'OrderDetail',  
      props: route => ({ id: Number(route.params.id), order: route.params.order }) 
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router