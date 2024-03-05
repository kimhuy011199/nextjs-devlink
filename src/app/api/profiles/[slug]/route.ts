import { auth } from '@clerk/nextjs';

export async function POST(request: Request) {
  const x = auth();
  console.log('x', x);
  const res = await request.json();
  return Response.json({ res });
}
