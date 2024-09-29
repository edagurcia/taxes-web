import { useStats } from "@/hooks";
import { StatsCard } from "./StatsCard";

export const StatsContainer = () => {
  const { thisMonth, lastMonth, actualYear } = useStats();

  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-5 mb-5">
      <StatsCard data={actualYear} />
      <StatsCard data={lastMonth} />
      <StatsCard data={thisMonth} />
    </div>
  );
};
