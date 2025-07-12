'use client';

import React, { useEffect } from 'react';

import { getTokenAction, setTokenAction } from '@/actions/token.action';

function GithubCallback({ accessToken, refreshToken }: { accessToken: string; refreshToken: string }) {
  useEffect(() => {
    const fetchToken = async () => {
      const token = await getTokenAction();
      if (!token) {
        await setTokenAction({ accessToken, refreshToken });
      } else {
        console.log('#toke 가져온값', token);
      }
    };
    fetchToken();
  }, []);

  return (
    <div>
      {accessToken}
      {refreshToken}
    </div>
  );
}

export default GithubCallback;
