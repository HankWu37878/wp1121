import { NextResponse, type NextRequest } from "next/server";

import { z } from "zod";

import { db } from "@/db";
import { friendsTable } from "@/db/schema";
import { eq } from "drizzle-orm";


const postNotificationRequestSchema = z.object({
    chatroomId: z.number(),
    content: z.string().min(1).max(280),
});

type PostNotificationRequest = z.infer<typeof postNotificationRequestSchema>;


export async function POST(request: NextRequest) {
  const data = await request.json();

  try {
    // parse will throw an error if the data doesn't match the schema
    postNotificationRequestSchema.parse(data);
  } catch (error) {
    // in case of an error, we return a 400 response
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { chatroomId, content } = data as PostNotificationRequest;

  try {
    await db.update(friendsTable).set( {notification : content}).where(eq(friendsTable.id, chatroomId)).execute();

    
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
  
  return new NextResponse("OK", { status: 200 });
}
