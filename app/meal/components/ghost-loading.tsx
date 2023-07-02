export function GhostLoading() {
  return (
    <>
      <GhostLoadingItem />
      <GhostLoadingItem />
      <GhostLoadingItem />
      <GhostLoadingItem />
      <GhostLoadingItem />
      <GhostLoadingItem />
      <GhostLoadingItem />
    </>
  );
}

function GhostLoadingItem() {
  return (
    <div className="w-full pb-6 last:pb-0">
      <div className="flex animate-pulse gap-x-4">
        <div className="h-10 w-10 rounded-full bg-gray-700"></div>
        <div className="flex flex-1 flex-col gap-2 py-1">
          <div className="h-2 rounded bg-gray-700"></div>
          <div className="h-2 rounded bg-gray-700"></div>
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2 h-2 rounded bg-gray-700"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
