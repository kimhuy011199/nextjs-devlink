import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs';
import { clerkClient } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function PUT(
  req: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const { profile, urls, removedIds } = await req.json();
    const { fullName, email, avatar } = profile;

    const { userId } = auth();
    if (!userId) {
      return new NextResponse(JSON.stringify('Unauthorized'), { status: 401 });
    }

    if (userId !== params.slug) {
      return new NextResponse(JSON.stringify('Forbidden'), { status: 403 });
    }

    // Update profile information
    const updatedProfile = await db.profile.update({
      where: {
        userId,
      },
      data: {
        fullName,
        email,
        avatar,
      },
    });

    // Update profile links
    const updateUrlPromises = urls.map(
      (item: any) =>
        new Promise((resolve, reject) =>
          db.link
            .upsert({
              where: { id: item.id },
              update: { ...item, profileId: updatedProfile.id },
              create: { ...item, profileId: updatedProfile.id },
            })
            .then((result) => resolve(result))
            .catch((error) => reject(error))
        )
    );
    Promise.all(updateUrlPromises);

    // Remove links
    await db.link.deleteMany({
      where: {
        id: {
          in: removedIds,
        },
      },
    });

    return NextResponse.json(updatedProfile);
  } catch (error) {
    console.log(error);
    return new NextResponse(JSON.stringify('Internal Server Error'), {
      status: 500,
    });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse(JSON.stringify('Unauthorized'), { status: 401 });
    }

    if (userId !== params.slug) {
      return new NextResponse(JSON.stringify('Forbidden'), { status: 403 });
    }

    // Delete profile in Postgres
    await db.profile.delete({
      where: {
        userId,
      },
    });

    // Delete Clerk account
    await clerkClient.users.deleteUser(userId);

    return NextResponse.json({
      message: `Deleted user ${userId} successfully`,
    });
  } catch (error) {
    console.log(error);
    return new NextResponse(JSON.stringify('Internal Server Error'), {
      status: 500,
    });
  }
}
