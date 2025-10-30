const OverviewCard = () => {
  const metrics = [
    { label: "Total Profit", value: "₹21,190" },
    { label: "Revenue", value: "₹18,300" },
    { label: "Sales", value: "₹17,432" },
    { label: "Net purchase value", value: "₹1,17,432" },
    { label: "Net sales value", value: "₹80,432" },
    { label: "MoM Profit", value: "₹30,432" },
    { label: "YoY Profit", value: "₹1,10,432" },
  ];

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:bg-gray-900 dark:border-gray-800">
      <h2 className="font-semibold text-lg mb-4 text-gray-800">Overview</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {metrics.map((m) => (
          <div key={m.label}>
            <p className="text-sm text-gray-500">{m.label}</p>
            <p className="text-lg font-semibold text-gray-800">{m.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OverviewCard;
