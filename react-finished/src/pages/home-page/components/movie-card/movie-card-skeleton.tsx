export const MovieCardSkeleton = () => {
  return (
    <div className="animate-pulse rounded-xl bg-accent">
      <div className="flex h-full flex-col gap-6 overflow-hidden rounded-xl p-0 opacity-0">
        <div className="aspect-[2/3] w-full" />
        <div className="my-4 grid gap-1.5 px-6">
          <div className="font-semibold leading-none">.</div>
          <div className="text-sm">.</div>
        </div>
      </div>
    </div>
  );
};
