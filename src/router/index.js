import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/front/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/front/AboutView.vue')
  },
  {
    path: '/login',
    component: () => import('../views/front/LoginForm.vue')
  },
  {
    path: '/dashboard',
    component: () => import('../views/admin/DashBoard.vue'),
    children: [
      {
        path: 'productComponent',
        component: () => import('../views/admin/ProductComponent.vue')
      },
      {
        path: 'orders',
        component: () => import('../views/admin/Orders.vue')
      },
      {
        path: 'coupons',
        component: () => import('../views/admin/Coupons.vue')
      }
    ]
  },
  {
    path: '/user',
    component: () => import('../views/front/UserBoard.vue'),
    children: [
      {
        path: 'shopping',
        name: 'user-shopping', // 提供分頁使用
        component: () => import('../views/front/UserShopping.vue')
      },
      {
        path: 'cart',
        component: () => import('../views/front/UserCart.vue')
      },
      {
        path: 'product/:productId',
        component: () => import('../views/front/UserProduct.vue')
      },
      {
        path: 'form',
        component: () => import('../views/front/UserForm.vue')
      },
      {
        path: 'checkout/:orderId',
        component: () => import('../views/front/UserCheckOut.vue')
      },
      {
        path: 'favorites',
        component: () => import('../views/front/Favorites.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  linkActiveClass: 'active',
  routes
})

export default router
