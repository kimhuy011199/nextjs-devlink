import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { username } = await req.json();

  const { userId } = auth();
  if (!userId) {
    return new NextResponse(JSON.stringify('Unauthorized'), { status: 401 });
  }

  const existedProfile = await db.profile.findFirst({
    where: { username },
  });

  if (existedProfile) {
    return new NextResponse(JSON.stringify('Username is already taken'), {
      status: 400,
    });
  }

  const updatedProfile = await db.profile.update({
    where: {
      userId,
    },
    data: {
      username,
    },
  });

  return NextResponse.json(updatedProfile);
}
