import Router from "@/components/Router";
import { db } from "@/db";
import { usersTable } from "@/db/schema";

type Pageprops = {
    searchParams: {
        username?: string;
        searchString? : string;
      };
}


export default async function Page( {searchParams: { username }}: Pageprops ) {
    if (username) {
        await db
          .insert(usersTable)
          .values({
            username: username,
          })
          .onConflictDoUpdate({
            target: usersTable.username,
            set: {
              username: username,
            },
          })
          .execute();
      }


    return (
    <>
      <Router/>
    </>
    );
}