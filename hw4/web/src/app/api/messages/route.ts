import { NextResponse, type NextRequest } from "next/server";

import { z } from "zod";

import { db } from "@/db";
import { friendsTable, messagesTable, usersTable } from "@/db/schema";
import { eq } from "drizzle-orm";



const postMessageRequestSchema = z.object({
  chatroomId: z.number(),
  authorName: z.string().min(1).max(50),
  friendName: z.string().min(1).max(50),
  content: z.string().min(1).max(280),
});

type PostMessageRequest = z.infer<typeof postMessageRequestSchema>;


export async function GET() {

  try {
    const messages = await db
    .select({
      id: messagesTable.id,
      chatroomId: messagesTable.chatroomId,
      authorName: messagesTable.authorName,
      friendName: messagesTable.friendName,
      content: messagesTable.content,
      createdAt: messagesTable.createdAt,
      state: messagesTable.unsentState,
    })
    .from(messagesTable)
    .orderBy(messagesTable.createdAt)
    .execute();
    
    
    return NextResponse.json({messages: messages} , { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}


export async function POST(request: NextRequest) {
  const data = await request.json();

  try {
    // parse will throw an error if the data doesn't match the schema
    postMessageRequestSchema.parse(data);
  } catch (error) {
    // in case of an error, we return a 400 response
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { chatroomId, authorName, friendName, content } = data as PostMessageRequest;

  try {
    const [author] = await db
    .select({
      username: usersTable.username,
    })
    .from(usersTable)
    .where(eq(usersTable.username, authorName));
    if (!author) {
        return;
    }
    
    const [friend] = await db
      .select({
        username: usersTable.username,
      })
      .from(usersTable)
      .where(eq(usersTable.username, friendName));
    if (!friend) {
      return;
    }

    const [chatroom] = await db
      .select({
        id: friendsTable.id
      })
      .from(friendsTable)
      .where(eq(friendsTable.id, chatroomId));
    if (!chatroom) {
      return;
    }

    const [dbMessage] = await db.insert(messagesTable).values({
      chatroomId: chatroomId,
      authorName: authorName,
      friendName: friendName,
      content: content,
    })
    .returning({
      id: messagesTable.id,
      createdAt: messagesTable.createdAt,
    })
    .execute();

    await db.update(friendsTable).set({ latest : dbMessage.createdAt }).where(eq(friendsTable.id, chatroomId)).execute();


    return NextResponse.json({ message: { id: dbMessage.id, chatroomId, authorName, friendName, content, createdAt: dbMessage.createdAt } } , { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
  
  return new NextResponse("OK", { status: 200 });
}

const putMessageRequestSchema = z.object({
  id: z.number(),
  state: z.string(),
});

type PutMessageRequest = z.infer<typeof putMessageRequestSchema>;

export async function PUT(request: NextRequest) {
  const data = await request.json();

  try {
    // parse will throw an error if the data doesn't match the schema
    putMessageRequestSchema.parse(data);
  } catch (error) {
    // in case of an error, we return a 400 response
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { id, state } = data as PutMessageRequest;

  try {

    if (state === "me")
      await db.update(messagesTable).set({ unsentState : "me" }).where(eq(messagesTable.id, id)).execute();
    else if (state === "everyone")
      await db.update(messagesTable).set({ unsentState : "everyone" }).where(eq(messagesTable.id, id)).execute();
    else
      return;

  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
  
  return new NextResponse("OK", { status: 200 });
}


