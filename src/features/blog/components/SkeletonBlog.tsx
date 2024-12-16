import { Skeleton } from "@/components/ui/skeleton";

const SkeletonBlog = () => {
  return (
    <main className="container mx-auto mt-4 max-w-6xl px-4">
      <section className="space-y-2">
        <Skeleton className="h-[22px] w-[10%] rounded-sm" />
        <Skeleton className="h-[22px] w-[40%] rounded-sm" />
        <Skeleton className="h-[22px] w-[15%] rounded-sm" />
        <Skeleton className="sm:5-[200px] h-[400px] rounded-sm" />
      </section>
    </main>
  );
};

export default SkeletonBlog;
