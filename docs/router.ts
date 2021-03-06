import Vue from 'vue';
import VueRouter from 'vue-router';

import Index from '@docs/views/Index.vue';
import Home from '@docs/views/Home.vue';
import Guidelines from '@docs/views/Guidelines.vue';
import Controls from '@docs/views/Controls.vue';
import Tools from '@docs/views/Tools.vue';
import Demos from '@docs/views/Demos.vue';

Vue.use(VueRouter);

/**
 * Router for Void-UI site.
 */
export default new VueRouter({
  base: '/void-ui/',
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: to => {
        return 'zh-CN';
      },
    },
    {
      path: '/:locale',
      component: Index,
      children: [
        {
          path: '',
          component: Home,
        },
        {
          path: 'guidelines',
          component: Guidelines,
        },
        {
          path: 'controls',
          component: Controls,
        },
        {
          path: 'tools',
          component: Tools,
        },
        {
          path: 'demos',
          component: Demos,
        },
      ],
    },
  ],
});
