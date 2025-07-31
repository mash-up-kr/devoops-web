export const ROUTES = {
  PAGE: {
    HOME: '/',
    LANDING: '/landing',
    AUTH_GITHUB: '/auth/github',
    REPOLINK: '/repolink',
    RETROSPECTIVE: (prId: number | undefined) => `/retrospective/${prId}`,
  },
} as const;
