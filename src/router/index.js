import { createRouter, createWebHistory } from 'vue-router'

//Home Views
import HomeView from '../views/Home/HomeView.vue'
import AboutView from '../views/Home/AboutView.vue'
import SignInView from '../views/Home/SignInView.vue'
import LoginView from '../views/Home/LoginView.vue'

//Main Views
import AssessmentView from '../views/Main/AssessmentView.vue'
import CalendarView from '../views/Main/CalendarView.vue'
import ChatView from '../views/Main/ChatView.vue'
import PaymentView from '../views/Main/PaymentView.vue'
import RentView from '../views/Main/RentView.vue'
import SearchStorageView from '../views/Main/SearchStorageView.vue'

//Account Views
import AccountView from '../views/Perfil/AccountView.vue'
import EditAccountView from '../views/Perfil/EditAccountView.vue'
import EditStorageView from '../views/Perfil/EditStorageView.vue'
import MyStoragesView from '../views/Perfil/MyStoragesView.vue'
import PromoteView from '../views/Perfil/PromoteView.vue'
import PublishStorageView from '../views/Perfil/PublishStorageView.vue'
import SuscriptionsView from '../views/Perfil/SuscriptionsView.vue'


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/signin',
    name: 'signin',
    component: SignInView
  },
  {
    path: '/calendar',
    name: 'home',
    component: CalendarView
  },
  {
    path: '/chat',
    name: 'chat',
    component: ChatView
  },
  {
    path: '/payment',
    name: 'payment',
    component: PaymentView
  },
  {
    path: '/rent',
    name: 'rent',
    component: RentView
  },
  {
    path: '/search',
    name: 'search',
    component: SearchStorageView
  },
  {
    path: '/assessment',
    name: 'assessment',
    component: AssessmentView
  },
  {
    path: '/account/:id',
    name: 'account',
    component: AccountView
  },
  {
    path: '/account/:id/edit',
    name: 'editAccount',
    component: EditAccountView
  },
  {
    path: '/account/:accountId/storages/:storage',
    name: 'seeStorage',
    component: MyStoragesView
  },
  {
    path: '/account/:accountId/storages/:storage/edit',
    name: 'editStorage',
    component: EditStorageView
  },
  {
    path: '/account/:accountId/storages',
    name: 'storages',
    component: MyStoragesView
  },
  {
    path: '/account/promote',
    name: 'promote',
    component: PromoteView
  },
  {
    path: '/account/publish',
    name: 'publish',
    component: PublishStorageView
  },
  {
    path: '/account/suscriptions',
    name: 'suscriptions',
    component: SuscriptionsView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
