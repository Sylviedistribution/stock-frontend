const BestSellingCategory = () => {
  const categories = [
    { name: "Vegetable", turnover: "₹26,000", increase: "+3.2%" },
    { name: "Instant Food", turnover: "₹22,000", increase: "+2%" },
    { name: "Households", turnover: "₹22,000", increase: "+1.5%" },
  ];

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:bg-gray-900 dark:border-gray-800">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-lg text-gray-800">
          Best Selling Category
        </h2>
        <button className="text-sm text-blue-600">See All</button>
      </div>

      <table className="w-full text-sm text-gray-700">
        <thead>
          <tr className="text-gray-500">
            <th className="text-left pb-2">Category</th>
            <th className="text-left pb-2">Turn Over</th>
            <th className="text-left pb-2">Increase By</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((cat) => (
            <tr key={cat.name} className="border-t border-gray-100">
              <td className="py-2">{cat.name}</td>
              <td className="py-2">{cat.turnover}</td>
              <td className="py-2 text-green-600 font-semibold">
                {cat.increase}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BestSellingCategory;
