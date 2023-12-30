import GoShoppingButton from "../../_components/GoShoppingButton";

async function SuccessPage() {
  return (
    <div className="flex h-full w-full flex-wrap justify-center gap-4 rounded-b-xl border-2 px-10">
      <div className="flex h-40 w-full items-end justify-center py-4 text-3xl font-semibold">
        <span>購買成功 !</span>
      </div>
      <div className="flex h-40 w-full items-start justify-center">
        <GoShoppingButton />
      </div>
    </div>
  );
}

export default SuccessPage;
