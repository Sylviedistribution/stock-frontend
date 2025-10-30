import OverviewCard from "../components/ecommerce/reports/OverviewCard";
import ProfitRevenueChart from "../components/ecommerce/reports/ProfitRevenueChart";
import BestSellingCategory from "../components/ecommerce/reports/BestSellingCategory";
import BestSellingProduct from "../components/ecommerce/reports/BestSellingProduct";

const ReportsPage = () => {
  return (
    <div className="p-6 space-y-6">

      {/* Overview + Category */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <OverviewCard />
        </div>
        <div>
          <BestSellingCategory />
        </div>
      </div>

      {/* Chart */}
      <ProfitRevenueChart />

      {/* Product Table */}
      <BestSellingProduct />
    </div>
  );
};

export default ReportsPage;
