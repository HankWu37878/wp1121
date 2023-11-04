import { ArrowLeft } from "lucide-react";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import Comment from "@/components/Comment";
import ParticipateButton from "@/components/ParticipateButton";
import CommentInput from "@/components/CommentInput";
import { db } from "@/db";
import { TimeTable, activitiesTable, commentsTable, participantsTable } from "@/db/schema";
import { and, desc, eq } from "drizzle-orm";
import ParticipantsTable from "@/components/ParticipantsTable";
import TabelLabel from "@/components/TableLabel";

type ActivityPageProps = {
    params: {
      // this came from the file name: [tweet_id].tsx
      activity_id: string;
    };
    searchParams: {
      // this came from the query string: ?username=madmaxieee
      username?: string;
    };
  };

export default async function ActivityPage({
    params: { activity_id },
    searchParams: { username },
  }: ActivityPageProps)
{
    const activity_id_num = parseInt(activity_id);

    const errorRedirect = () => {
      const params = new URLSearchParams();
      username && params.set("username", username);
      redirect(`/?${params.toString()}`);
    };

    if (isNaN(activity_id_num)) {
      errorRedirect();
    }

    const [activityData] = await db
    .select({
      id: activitiesTable.id,
      content: activitiesTable.content,
      username: activitiesTable.username,
      createdAt: activitiesTable.createdAt,
      startDate: activitiesTable.startDate,
      endDate: activitiesTable.endDate,
    })
    .from(activitiesTable)
    .where(eq(activitiesTable.id, activity_id_num))
    .execute();

    if (!activityData) {
      errorRedirect();
    }

    const participants = await db
    .select({
      id: participantsTable.id,
    })
    .from(participantsTable)
    .where(eq(participantsTable.activityId, activity_id_num))
    .execute();

    const numParticipants = participants.length;

    const [participated] = await db
    .select({
      id: participantsTable.id,
    })
    .from(participantsTable)
    .where(
      and(
        eq(participantsTable.activityId, activity_id_num),
        eq(participantsTable.username, username ?? ""),
      ),
    )
    .execute();


    const activity = {
      id: activityData.id,
      content: activityData.content,
      createdAt: activityData.createdAt,
      startDate: activityData.startDate,
      endDate: activityData.endDate,
      participated: Boolean(participated),
      participants: numParticipants,
    };

    const comments = await db
    .select({
      id: commentsTable.id,
      content: commentsTable.content,
      username: commentsTable.username,
      createdAt: commentsTable.createdAt,
    })
    .from(commentsTable)
    .where(eq(commentsTable.activityId, activity_id_num))
    .orderBy(desc(commentsTable.createdAt))
    .execute();

    const availableTime = await db.select({
      activityId: TimeTable.activityId,
      username: TimeTable.username,
      row: TimeTable.timeStaterows,
      col: TimeTable.timeStatecols,
    })
    .from(TimeTable) 
    .where(and(eq(TimeTable.activityId, activity_id_num),
            eq(TimeTable.username, username ?? ""),),)
    .execute();

    const TotalTimeState = await db.select({
      activityId: TimeTable.activityId,
      row: TimeTable.timeStaterows,
      col: TimeTable.timeStatecols,
    })
    .from(TimeTable) 
    .where(eq(TimeTable.activityId, activity_id_num))
    .execute();





    
    return (
        <div className="border-2 bg-slate-50 h-screen overflow-scroll flex-col gap-2">
            <div className="flex m-10 justify-between">
                <Link href={{ pathname: "/", query: { username } }}>
                  <ArrowLeft size={24}/>
                </Link>
                <div className="flex-col gap-2 w-full mx-16 space-y-4">
                    <div className="bg-gray-300 flex justify-between h-20 px-4 rounded-md">
                      <p className="text-xl font-semibold my-auto tracking-wider">{activity.content}</p>
                      <p className="my-auto">{numParticipants || 0}人已參加</p>
                    </div>

                    <div className="bg-gray-200 flex justify-between h-8 px-4 rounded-md">
                      <p className="my-auto tracking-wider">From {activity.startDate} to {activity.endDate}</p>
                    </div>
                </div>
                <ParticipateButton
                initialParticipated={activity.participated}
                activityId={activity.id}
                username={username ?? "..."}
                />
                
                
            </div>

            <ParticipantsTable
            available={availableTime} 
            TotalTimeState={TotalTimeState} 
            joined={activity.participated} 
            startDate={activity.startDate} 
            endDate={activity.endDate} 
            participants={numParticipants} 
            activityId={activity.id}/>

            <TabelLabel participants={numParticipants}/>
            <Separator className="mt-24"/>

            
            <div className="text-center mt-10 mx-10">
              <CommentInput
              participated={activity.participated}
              activityId={activity.id}/>
            </div>

            <p className="mx-10 mt-10 text-xl font-semibold tracking-wider">Comments:</p>

            <div className="m-10 mt-5 flex-col space-y-6">
                {comments.map((comment) => 
                <Comment
                key={comment.id}
                AuthorName={comment.username} 
                content={comment.content}
                />)}
            </div>
        </div>);
}

