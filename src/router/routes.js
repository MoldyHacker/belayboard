
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'index', component: () => import('pages/IndexPage.vue') },
      { path: '/user/:uid', name: 'User Profile',component:() => import('pages/UserProfilePage.vue'), props: true },
      { path: '/contact-user/:uid', name: 'Contact User', component: () => import(''), props: true },
      { path: '/edit', children: [
          { path: 'account', name: 'Account-Settings', component: () => import('pages/settings/EditAccount.vue') },
          { path: 'profile', name: 'Edit Your Profile', component: () => import('pages/settings/EditProfile.vue') },
        ], redirect: '/edit/account' },
      { path: '/board', name: 'board', component: () => import('pages/PlanBoardPage.vue') },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
