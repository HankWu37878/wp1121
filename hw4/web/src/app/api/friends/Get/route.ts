import { NextResponse, type NextRequest } from "next/server";

//import { z } from "zod";

import { db } from "@/db";
import { friendsTable } from "@/db/schema";
import { and, desc, eq, like, or } from "drizzle-orm";

/*const getFriendshipRequestSchema = z.object({
  username: z.string().min(1).max(50),
});

type GetFriendshipRequest = z.infer<typeof getFriendshipRequestSchema>;*/

export async function POST(request: NextRequest) {
  const data = await request.json();

  /*try {
    getFriendshipRequestSchema.parse(data);
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }*/
  
  try {
    const friendships = await db
    .select({
      chatroomId: friendsTable.id,
      name1: friendsTable.userName,
      name2: friendsTable.friendName,
    })
    .from(friendsTable)
    .where(and(or(eq(friendsTable.userName, data.username),eq(friendsTable.friendName, data.username)), or(like(friendsTable.userName, `${data.searchString ?? ""}%`),like(friendsTable.friendName, `${data.searchString ?? ""}%`))))
    .orderBy(desc(friendsTable.latest))
    .execute();
    
    if (!friendships) return;
    
    return NextResponse.json({friendships: friendships} , { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
