import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Mesto from '../views/Mesto.vue'
import AddMesto from '../views/AddMesto.vue'
import UpdateMesto from '../views/UpdateMesto.vue'
import Fakultet from '../views/Fakultet.vue'
import AddFakultet from '../views/AddFakultet.vue'
import UpdateFakultet from '../views/UpdateFakultet.vue'
import Student from '../views/Student.vue'
import AddStudent from '../views/AddStudent.vue'
import PageNotFound from '../views/PageNotFound'


const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/mesto',
    name: 'Mesto',
    component: Mesto
  },
  {
    path: '/mesto/add',
    name: 'AddMesto',
    component: AddMesto
  },
  {
    path: '/mesto/update/:mestoId',
    name: 'UpdateMesto',
    component: UpdateMesto
  },
  {
    path: '/fakultet',
    name: 'Fakultet',
    component: Fakultet
  },
  {
    path: '/fakultet/add',
    name: 'AddFakultet',
    component: AddFakultet
  },
  {
    path: '/fakultet/update/:fakultetId',
    name: 'UpdateFakultet',
    component: UpdateFakultet
  },
  {
    path: '/student',
    name: 'Student',
    component: Student
  },
  {
    path: '/student/add',
    name: 'AddStudent',
    component: AddStudent
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'PageNotFound',
    component: PageNotFound
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
