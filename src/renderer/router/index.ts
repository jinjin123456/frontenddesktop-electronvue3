import { createRouter, createWebHistory } from 'vue-router'
const Home = () => import('@renderer/views/Home/index.vue')
// 静态导入 当打包构建应用时，JavaScript 包会变得非常大，影响页面加载
// import MapTask from '@renderer/views/MapTask/index.vue'
// 推荐动态导入，路由懒加载 把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样就会更加高效
const MapTask = () => import('@renderer/views/MapTask/index.vue')
/*
想把某个路由下的所有组件都打包在同个异步块 (chunk) 中,可把组件按组分块
* webpack中，使用注释语法 webpackChunkName: "group-user"
* vite中，配置rollupOptions
*/
const UIForm = () => import('@renderer/views/home/pages/UI/form.vue')

const router = createRouter({
  // history: createWebHistory(import.meta.env.BASE_URL),
  history: createWebHistory(),
  routes: [
    // {
    //   path: '/',
    //   name: 'login',
    //   component: () => import('@renderer/views/Login/index.vue')
    // },
    {
      path: '/',
      name: 'home',
      redirect: '/UI',
      component: Home,
      children: [
        {
          path: 'UI',
          name: 'UIForm',
          component: UIForm
        }
      ]
    },
    {
      path: '/maptask',
      name: 'maptask',
      component: MapTask
    }
  ]
})

export default router
