export const navigation: Navigation[] = [
  { name: 'Dashboard', href: '#', current: true },
  { name: 'Sign In', href: '/auth/sign-in', current: false },
  { name: 'Sign Up', href: '/auth/sign-up', current: false },
  { name: 'Calendar', href: '#', current: false },
]

export interface Navigation{
  name: string;
  href: string;
  current: boolean;
}
