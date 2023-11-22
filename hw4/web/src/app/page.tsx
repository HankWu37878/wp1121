import NameDialog from "@/components/NameDialog";


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="w-full h-screen flex items-center justify-center">
        <NameDialog/>
      </div>
    </main>
  );
}

