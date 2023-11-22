import { NextResponse, type NextRequest } from "next/server";

import { z } from "zod";

import { db } from "@/db";
import { friendsTable, usersTable } from "@/db/schema";
import { and, eq, or } from "drizzle-orm";


const postFriendshipRequestSchema = z.object({
  name1: z.string().min(1).max(50),
  name2: z.string().min(1).max(50),
});

type PostFriendshipRequest = z.infer<typeof postFriendshipRequestSchema>;


export async function POST(request: NextRequest) {
  const data = await request.json();

  try {
    // parse will throw an error if the data doesn't match the schema
    postFriendshipRequestSchema.parse(data);
  } catch (error) {
    // in case of an error, we return a 400 response
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { name1, name2 } = data as PostFriendshipRequest;

  try {
    const [user] = await db
    .select({
      username: usersTable.username,
    })
    .from(usersTable)
    .where(eq(usersTable.username, name1));
    if (!user) {
        return NextResponse.json({ error: "Cannot find user " + name1 + "." } , { status: 200 });
    }
    
    const [friend] = await db
      .select({
        username: usersTable.username,
      })
      .from(usersTable)
      .where(eq(usersTable.username, name2));
    if (!friend) {
      return NextResponse.json({ error: "Cannot find user " + name2 + "." } , { status: 200 });
    }

    const [existedFriendShip] = await db.select()
      .from(friendsTable)
      .where(or(
        and(eq(friendsTable.userName, user.username),
          eq(friendsTable.friendName, friend.username)),
              (and(eq(friendsTable.userName, friend.username),
                eq(friendsTable.friendName, user.username)))))
      .execute();

    if (existedFriendShip)
        return NextResponse.json({ error: "Chat room already existed." } , { status: 200 });
  
    const [newFriendship] = await db.insert(friendsTable).values({
      userName: user.username,
      friendName: friend.username,
    })
    .onConflictDoNothing()
    .returning({chatroomId: friendsTable.id})
    .execute();

    

    return NextResponse.json({ friendship: {chatroomId: newFriendship.chatroomId, name1, name2 } } , { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
  
  return new NextResponse("OK", { status: 200 });
}
