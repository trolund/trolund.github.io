export interface ShipProps {
  value: string;
}

export default function Ship({ value }: ShipProps) {
  return (
    <span className="mb-1 mr-2 h-8 grow-0 rounded-full border border-solid border-gray-800 dark:border-gray-600 border-opacity-25 bg-[var(--footer)] dark:bg-slate-950 px-3 py-1 text-[0.9rem]">
      {value}
    </span>
  );
}
