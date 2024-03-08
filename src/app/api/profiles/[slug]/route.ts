import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export async function POST(
  req: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const { profile, urls, removedIds } = await req.json();
    const { fullName, email, avatar } = profile;

    const { userId } = auth();
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const updatedProfile = await db.profile.update({
      where: {
        userId: params.slug,
      },
      data: {
        fullName,
        email,
        avatar,
      },
    });

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
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
