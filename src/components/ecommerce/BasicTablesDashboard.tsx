import ComponentCard from "../common/ComponentCard";
import PageMeta from "../common/PageMeta";
import BasicTableDashboard from "../tables/BasicTables/BasicTableDashboard";

export default function BasicTables() {
  return (
    <>
      <PageMeta
        title="React.js Basic Tables Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js Basic Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <div className="space-y-6">
        <ComponentCard title="Top Selling Stocks">
          <BasicTableDashboard />
        </ComponentCard>
      </div>
    </>
  );
}
