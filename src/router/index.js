import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import MemberView from '../views/MemberView.vue'
import CompanyView from '@/views/Company.vue'
import Business from '../views/Business.vue'
import Product from '../views/Product.vue'
import Service from '../views/Service.vue'
import GreetingsView from '@/views/Company/GreetingsView.vue'
import HistoryView from '@/views/Company/HistoryView.vue'
import InteriorView from '@/views/Company/Interior.vue'
import DirectionView from '@/views/Company/Direction.vue'
import BusinessView1 from '@/views/Business/BusinessView-1.vue'
import BusinessView2 from '@/views/Business/BusinessView-2.vue'
import BusinessView3 from '@/views/Business/BusinessView-3.vue'
import ProductView1 from '@/views/Product/ProductView-1.vue'
import ProductView2 from '@/views/Product/ProductView-2.vue'
import ProductView3 from '@/views/Product/ProductView-3.vue'
import NoticeView from '@/views/Service/NoticeView.vue'
import NoticeList from '@/views/Service/NoticeList.vue'
import NoticeRead from '@/views/Service/NoticeRead.vue'
import NoticeWrite from '@/views/Service/NoticeWrite.vue'
import NoticeModify from '@/views/Service/NoticeModify.vue'
import OnlineView from '@/views/Service/OnlineView.vue'
import QnaView from '@/views/Service/QnaView.vue'
import GalleryView from '@/views/Service/GalleryView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/member',
    name: 'member',
    component: MemberView
  },
  {
    path: '/company',
    name: 'company',
    component: CompanyView,
    redirect: "/company/greetings",
    children: [
      {
        path: '/company/greetings',
        name: 'greetings',
        component: GreetingsView,
      },
      {
        path: '/company/history',
        name: 'history',
        component: HistoryView,
      },
      {
        path: '/company/interior',
        name: 'interior',
        component: InteriorView,
      },
      {
        path: '/company/direction',
        name: 'direction',
        component: DirectionView,
      },
    ]
  },
  {
    path: '/business',
    name: 'business',
    component: Business,
    redirect: "/business/business1",
    children:[
      {
        path: '/business/business1',
        name: 'business1',
        component: BusinessView1
      },
      {
        path: '/business/business2',
        name: 'business2',
        component: BusinessView2
      },
      {
        path: '/business/business3',
        name: 'business3',
        component: BusinessView3
      }
    ]
  },
  {
    path: '/product',
    name: 'product',
    component: Product,
    redirect : '/product/product1',
    children:[
      {
        path: '/product/product1',
        name: 'product1',
        component: ProductView1
      },
      {
        path: '/product/product2',
        name: 'product2',
        component: ProductView2
      },
      {
        path: '/product/product3',
        name: 'product3',
        component: ProductView3
      }
    ]
  },
  {
    path: '/service',
    name: 'service',
    component: Service,
    redirect : '/service/notice',
    children:[
      {
        path: '/service/notice',
        name: 'notice',
        component: NoticeView,
        redirect : '/service/notice/list',
        children:[
          {
            path:'/service/notice/list',
            name:'noticelist',
            component: NoticeList
          },
          {
            path:'/service/notice/read',
            name:'noticeread',
            component: NoticeRead
          },
          {
            path:'/service/notice/write',
            name:'noticewrite',
            component: NoticeWrite
          },
          {
            path:'/service/notice/modify',
            name:'noticemodify',
            component: NoticeModify
          }
        ]
      },
      {
        path: '/service/online',
        name: 'online',
        component: OnlineView
      },
      {
        path: '/service/qna',
        name: 'qna',
        component: QnaView
      },
      {
        path: '/service/gallery',
        name: 'gallery',
        component: GalleryView
      }
    ]
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
