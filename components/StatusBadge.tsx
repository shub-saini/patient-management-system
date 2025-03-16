import clsx from "clsx";
import Image from "next/image";

import { StatusIcon } from "@/constants";

export const StatusBadge = ({ status }: { status: Status }) => {
  // Use the same color mapping as StatCard for consistency
  const colorMap = {
    scheduled: "border-green-500/30 bg-green-500/10 text-green-500",
    pending: "border-amber-500/30 bg-amber-500/10 text-amber-500",
    cancelled: "border-red-500/30 bg-red-500/10 text-red-500",
  };

  // Get the correct color class based on status
  const colorClass =
    colorMap[status] || "border-gray-500/30 bg-gray-500/10 text-gray-500";

  return (
    <div
      className={`flex w-fit items-center gap-2 rounded-full px-4 py-2 border backdrop-blur-sm ${colorClass}`}
    >
      <div className='rounded-full bg-dark-300/50 p-1 flex items-center justify-center'>
        <Image
          src={StatusIcon[status]}
          alt={status}
          width={16}
          height={16}
          className='h-3 w-3'
        />
      </div>
      <p className='text-[12px] leading-[16px] font-semibold capitalize'>
        {status}
      </p>
    </div>
  );
};
