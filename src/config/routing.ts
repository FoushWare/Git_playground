export const routes = {
  home: '/',
  payments: '/payments',
  history: '/history',
  settings: '/settings',
  profile: '/profile'
};

export function getPath(route: keyof typeof routes): string {
  return routes[route];
}