import React from "react";

export function SkeletonCard() {
  return (
    <div className="animate-pulse overflow-hidden rounded-card border border-sand-border bg-pure-white p-4">
      <div className="aspect-[4/5] w-full rounded-xl bg-muted-sand" />
      <div className="mt-4 h-4 w-2/3 rounded bg-muted-sand" />
      <div className="mt-2 h-3 w-1/2 rounded bg-muted-sand" />
      <div className="mt-4 flex gap-2">
        <div className="h-6 w-16 rounded-full bg-muted-sand" />
        <div className="h-6 w-16 rounded-full bg-muted-sand" />
      </div>
    </div>
  );
}

export function SkeletonGrid({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, idx) => (
        <SkeletonCard key={idx} />
      ))}
    </div>
  );
}

