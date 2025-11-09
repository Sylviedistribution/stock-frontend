import {
  ArrowUpIcon,
  BoxIconLine,
  GroupIcon,
} from "../../icons";
import Badge from "../ui/badge/Badge";

interface EcommerceMetrics1Props {
  quantityInHand: number;
  totalCategories: number;
  totalSuppliers: number;
  toBeReceived: number;
}

export default function EcommerceMetrics1({
  quantityInHand,
  totalCategories,
  totalSuppliers,
  toBeReceived,
}: EcommerceMetrics1Props) {
  const metrics = [
    {
      label: "Quantite en stock",
      value: quantityInHand,
      color: "success",
      icon: <BoxIconLine className="text-gray-800 size-6 dark:text-white/90" />,
    },
    {
      label: "Arrivages",
      value: toBeReceived,
      color: "info",
      icon: <GroupIcon className="text-gray-800 size-6 dark:text-white/90" />,
    },
    {
      label: "Fournisseurs",
      value: totalSuppliers,
      color: "warning",
      icon: <BoxIconLine className="text-gray-800 size-6 dark:text-white/90" />,
    },
    {
      label: "Categories",
      value: totalCategories,
      color: "error",
      icon: <GroupIcon className="text-gray-800 size-6 dark:text-white/90" />,
    },
  ];

  return (
    <>
      <div className="flex flex-wrap gap-4 md:gap-6 justify-between">
        {metrics.map((item, index) => (
          <div
            key={index}
            className="flex-1 min-w-[200px] rounded-2xl bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]"
          >
            <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
              {item.icon}
            </div>

            <div className="flex items-end justify-between mt-5">
              <div>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {item.label}
                </span>
                <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
                  {item.value}
                </h4>
              </div>
              <Badge>
                <ArrowUpIcon /> +{((item.value / 1000) * 100).toFixed(2)}%
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
