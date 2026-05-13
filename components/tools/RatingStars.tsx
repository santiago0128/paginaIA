type Props = {
  rating: number;
  count?: number;
};

export function RatingStars({ rating, count }: Props) {
  const full = Math.floor(rating);
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex text-base leading-none">
        {Array.from({ length: 5 }, (_, i) => (
          <span key={i} className={i < full ? "text-cyan-400" : "text-slate-700"}>
            ★
          </span>
        ))}
      </div>
      <span className="text-sm text-slate-400">
        {rating.toFixed(1)}{count ? ` (${count})` : ""}
      </span>
    </div>
  );
}
