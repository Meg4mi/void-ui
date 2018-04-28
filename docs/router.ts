import Vue from 'vue';
import Router from 'vue-router';

import Index from '@docs/views/Index.vue';
import Home from '@docs/views/Home.vue';
import Guidelines from '@docs/views/Guidelines.vue';
import Controls from '@docs/views/Controls.vue';
import Tools from '@docs/views/Tools.vue';
import Demos from '@docs/views/Demos.vue';

import GameDb from '@docs/gamedb/GameDb.vue';
import ViewIndex from '@docs/gamedb/ViewIndex.vue';
import ViewGame from '@docs/gamedb/ViewGame.vue';
import ViewCollection from '@docs/gamedb/ViewCollection.vue';

Vue.use(Router);

/**
 * Router for Void-UI site.
 */
export default new Router({
  base: '/void-ui/',
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: to => {
        return 'gamedb';
      },
    },
    {
      path: '/gamedb',
      component: GameDb,
      children: [
        {
          path: '',
          component: ViewIndex,
          name: 'index',
        },
        {
          path: 'game/:id',
          component: ViewGame,
          name: 'game',
        },
        {
          path: ':collection/:id',
          component: ViewCollection,
          name: 'collection',
        },
      ],
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
