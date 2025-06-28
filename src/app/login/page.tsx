'use client';

import { signIn, signOut } from 'next-auth/react';

import Button from '@/components/common/Button';

export default function LoginPage() {
  return (
    <>
      <Button onClick={() => signIn()}>{'Login'}</Button>
      <Button onClick={() => signOut()}>{'Logout'}</Button>
    </>
  );
}
