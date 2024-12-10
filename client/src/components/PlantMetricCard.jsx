import * as React from "react";

export default function PlantMetricCard({ icon, title, value, unit }) {
  return (
    <div className="flex flex-col grow items-center px-16 py-16 w-full text-black rounded-xl border-2 border-black border-solid bg-stone-200 max-md:px-5 max-md:mt-5">
      <img
        loading="lazy"
        src={icon}
        alt={`${title} icon`}
        className="object-contain aspect-square w-[43px]"
      />
      <div className="mt-6 text-3xl tracking-tighter">{title}</div>
      <div className="self-stretch mt-6 text-6xl tracking-tighter max-md:text-4xl">
        {value} {unit}
      </div>
    </div>
  );
}
