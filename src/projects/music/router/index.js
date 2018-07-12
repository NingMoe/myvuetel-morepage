import Vue from 'vue';
import Router from 'vue-router';

const Rank = ((resolve) => {
  import('../components/business/rank').then((moudle) => {
    resolve(moudle);
  });
});

const Recommend = ((resolve) => {
  import('../components/business/recommend').then((moudle) => {
    resolve(moudle);
  });
});

const Singer = ((resolve) => {
  import('../components/business/singer').then((moudle) => {
    resolve(moudle);
  });
});

const Search = ((resolve) => {
  import('../components/business/search').then((moudle) => {
    resolve(moudle);
  });
});

const UserCenter = ((resolve) => {
  import('../components/business/user-center').then((userCenter) => {
    resolve(userCenter);
  });
});


Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '',
      redirect: '/recommend'
    },
    {
      path: '/rank',
      component: Rank
      // children: [
      //   {
      //     path: ':id',
      //     component: RankDetail
      //   }
      // ]
    },
    {
      path: '/singer',
      component: Singer
      // children: [
      //   {
      //     path: ':id',
      //     component: SingerDetail
      //   }
      // ]
    },
    {
      path: '/search',
      component: Search
      // children: [
      //   {
      //     path: ':id',
      //     component: SingerDetail
      //   }
      // ]
    },
    {
      path: '/recommend',
      component: Recommend
      // children: [
      //   {
      //     path: ':id',
      //     component: RecommendDetail
      //   }
      // ]
    },
    {
      path: '/user',
      component: UserCenter
    }
  ]
});

export default router;
