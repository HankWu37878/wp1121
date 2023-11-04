import { NextResponse, type NextRequest } from "next/server";

import { and, eq, sql } from "drizzle-orm";
import { z } from "zod";

import { db } from "@/db";
import { TimeTable } from "@/db/schema";

const timeStateRequestSchema = z.object({
  activityId: z.number().positive(),
  username: z.string().min(1).max(50),
  timeStaterows: z.number(),
  timeStatecols: z.number(),
});

type timeStateRequest = z.infer<typeof timeStateRequestSchema>;

export async function GET(request: NextRequest) {
  const data = await request.json();

  try {
    timeStateRequestSchema.parse(data);
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { activityId, username } = data as timeStateRequest;

  try {
    // This is a common pattern to check if a row exists
    // if the query returns a row with a dummy column of value 1
    // then the row which satisfies the condition exists.
    // You can also select any column here, but since we don't need
    // any of those data, we just select a dummy column of constant value 1,
    // this saves us from copying any data from the disk to the memory.
    //
    // You can also do this with count(*) and check if the count is greater than 0.
    const [exist] = await db
      .select({ dummy: sql`1` })
      .from(TimeTable)
      .where(
        and(
          eq(TimeTable.activityId, activityId),
          eq(TimeTable.username, username),
        ),
      )
      .execute();
    // The NextResponse object is a easy to use API to handle responses.
    // IMHO, it's more concise than the express API.
    return NextResponse.json({ liked: Boolean(exist) }, { status: 200 });
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
    timeStateRequestSchema.parse(data);
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { activityId, username, timeStaterows, timeStatecols } = data as timeStateRequest;

  try {
    await db
      .insert(TimeTable)
      .values({
        activityId,
        username,
        timeStaterows,
        timeStatecols
      })
      .onConflictDoNothing()
      .execute();
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }

  return new NextResponse("OK", { status: 200 });
}

export async function DELETE(request: NextRequest) {
  const data = await request.json();

  try {
    timeStateRequestSchema.parse(data);
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { activityId, username, timeStaterows, timeStatecols } = data as timeStateRequest;

  try {
    await db
      .delete(TimeTable)
      .where(
        and(
          eq(TimeTable.activityId, activityId),
          eq(TimeTable.username, username),
          eq(TimeTable.timeStaterows, timeStaterows),
          eq(TimeTable.timeStatecols, timeStatecols),
        ),
      )
      .execute();
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }

  return new NextResponse("OK", { status: 200 });
}
