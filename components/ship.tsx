import { Fragment } from "react";

export type ShipProps = {
  value: any;
  key: any;
}

export default function Ship({ value, key }: ShipProps) {
  return (
    <Fragment key={key}>
      <span style={{ backgroundColor: "var(--footer)", height: "2rem", fontSize: "0.9rem", borderWidth: 1 }} className="px-3 py-1 mb-1 border-solid border-gray-800 border-opacity-25 rounded-full mr-2 grow-0">{value}</span>
    </Fragment>
  )
}
