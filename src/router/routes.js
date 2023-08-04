
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'index', component: () => import('pages/IndexPage.vue') },
      { path: '/profile', name: 'Profile', component: () => import('pages/ProfilePage.vue') },
      { path: '/user/:uid', name: 'User Profile' },
      { path: '/contact-user/:uid', name: 'Contact User', component: () => import(''), props: true },
      { path: '/edit', children: [
          { path: 'account', name: 'Account-Settings', component: () => import('pages/settings/EditAccount.vue') },
          { path: 'profile', name: 'Edit Your Profile', component: () => import('pages/settings/EditProfile.vue') },
        ], redirect: '/edit/account' },

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
