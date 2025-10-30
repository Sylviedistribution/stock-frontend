import EcommerceMetrics from "../../components/ecommerce/EcommerceMetrics";
import EcommerceMetrics1 from "../../components/ecommerce/EcommerceMetrics1";
import MonthlySalesChart from "../../components/ecommerce/MonthlySalesChart";
import StatisticsChart from "../../components/ecommerce/StatisticsChart";
import RecentOrders from "../../components/ecommerce/RecentOrders";
import PageMeta from "../../components/common/PageMeta";
import BascisTableDahboard from "../../components/ecommerce/BasicTablesDashboard";

export default function Home() {
  return (
    <>
      <PageMeta
        title="React.js Ecommerce Dashboard | TailAdmin - React.js Admin Dashboard Template"
        description="This is React.js Ecommerce Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 space-y-6 xl:col-span-7">
          <EcommerceMetrics />

          <MonthlySalesChart />

          <BascisTableDahboard />
        </div>
        <div className="col-span-12 space-y-6 xl:col-span-5">
          <EcommerceMetrics1 />

          <StatisticsChart />

          <RecentOrders />

        </div>
      </div>
    </>
  );
}
