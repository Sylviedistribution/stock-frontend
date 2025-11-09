import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { useEffect, useState } from "react";
import dashboardApi from "../../api/dashboardApi";
import ChartTab from "../common/ChartTab";
import { OrderSummary } from "../../types/Dashboard";

export default function StatisticsChart() {
  const [data, setData] = useState<OrderSummary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dashboardApi
      .getOrderSummary()
      .then((res: OrderSummary[]) => {
        const sorted = res.sort((a, b) => a.month.localeCompare(b.month));
        setData(sorted);
      })
      .finally(() => setLoading(false));
  }, []);

  console.log("Order Summary Data:", data);
  
  const options: ApexOptions = {
    legend: {
      show: true,
      position: "top",
      horizontalAlign: "left",
    },
    colors: ["#00C49F", "#465FFF"], // Vert = livrées, Bleu = passées
    chart: {
      fontFamily: "Outfit, sans-serif",
      height: 310,
      type: "line",
      toolbar: { show: false },
    },
    stroke: {
      curve: "smooth",
      width: [3, 3],
    },
    fill: {
      type: "gradient",
      gradient: {
        opacityFrom: 0.55,
        opacityTo: 0,
      },
    },
    markers: {
      size: 4,
      strokeColors: "#fff",
      strokeWidth: 2,
      hover: { size: 6 },
    },
    dataLabels: { enabled: false },
    grid: { yaxis: { lines: { show: true } } },
    xaxis: {
      categories: data.map((p) => p.month.replace("2025-", "")),
      axisBorder: { show: false },
      axisTicks: { show: false },
      tooltip: { enabled: false },
    },
    tooltip: {
      y: {
        formatter: (val: number) => `${val} commandes`,
      },
    },
  };

  const series = [
    { name: "Commandes passées", data: data.map((p) => p.ordered) },
    { name: "Commandes livrées", data: data.map((p) => p.delivered) },
  ];

  if (loading)
    return (
      <div className="text-center py-10 text-gray-500">
        Chargement des statistiques...
      </div>
    );

  return (
    <div className="rounded-2xl border border-gray-200 bg-white px-5 pb-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
      <div className="flex flex-col gap-5 mb-6 sm:flex-row sm:justify-between">
        <div className="w-full">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Commandes passées vs livrées
          </h3>
        </div>
        <div className="flex items-start w-full gap-3 sm:justify-end">
          <ChartTab />
        </div>
      </div>

      <div className="max-w-full overflow-x-auto custom-scrollbar">
        <div className="min-w-[1000px] xl:min-w-full">
          <Chart options={options} series={series} type="area" height={310} />
        </div>
      </div>
    </div>
  );
}
