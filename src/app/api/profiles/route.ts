import { auth, currentUser } from '@clerk/nextjs';
import { clerkClient } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getCurrentProfile } from '@/lib/profiles';

export async function GET() {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse(JSON.stringify('Unauthorized'), { status: 401 });
    }

    // Get current profile
    const profile = await getCurrentProfile();
    if (profile) {
      return NextResponse.json(profile);
    }

    // Create new profile if current profile is not existed
    const user = await currentUser();
    if (user) {
      const fullName =
        user?.firstName &&
        user?.lastName &&
        `${user.firstName} ${user.lastName}`;
      const newProfile = await db.profile.create({
        data: {
          userId,
          username: '',
          email: user.emailAddresses[0].emailAddress,
          fullName: fullName || '',
          avatar: user?.imageUrl || '',
        },
      });

      return NextResponse.json({ ...newProfile, urls: [] });
    }
  } catch (error) {
    console.log(error);
    return new NextResponse(JSON.stringify('Internal Server Error'), {
      status: 500,
    });
  }
}

export async function POST(req: Request) {
  try {
    const { username } = await req.json();

    const { userId } = auth();
    if (!userId) {
      return new NextResponse(JSON.stringify('Unauthorized'), { status: 401 });
    }

    // Check if username is already taken
    const existedProfile = await db.profile.findFirst({
      where: { username },
    });
    if (existedProfile) {
      return new NextResponse(JSON.stringify('Username is already taken'), {
        status: 400,
      });
    }

    // Update profile username in Postgres
    const updatedProfile = await db.profile.update({
      where: {
        userId,
      },
      data: {
        username,
      },
    });

    // Update profile username in Clerk
    await clerkClient.users.updateUser(userId, { username });
    return NextResponse.json(updatedProfile);
  } catch (error) {
    console.log(error);
    return new NextResponse(JSON.stringify('Internal Server Error'), {
      status: 500,
    });
  }
}
