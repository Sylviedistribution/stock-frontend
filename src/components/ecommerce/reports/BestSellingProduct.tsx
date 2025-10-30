const BestSellingProduct = () => {
  const products = [
    { product: "Tomato", id: 23567, category: "Vegetable", qty: "225 kg", turnover: "₹17,000", increase: "+2.3%" },
    { product: "Onion", id: 25831, category: "Vegetable", qty: "200 kg", turnover: "₹12,000", increase: "+1.3%" },
    { product: "Maggi", id: 56841, category: "Instant Food", qty: "200 Packet", turnover: "₹10,000", increase: "+1.3%" },
    { product: "Surf Excel", id: 23567, category: "Household", qty: "125 Packet", turnover: "₹9,000", increase: "+1%" },
  ];

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:bg-gray-900 dark:border-gray-800">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-lg text-gray-800">
          Best Selling Product
        </h2>
        <button className="text-sm text-blue-600">See All</button>
      </div>

      <table className="w-full text-sm text-gray-700">
        <thead>
          <tr className="text-gray-500">
            <th className="text-left pb-2">Product</th>
            <th className="text-left pb-2">Product ID</th>
            <th className="text-left pb-2">Category</th>
            <th className="text-left pb-2">Remaining Quantity</th>
            <th className="text-left pb-2">Turn Over</th>
            <th className="text-left pb-2">Increase By</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id} className="border-t border-gray-100">
              <td className="py-2">{p.product}</td>
              <td className="py-2">{p.id}</td>
              <td className="py-2">{p.category}</td>
              <td className="py-2">{p.qty}</td>
              <td className="py-2">{p.turnover}</td>
              <td className="py-2 text-green-600 font-semibold">{p.increase}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BestSellingProduct;
