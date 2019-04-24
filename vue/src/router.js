import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Question from './views/Question.vue'



//children
import Default from './components/children/questions/QuestionList.vue'
import ViewQuestion from './components/children/questions/ViewQuestion.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/question',
      name: 'question',
      component: Question,
      children: [
        {
          path: '',
          name: 'Default',
          component: Default,
        },
        {
          path: ':id',
          name: 'ViewQuestion',
          component: ViewQuestion,
        },     
      ]
    },
    {
      path:'/ask',
      name: 'ask',
      component: () => import(/* webpackChunkName: "ask" */ './views/Ask.vue')
    },
    {
      path:'/edit-question/:id',
      name: 'EditQuestion',
      component: () => import(/* webpackChunkName: "editQuestion" */ './views/EditQuestion.vue')
    },
    {
      path:'/edit-answer/:id',
      name: 'EditAnswer',
      component: () => import(/* webpackChunkName: "EditAnswer" */ './views/EditAnswer.vue')
    }
  ]
})
