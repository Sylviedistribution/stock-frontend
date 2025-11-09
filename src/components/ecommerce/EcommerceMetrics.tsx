import {
  ArrowDownIcon,
  ArrowUpIcon,
  BoxIconLine,
  GroupIcon,
} from "../../icons";
import Badge from "../ui/badge/Badge";

interface Props {
  salesData: {
    units: number;
    revenue: number;
    profit: number;
    cost: number;
  };
  purchaseData: {
    orders: number;
    cost: number;
    returned: number;
    returned_cost: number;
  };
}

export default function EcommerceMetrics({ salesData, purchaseData }: Props) {
  return (
    <>
      {/* ===== Sales Overview ===== */}
      <div className="flex gap-4 flex-wrap md:gap-6">
        {/* Sales */}
        <div className="rounded-2xl bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
          <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
            <GroupIcon className="text-gray-800 size-6 dark:text-white/90" />
          </div>
          <div className="flex items-end justify-between mt-5">
            <div>
              <span className="text-sm text-gray-500">Sales</span>
              <h4 className="mt-2 font-bold text-gray-800 text-title-sm">
                {salesData.units.toLocaleString()}
              </h4>
            </div>
            <Badge color="success">
              <ArrowUpIcon /> +{((salesData.units / 1000) * 100).toFixed(2)}%
            </Badge>
          </div>
        </div>

        {/* Revenue */}
        <div className="rounded-2xl bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
          <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
            <BoxIconLine className="text-gray-800 size-6 dark:text-white/90" />
          </div>
          <div className="flex items-end justify-between mt-5">
            <div>
              <span className="text-sm text-gray-500">Revenue</span>
              <h4 className="mt-2 font-bold text-gray-800 text-title-sm">
                ₹ {salesData.revenue.toLocaleString()}
              </h4>
            </div>
            <Badge color="success">
              <ArrowUpIcon /> +{((salesData.revenue / 100000) * 100).toFixed(2)}
              %
            </Badge>
          </div>
        </div>

        {/* Profit */}
        <div className="rounded-2xl bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
          <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
            <BoxIconLine className="text-gray-800 size-6 dark:text-white/90" />
          </div>
          <div className="flex items-end justify-between mt-5">
            <div>
              <span className="text-sm text-gray-500">Profit</span>
              <h4 className="mt-2 font-bold text-gray-800 text-title-sm">
                ₹ {salesData.profit.toLocaleString()}
              </h4>
            </div>
            <Badge color="success">
              <ArrowUpIcon /> +{((salesData.profit / 100000) * 100).toFixed(2)}%
            </Badge>
          </div>
        </div>

        {/* Cost */}
        <div className="rounded-2xl bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
          <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
            <BoxIconLine className="text-gray-800 size-6 dark:text-white/90" />
          </div>
          <div className="flex items-end justify-between mt-5">
            <div>
              <span className="text-sm text-gray-500">Cost</span>
              <h4 className="mt-2 font-bold text-gray-800 text-title-sm">
                ₹ {salesData.cost.toLocaleString()}
              </h4>
            </div>
            <Badge color="error">
              <ArrowDownIcon /> {((salesData.cost / 100000) * 100).toFixed(2)}%
            </Badge>
          </div>
        </div>
      </div>

      {/* ===== Purchase Overview ===== */}
      <div className="flex gap-4 flex-wrap md:gap-6 mt-6">
        {/* Orders */}
        <div className="rounded-2xl bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
          <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
            <GroupIcon className="text-gray-800 size-6 dark:text-white/90" />
          </div>
          <div className="flex items-end justify-between mt-5">
            <div>
              <span className="text-sm text-gray-500">Purchases</span>
              <h4 className="mt-2 font-bold text-gray-800 text-title-sm">
                {purchaseData.orders.toLocaleString()}
              </h4>
            </div>
            <Badge color="success">
              <ArrowUpIcon /> +{((purchaseData.orders / 100) * 100).toFixed(1)}%
            </Badge>
          </div>
        </div>

        {/* Cost */}
        <div className="rounded-2xl bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
          <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
            <BoxIconLine className="text-gray-800 size-6 dark:text-white/90" />
          </div>
          <div className="flex items-end justify-between mt-5">
            <div>
              <span className="text-sm text-gray-500">Cost</span>
              <h4 className="mt-2 font-bold text-gray-800 text-title-sm">
                ₹ {purchaseData.cost.toLocaleString()}
              </h4>
            </div>
            <Badge color="error">
              <ArrowDownIcon /> 9.05%
            </Badge>
          </div>
        </div>

        {/* Cancelled */}
        <div className="rounded-2xl bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
          <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
            <BoxIconLine className="text-gray-800 size-6 dark:text-white/90" />
          </div>
          <div className="flex items-end justify-between mt-5">
            <div>
              <span className="text-sm text-gray-500">Cancelled</span>
              <h4 className="mt-2 font-bold text-gray-800 text-title-sm">
                {purchaseData.returned.toLocaleString()}
              </h4>
            </div>
            <Badge color="error">
              <ArrowDownIcon /> 2.1%
            </Badge>
          </div>
        </div>

        {/* Returned */}
        <div className="rounded-2xl bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
          <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
            <BoxIconLine className="text-gray-800 size-6 dark:text-white/90" />
          </div>
          <div className="flex items-end justify-between mt-5">
            <div>
              <span className="text-sm text-gray-500">Return</span>
              <h4 className="mt-2 font-bold text-gray-800 text-title-sm">
                ₹ {purchaseData.returned_cost.toLocaleString()}
              </h4>
            </div>
            <Badge color="error">
              <ArrowDownIcon /> 1.2%
            </Badge>
          </div>
        </div>
      </div>
    </>
  );
}
