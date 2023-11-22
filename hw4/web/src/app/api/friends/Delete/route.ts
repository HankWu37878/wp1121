import { NextResponse, type NextRequest } from "next/server";

//import { z } from "zod";

import { db } from "@/db";
import { friendsTable } from "@/db/schema";
import { eq } from "drizzle-orm";


/*const deleteFriendshipRequestSchema = z.object({
  chatroomId: z.number(),
});*/

//type DeleteFriendshipRequest = z.infer<typeof deleteFriendshipRequestSchema>;


export async function DELETE(request: NextRequest) {
  const data = await request.json();

  /*try {
    // parse will throw an error if the data doesn't match the schema
    deleteFriendshipRequestSchema.parse(data);
  } catch (error) {
    // in case of an error, we return a 400 response
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { chatroomId } = data as DeleteFriendshipRequest;*/

  try {
    await db.delete(friendsTable)
            .where(eq(friendsTable.id, data))
            .execute();

  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
  
  return new NextResponse("OK", { status: 200 });
}
