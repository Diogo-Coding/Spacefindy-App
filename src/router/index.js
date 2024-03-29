import { createRouter, createWebHistory } from 'vue-router'

//Home Views
import HomeView from '../views/Home/HomeView.vue'
import AboutView from '../views/Home/AboutView.vue'
import LoginView from '../views/Home/LoginView.vue'

//Main Views
// import AssessmentView from '../views/Main/AssessmentView.vue'
// import CalendarView from '../views/Main/CalendarView.vue'
// import ChatView from '../views/Main/ChatView.vue'
// import PaymentView from '../views/Main/PaymentView.vue'
// import RentView from '../views/Main/RentView.vue'
import SearchStorageView from '../views/Main/SearchStorageView.vue'
import SeeStorageView from '../views/Main/SeeStorageView.vue'

//Account Views
import AccountView from '../views/Perfil/AccountView.vue'
// import EditStorageView from '../views/Perfil/EditStorageView.vue'
// import MyStoragesView from '../views/Perfil/MyStoragesView.vue'
// import PromoteView from '../views/Perfil/PromoteView.vue'
import PublishStorageView from '../views/Perfil/PublishStorageView.vue'
// import SuscriptionsView from '../views/Perfil/SuscriptionsView.vue'


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
    path: '/account',
    name: 'account',
    component: AccountView
  },
  {
    path: '/search',
    name: 'search',
    component: SearchStorageView
  },
  {
    path: '/search/:ccaa/:prov',
    name: 'searchFull',
    component: SearchStorageView
  },
  {
    path: '/search/:ccaa',
    name: 'searchCCAA',
    component: SearchStorageView
  },
  {
    path: '/account/storage/publish',
    name: 'publishStorage',
    component: PublishStorageView
  },
  {
    path: '/storage/:id',
    name: 'seeStorage',
    component: SeeStorageView
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
