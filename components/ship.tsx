export interface ShipProps {
  key: string;
  value: string;
}

export default function Ship({ key, value }: ShipProps) {
  return (
    <span
      key={key}
      style={{
        backgroundColor: 'var(--footer)',
        height: '2rem',
        fontSize: '0.9rem',
        borderWidth: 1,
      }}
      className="mb-1 mr-2 grow-0 rounded-full border-solid border-gray-800 border-opacity-25 px-3 py-1"
    >
      {value}
    </span>
  );
}
