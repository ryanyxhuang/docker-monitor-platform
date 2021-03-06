import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/view/home'
import ContainersList from '@/view/ContainersList'
import ServicesList from '@/view/ServicesList'
import StacksList from '@/view/StacksList'
import NodesList from '@/view/NodesList'
import ContainerLog from '@/view/ContainerLog'
import StackAnalysis from '@/view/StackAnalysis'
import Config from '@/view/Config'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    }, {
      path: '/home',
      name: 'home',
      component: Home
    }, {
      path: '/containers',
      name: 'containersList',
      component: ContainersList
    }, {
      path: '/services',
      name: 'servicesList',
      component: ServicesList
    }, {
      path: '/stacks',
      name: 'stacksList',
      component: StacksList
    }, {
      path: '/swarm',
      name: 'nodesList',
      component: NodesList
    }, {
      path: '/containers/:id/log',
      name: 'containerLog',
      component: ContainerLog
    }, {
      path: '/stack/:id/analysis',
      name: 'stackAnalysis',
      component: StackAnalysis
    }, {
      path: '/config',
      name: 'config',
      component: Config
    }
  ]
})
