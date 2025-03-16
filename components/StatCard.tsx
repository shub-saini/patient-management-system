import clsx from "clsx";
import Image from "next/image";

// Update the type to match status types
type StatCardProps = {
  type: "scheduled" | "pending" | "cancelled";
  count: number;
  label: string;
  icon: string;
};

export const StatCard = ({ count = 0, label, icon, type }: StatCardProps) => {
  // Map card types to glassy color classes - consistent with StatusBadge
  const colorMap = {
    scheduled: "border-green-500/30 bg-green-500/10 text-green-500",
    pending: "border-amber-500/30 bg-amber-500/10 text-amber-500",
    cancelled: "border-red-500/30 bg-red-500/10 text-red-500",
  };

  // Get the correct color classes based on type
  const colorClass =
    colorMap[type] || "border-gray-500/30 bg-gray-500/10 text-gray-500";

  return (
    <div
      className={`flex flex-1 flex-col gap-6 rounded-2xl ${colorClass} border backdrop-blur-sm p-6 shadow-sm`}
    >
      <div className='flex items-center gap-4'>
        <div className='rounded-full bg-dark-300/50 p-2'>
          <Image
            src={icon}
            height={24}
            width={24}
            alt={`${type} icon`}
            className='size-6 w-fit'
          />
        </div>
        <h2 className='text-[32px] leading-[36px] font-bold'>{count}</h2>
      </div>

      <p className='text-[14px] leading-[18px] font-normal text-dark-700'>
        {label}
      </p>
    </div>
  );
};
