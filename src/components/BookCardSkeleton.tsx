const BookCardSkeleton = () => {
  return (
    <div className="overflow-hidden rounded-lg border bg-card shadow-sm">
      <div className="aspect-[2/3] bg-muted animate-pulse" />
      <div className="p-4 space-y-2">
        <div className="h-5 bg-muted rounded animate-pulse" />
        <div className="h-4 bg-muted rounded w-2/3 animate-pulse" />
      </div>
    </div>
  );
};

export default BookCardSkeleton;
