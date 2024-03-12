import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs';
import { clerkClient } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
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

    const clerkUser = await clerkClient.users.updateUser(userId, { username });
    console.log('clerkUser', clerkUser);
    return NextResponse.json(updatedProfile);
  } catch (error) {
    console.log(error);
    return new NextResponse(JSON.stringify('Internal Server Error'), {
      status: 500,
    });
  }
}
