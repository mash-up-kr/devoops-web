export async function register() {
  if (process.env.NEXT_PUBLIC_MOCK_API === 'enabled' && process.env.NEXT_RUNTIME === 'nodejs') {
    const { server } = await import('@/mocks/server');
    server.listen();
  }
}
