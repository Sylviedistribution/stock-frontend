import { useEffect, useState } from "react";
import ProductsApi from "../../../api/productsApi";
import { Product } from "../../../types/Product";
import { DashboardKPI } from "../../../types/Dashboard";
import dashboardApi from "../../../api/dashboardApi";
import ProductForm from "../../forms/ProductForm";

import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";

export default function Inventory() {
  const [products, setProducts] = useState<Product[]>([]);
  const [topSelling, setTopSelling] = useState<
    { product: string; sold: number; remaining: number; price: number }[]
  >([]);
  const [lowStock, setLowStock] = useState<
    { id: number; name: string; quantity: number; threshold: number }[]
  >([]);
  const [summary, setSummary] = useState<DashboardKPI | null>(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const openForm = () => setShowForm(true);
  const closeForm = () => setShowForm(false);

  // Pagination
  const [meta, setMeta] = useState({
    current_page: 1,
    last_page: 1,
    per_page: 10,
    total: 0,
  });

  const totalSold = topSelling.reduce(
    (sum, item) => sum + item.price * item.sold,
    0
  );
  const totalItemSold = topSelling.reduce((sum, item) => sum + item.sold, 0);
  const totalLowStock = lowStock.length;

  // === Fetch global (avec pagination) ===
  const fetchProducts = async (page = 1) => {
    try {
      setLoading(true);
      const [prodRes, summaryRes, topRes, lowRes] = await Promise.all([
        ProductsApi.getAll(page),
        dashboardApi.getSummary(),
        dashboardApi.getTopProducts(),
        dashboardApi.getLowStock(),
      ]);
      setProducts(prodRes.data);
      setMeta(prodRes.meta);
      setSummary(summaryRes);
      setTopSelling(topRes);
      setLowStock(lowRes);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading)
    return <div className="text-center text-gray-500 py-10">Chargement...</div>;
  if (!summary)
    return (
      <div className="text-center text-red-500 py-10">
        Impossible de charger les données du tableau de bord.
      </div>
    );

  // === Pagination actions ===
  const handlePrev = () => {
    if (meta.current_page > 1) fetchProducts(meta.current_page - 1);
  };

  const handleNext = () => {
    if (meta.current_page < meta.last_page)
      fetchProducts(meta.current_page + 1);
  };

  return (
    <div className="p-6 space-y-8">
      {/* === OVERALL INVENTORY === */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 bg-white shadow-md rounded-xl text-center hover:shadow-lg transition duration-200 border border-gray-100">
          <p className="text-gray-500 text-sm mb-1 uppercase tracking-wide">
            Categories
          </p>
          <h3 className="text-3xl font-bold text-blue-600">
            {summary?.total_categories}
          </h3>
          <p className="text-xs text-gray-400 mt-1">Last 7 days</p>
        </div>

        <div className="p-6 bg-white shadow-md rounded-xl text-center hover:shadow-lg transition duration-200 border border-gray-100">
          <p className="text-gray-500 text-sm mb-1 uppercase tracking-wide">
            Total Products
          </p>
          <h3 className="text-3xl font-bold text-indigo-600">
            {summary?.total_products}
          </h3>
          <p className="text-xs text-gray-400 mt-1">Last 7 days</p>
          <p className="text-md font-semibold text-green-500 mt-2">
            +{summary?.sales_last7?.revenue?.toLocaleString()} XFA
          </p>
          <p className="text-xs text-gray-400">Revenue</p>
        </div>

        <div className="p-6 bg-white shadow-md rounded-xl text-center hover:shadow-lg transition duration-200 border border-gray-100">
          <p className="text-gray-500 text-sm mb-1 uppercase tracking-wide">
            Top Selling
          </p>
          <h3 className="text-3xl font-bold text-purple-600">
            {totalItemSold}
          </h3>
          <p className="text-xs text-gray-400 mt-1">Items sold (7 days)</p>
          <p className="text-md font-semibold text-gray-700 mt-2">
            {totalSold.toLocaleString()} XFA
          </p>
          <p className="text-xs text-gray-400">Total revenue</p>
        </div>

        <div className="p-6 bg-white shadow-md rounded-xl text-center hover:shadow-lg transition duration-200 border border-gray-100">
          <p className="text-gray-500 text-sm mb-1 uppercase tracking-wide">
            Low Stocks
          </p>
          <h3 className="text-3xl font-bold text-amber-500">{totalLowStock}</h3>
          <p className="text-xs text-gray-400 mt-1">Ordered</p>
          <h3 className="text-2xl font-semibold text-red-500 mt-3">0</h3>
          <p className="text-xs text-gray-400">Not in stock</p>
        </div>
      </div>

      {/* === TABLE PRODUCTS === */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-md">
        {/* Header actions */}
        <div className="flex flex-col sm:flex-row justify-between items-center px-6 py-4 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-700 mb-3 sm:mb-0">
            Products
          </h3>
          <div className="flex gap-2">
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition"
              onClick={openForm}
            >
              Add Product
            </button>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 transition">
              Filters
            </button>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 transition">
              Download All
            </button>
          </div>
        </div>

        {/* === Modale contenant le formulaire === */}
        {showForm && (
          <div className="fixed inset-0 flex justify-center items-center ">
            <div className="w-[90%] sm:w-[600px] rounded-xl shadow-lg p-3 relative bg-white">
              <ProductForm
                onClose={closeForm}
                onProductAdded={() => {
                  fetchProducts(); // recharge la liste
                  closeForm(); // ferme la modale
                }}
              />
            </div>
          </div>
        )}

        {/* Table */}
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-gray-50">
              <TableRow>
                <TableCell
                  isHeader
                  className="text-center text-gray-600 font-semibold"
                >
                  Product
                </TableCell>
                <TableCell
                  isHeader
                  className="text-center text-gray-600 font-semibold"
                >
                  Buying Price
                </TableCell>
                <TableCell
                  isHeader
                  className="text-center text-gray-600 font-semibold"
                >
                  Quantity
                </TableCell>
                <TableCell
                  isHeader
                  className="text-center text-gray-600 font-semibold"
                >
                  Threshold
                </TableCell>
                <TableCell
                  isHeader
                  className="text-center text-gray-600 font-semibold"
                >
                  Expiry Date
                </TableCell>
                <TableCell
                  isHeader
                  className="text-center text-gray-600 font-semibold"
                >
                  Status
                </TableCell>
              </TableRow>
            </TableHeader>

            <TableBody>
              {products.map((p) => (
                <TableRow
                  key={p.id}
                  className="hover:bg-gray-50 transition duration-150"
                >
                  <TableCell className="text-center font-medium text-gray-800">
                    {p.name}
                  </TableCell>
                  <TableCell className="text-center text-gray-700">
                    {p.buying_price} FCFA
                  </TableCell>
                  <TableCell className="text-center text-gray-700">
                    {p.quantity} Paquets
                  </TableCell>
                  <TableCell className="text-center text-gray-700">
                    {p.threshold} Paquets
                  </TableCell>
                  <TableCell className="text-center text-gray-700">
                    {p.expiry_date}
                  </TableCell>
                  <TableCell
                    className={`text-center font-semibold ${
                      p.quantity === 0
                        ? "text-red-600"
                        : p.quantity < p.threshold
                        ? "text-amber-500"
                        : "text-green-600"
                    }`}
                  >
                    {p.quantity === 0
                      ? "Out of stock"
                      : p.quantity < p.threshold
                      ? "Low stock"
                      : "In stock"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center px-6 py-4 border-t border-gray-100 text-sm text-gray-600">
          <button
            onClick={handlePrev}
            disabled={meta.current_page === 1}
            className={`flex items-center gap-1 px-3 py-1 border rounded-md ${
              meta.current_page === 1
                ? "text-gray-400 border-gray-200 cursor-not-allowed"
                : "text-gray-700 border-gray-300 hover:bg-gray-50"
            }`}
          >
            <ArrowLeftIcon size={16} /> Previous
          </button>

          <p>
            Page <span className="font-semibold">{meta.current_page}</span> of{" "}
            <span className="font-semibold">{meta.last_page}</span>
          </p>

          <button
            onClick={handleNext}
            disabled={meta.current_page === meta.last_page}
            className={`flex items-center gap-1 px-3 py-1 border rounded-md ${
              meta.current_page === meta.last_page
                ? "text-gray-400 border-gray-200 cursor-not-allowed"
                : "text-gray-700 border-gray-300 hover:bg-gray-50"
            }`}
          >
            Next <ArrowRightIcon size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
