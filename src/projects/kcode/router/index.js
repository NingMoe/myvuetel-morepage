import Vue from 'vue';
import Router from 'vue-router';

const Conversion = ((resolve) => {
  import('../components/business/conversion').then((moudle) => {
    resolve(moudle);
  });
});


Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '',
      redirect: '/conversion'
    },
    {
      path: '/conversion',
      name: 'Conversion',
      component: Conversion
      // children: [
      //   {
      //     path: ':id',
      //     component: ConversionDetail
      //   }
      // ]
    }
  ]
});

export default router;
