import { NextResponse } from 'next/server';

export async function PATCH(req: Request, { params }: { params: { pullRequestId: string } }) {
  const { pullRequestId } = params;

  console.log(`PR ${pullRequestId} 회고 완료 처리`);

  return NextResponse.json({ message: 'PR 회고 완료됨' }, { status: 200 });
}
