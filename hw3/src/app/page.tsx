import NameDialog from "@/components/NameDialog";
import { Separator } from "@/components/ui/separator";
import UserAvatar from "@/components/UserAvatar";
import Activity from "@/components/Activity";
import { db } from "@/db";
import { activitiesTable, participantsTable, usersTable } from "@/db/schema";
import { desc, eq, like, sql } from "drizzle-orm";
import ChangeUserButton from "@/components/ChangeUserButton";
import AddActivityButton from "@/components/AddActivityButton";
import SearchArea from "@/components/SearchArea";

type HomePageProps = {
    searchParams: {
      username?: string;
      searchString? : string;
    };
  };

export default async function Home({
    searchParams: { username, searchString },
  }: HomePageProps) {
    if (username) {
        await db
          .insert(usersTable)
          .values({
            displayName: username,
          })
          // Since handle is a unique column, we need to handle the case
          // where the user already exists. We can do this with onConflictDoUpdate
          // If the user already exists, we just update the display name
          // This way we don't have to worry about checking if the user exists
          // before inserting them.
          .onConflictDoUpdate({
            target: usersTable.displayName,
            set: {
              displayName: username,
            },
          })
          .execute();
      }

    
    
    const participantsSubquery = db.$with("participants_count").as(
    db
        .select({
        activityId: participantsTable.activityId,
        // some times we need to do some custom logic in sql
        // although drizzle-orm is very powerful, it doesn't support every possible
        // SQL query. In these cases, we can use the sql template literal tag
        // to write raw SQL queries.
        // read more about it here: https://orm.drizzle.team/docs/sql
        participants: sql<number | null>`count(*)`.mapWith(Number).as("participants"),
        })
        .from(participantsTable)
        .groupBy(participantsTable.activityId),
    );

    // This subquery generates the following SQL:
    // WITH liked AS (
    //  SELECT
    //   tweet_id,
    //   1 AS liked
    //   FROM likes
    //   WHERE user_handle = {handle}
    //  )
    const participatedSubquery = db.$with("paticipated").as(
    db
        .select({
        activityId: participantsTable.activityId,
        // this is a way to make a boolean column (kind of) in SQL
        // so when this column is joined with the tweets table, we will
        // get a constant 1 if the user liked the tweet, and null otherwise
        // we can then use the mapWith(Boolean) function to convert the
        // constant 1 to true, and null to false
        participated: sql<number>`1`.mapWith(Boolean).as("participated"),
        })
        .from(participantsTable)
        .where(eq(participantsTable.username, username ?? "")),
    );

    const activities = await db
    .with(participantsSubquery, participatedSubquery)
    .select({
        id: activitiesTable.id,
        content: activitiesTable.content,
        username: activitiesTable.username,
        createdAt: activitiesTable.createdAt,
        participants: participantsSubquery.participants,
        participated: participatedSubquery.participated,
    })
    .from(activitiesTable)
    .where(like(activitiesTable.content, `${searchString ?? ""}%`))
    .orderBy(desc(activitiesTable.createdAt))
    .innerJoin(usersTable, eq(activitiesTable.username, usersTable.displayName))
    .leftJoin(participantsSubquery, eq(activitiesTable.id, participantsSubquery.activityId))
    .leftJoin(participatedSubquery, eq(activitiesTable.id, participatedSubquery.activityId))
    .execute();


    return (
        <div className="border-2 bg-slate-50 h-screen overflow-scroll flex-col gap-2">
            <div className="flex m-10 justify-between">
                <div className="flex gap-4 border-b-2 pb-2 pr-5">
                    {username && <UserAvatar className="border-2 border-black"/>}
                    <p className="font-semibold text-3xl">{username ?? "..."}</p>
                </div>
                
                <ChangeUserButton/>
            </div>

            <Separator/>
            <div className="mx-10 mt-10">
                <div className="flex gap-5 justify-between">
                    <div className="flex w-full gap-5">
                        <SearchArea/>
                    </div>
                   
                    <div className="text-right h-1/2">
                        <AddActivityButton/>
                    </div> 
                </div>
                
            </div>


            <div className="m-10 flex-col space-y-10">
                {activities.map( (activity) => 
                (<>
                    <div className="bg-gray-300 flex h-20 px-4 rounded-md">
                        <Activity 
                        key={activity.id}
                        activityName={activity.content}
                        username={username ?? "..."}
                        participants={activity.participants}
                        participated={activity.participated}
                        id={activity.id} 
                        />
                    </div>
                </>))}
            </div>
            <NameDialog/>
            
        </div>
    );
}