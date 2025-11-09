import EcommerceMetrics from "../../components/ecommerce/EcommerceMetrics";
import EcommerceMetrics1 from "../../components/ecommerce/EcommerceMetrics1";
import MonthlySalesChart from "../../components/ecommerce/MonthlySalesChart";
import StatisticsChart from "../../components/ecommerce/StatisticsChart";
import RecentOrders from "../../components/ecommerce/RecentOrders";
import PageMeta from "../../components/common/PageMeta";
import BascisTableDahboard from "../../components/ecommerce/BasicTablesDashboard";
import dashboardApi from "../../api/dashboardApi";
import { DashboardKPI } from "../../types/Dashboard";
import { TopProduct } from "../../types/Dashboard";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState<DashboardKPI | null>(null);
  const [topProducts, setTopProducts] = useState<TopProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dashboardApi
      .getSummary()
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    dashboardApi
      .getTopProducts()
      .then(setTopProducts)
      .finally(() => setLoading(false));
  }, []);

  console.log("Dashboard data:", data);

  if (loading) return <div className="text-center">Chargement...</div>;
  if (!data)
    return <div className="text-center text-red-500">Aucune donnée.</div>;

  return (
    <>
      <PageMeta
        title="React.js Ecommerce Dashboard | TailAdmin - React.js Admin Dashboard Template"
        description="This is React.js Ecommerce Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 space-y-6 xl:col-span-7">
          <EcommerceMetrics
            salesData={data.sales_last7}
            purchaseData={data.purchase_last7}
          />

          <MonthlySalesChart />

          <BascisTableDahboard />
        </div>
        <div className="col-span-12 space-y-6 xl:col-span-5">
          <EcommerceMetrics1
            quantityInHand={data.quantity_in_hand}
            totalCategories={data.total_categories}
            totalSuppliers={data.total_suppliers}
            toBeReceived={data.to_be_received}
          />

          <StatisticsChart />

          <RecentOrders />
        </div>
      </div>
    </>
  );
}
