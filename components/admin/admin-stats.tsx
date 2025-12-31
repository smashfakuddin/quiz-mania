import SummaryCard from "./summary-card";

export default function AdminStats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 w-full">
      <SummaryCard title="Total Created Quiz" link="/quiz" amount={10} />
      <SummaryCard title="Total Question" link="/quiz" amount={100} />
      <SummaryCard title="Draft Quiz" link="/quiz" amount={5} />
      <SummaryCard title="Published Quiz" link="/quiz" amount={5} />
    </div>
  );
}
