import AddDialogueButton from "@/components/AddDialogueButton";
import Friends from "@/components/Friends";
import SearchUser from "@/components/SearchUser";
import SideBar from "@/components/SideBar";

type Props = {
  children: React.ReactNode;
};

export default async function RootLayout({ children }: Props) {
  
  
  return (
        <div className="mx-auto flex max-w-6xl border-4 rounded-2xl">
          <SideBar/>
          <main className="flex w-full h-screen">
                <div className="h-screen w-1/2 bg-gray-100 border-x-0 pb-5">
                    <div className="flex justify-between  mt-10 mx-8">
                      <p className="font-medium text-3xl mt-1">Chat</p>
                      <AddDialogueButton/>
                    </div>

                    <div className="m-8 flex-col space-x-2">
                      <SearchUser/>
                    </div>

                    <Friends/>
                </div>
                
                
                <div className="w-1/2">
                  {children}
                </div>
          </main>
        </div>
  );
}
