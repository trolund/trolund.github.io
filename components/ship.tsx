export interface ShipProps {
  value: string;
}

export default function Ship({ value }: ShipProps) {
  return (
    <span className="dark:border-gray-600 dark:bg-slate-950 mb-1 mr-2 h-8 grow-0 rounded-full border border-solid border-gray-800 border-opacity-25 bg-[var(--footer)] px-3 py-1 text-[0.9rem]">
      {value}
    </span>
  );
}
