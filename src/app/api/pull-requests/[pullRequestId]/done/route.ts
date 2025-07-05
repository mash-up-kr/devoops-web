import { NextResponse } from 'next/server';

export async function PATCH(req: Request, { params }: { params: { pullRequestId: string } }) {
  const { pullRequestId } = params;

  return NextResponse.json({ message: `PR ${pullRequestId} 회고 완료됨` }, { status: 200 });
}
