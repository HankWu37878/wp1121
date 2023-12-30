import HeaderBar from "./_components/HeaderBar";
import PageTab from "./_components/PageTab";

type Props = {
  children: React.ReactNode;
};
export default async function WarehouseLayout({ children }: Props) {
  return (
    <main className="mx-auto flex h-screen max-w-7xl flex-col">
      <HeaderBar />
      <PageTab/>
      <div className="w-full">{children}</div>
    </main>
  );
}
