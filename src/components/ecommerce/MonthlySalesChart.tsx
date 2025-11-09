import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { useEffect, useState } from "react";
import dashboardApi from "../../api/dashboardApi";

interface ChartPoint {
  month: string;
  sales: number;
  purchases: number;
}

export default function MonthlySalesChart() {
  const [chartData, setChartData] = useState<ChartPoint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dashboardApi
      .getSalesVsPurchases()
      .then((data) => {
        // ⚙️ S'assurer que les mois sont triés
        const sorted = data.sort((a, b) => a.month.localeCompare(b.month));
        setChartData(sorted);
      })
      .finally(() => setLoading(false));
  }, []);

  const options: ApexOptions = {
    chart: {
      fontFamily: "Outfit, sans-serif",
      type: "bar",
      height: 360,
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "45%",
        borderRadius: 6,
      },
    },
    colors: ["#00C49F", "#0088FE"], // ✅ Vert pour les ventes, bleu pour les achats
    dataLabels: { enabled: false },
    stroke: { show: true, width: 3, colors: ["transparent"] },
    xaxis: {
      categories: chartData.map((p) => p.month),
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: {
        rotate: -45,
        formatter: (val: string) => val.replace("2025-", ""), // Simplifie l’affichage du mois
      },
    },
    legend: {
      show: true,
      position: "top",
      horizontalAlign: "left",
      fontFamily: "Outfit",
    },
    grid: { yaxis: { lines: { show: true } } },
    tooltip: {
      y: {
        formatter: (val: number) => `${val.toLocaleString()} F`,
      },
    },
  };

  const series = [
    { name: "Ventes", data: chartData.map((p) => p.sales) },
    { name: "Commandes", data: chartData.map((p) => p.purchases) },
  ];

  if (loading)
    return (
      <div className="text-center py-10 text-gray-500">
        Chargement du graphique...
      </div>
    );

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
          Comparaison des ventes et commandes
        </h3>
      </div>

      <div className="max-w-full overflow-x-auto custom-scrollbar">
        <div className="-ml-5 min-w-[650px] xl:min-w-full pl-2">
          <Chart options={options} series={series} type="bar" height={365} />
        </div>
      </div>
    </div>
  );
}
