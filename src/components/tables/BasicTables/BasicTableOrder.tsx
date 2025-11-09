import { useEffect, useState } from "react";
import OrdersApi from "../../../api/ordersApi";
import dashboardApi from "../../../api/dashboardApi";
import { PurchaseOrder } from "../../../types/Order";
import OrderForm from "../../forms/PurchaseOrderForm";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";
import { DashboardKPI } from "../../../types/Dashboard";

export default function Orders() {
  const [orders, setOrders] = useState<PurchaseOrder[]>([]);
  const [summary, setSummary] =  useState<DashboardKPI | null>(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  // Pagination meta
  const [meta, setMeta] = useState({
    current_page: 1,
    last_page: 1,
    per_page: 10,
    total: 0,
  });

  const openForm = () => setShowForm(true);
  const closeForm = () => setShowForm(false);

  // === Charger les commandes et le résumé ===
  const fetchOrders = async (page = 1) => {
    try {
      setLoading(true);
      const [ordersRes, summaryRes] = await Promise.all([
        OrdersApi.getAll(page),
        dashboardApi.getSummary(),
      ]);
      setOrders(ordersRes.orders);
      setMeta(ordersRes.meta);
      setSummary(summaryRes);
    } catch (error) {
      console.error("❌ Erreur lors du chargement des commandes :", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // === Pagination actions ===
  const handlePrev = () => {
    if (meta.current_page > 1) fetchOrders(meta.current_page - 1);
  };

  const handleNext = () => {
    if (meta.current_page < meta.last_page) fetchOrders(meta.current_page + 1);
  };

  // === États de chargement ===
  if (loading)
    return <div className="text-center text-gray-500 py-10">Chargement...</div>;

  return (
    <div className="p-6 space-y-8">
      {/* === OVERALL ORDERS === */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 bg-white shadow-md rounded-xl text-center border border-gray-100">
          <p className="text-gray-500 text-sm mb-1 uppercase tracking-wide">
            Total Orders
          </p>
          <h3 className="text-3xl font-bold text-blue-600">
            {summary?.purchase_last7.orders || 0}
          </h3>
          <p className="text-xs text-gray-400 mt-1">Last 7 days</p>
        </div>

        <div className="p-6 bg-white shadow-md rounded-xl text-center border border-gray-100">
          <p className="text-gray-500 text-sm mb-1 uppercase tracking-wide">
            Total Received
          </p>
          <h3 className="text-3xl font-bold text-indigo-600">
            {summary?.to_be_received || 0}
          </h3>
          <p className="text-xs text-gray-400 mt-1">Last 7 days</p>
          <p className="text-md font-semibold text-green-500 mt-2">
            +{summary?.purchase_last7.cost?.toLocaleString() || 0} FCFA
          </p>
        </div>

        <div className="p-6 bg-white shadow-md rounded-xl text-center border border-gray-100">
          <p className="text-gray-500 text-sm mb-1 uppercase tracking-wide">
            Total Returned
          </p>
          <h3 className="text-3xl font-bold text-purple-600">
            {summary?.purchase_last7.returned|| 0}
          </h3>
          <p className="text-xs text-gray-400 mt-1">Last 7 days</p>
          <p className="text-md font-semibold text-gray-700 mt-2">
            {summary?.purchase_last7.returned_cost?.toLocaleString() || 0} FCFA
          </p>
        </div>

        <div className="p-6 bg-white shadow-md rounded-xl text-center border border-gray-100">
          <p className="text-gray-500 text-sm mb-1 uppercase tracking-wide">
            On the way
          </p>
          <h3 className="text-3xl font-bold text-amber-500">
            {summary?.purchase_last7.on_the_way || 0}
          </h3>
          <p className="text-xs text-gray-400 mt-1">Ordered</p>
          <p className="text-md font-semibold text-red-500 mt-2">
            {summary?.purchase_last7.on_the_way_cost?.toLocaleString() || 0} FCFA
          </p>
        </div>
      </div>

      {/* === HEADER === */}
      <div className="flex flex-col sm:flex-row justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-700 mb-3 sm:mb-0">
          Orders
        </h2>

        <div className="flex gap-2">
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition"
            onClick={openForm}
          >
            Add Order
          </button>
          <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 transition">
            Filters
          </button>
          <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 transition">
            Order History
          </button>
        </div>
      </div>

      {/* === MODALE FORM === */}
      {showForm && (
        <div className="fixed inset-0 flex justify-center items-center ">
          <div className="w-[90%] sm:w-[600px] rounded-xl shadow-lg p-3 relative bg-white">
            <OrderForm
              onClose={closeForm}
              onOrderAdded={() => {
                fetchOrders();
                closeForm();
              }}
            />
          </div>
        </div>
      )}

      {/* === TABLE === */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-md overflow-x-auto">
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
                Order Value
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
                Order ID
              </TableCell>
              <TableCell
                isHeader
                className="text-center text-gray-600 font-semibold"
              >
                Expected Delivery
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
            {orders.map((o) => (
              <TableRow
                key={o.id}
                className="hover:bg-gray-50 transition duration-150"
              >
                <TableCell className="text-center font-medium text-gray-800">
                  {o.product?.name}
                </TableCell>
                <TableCell className="text-center text-gray-700">
                  {o.order_value.toLocaleString()} FCFA
                </TableCell>
                <TableCell className="text-center text-gray-700">
                  {o.quantity} Paquets
                </TableCell>
                <TableCell className="text-center text-gray-700">
                  {o.id}
                </TableCell>
                <TableCell className="text-center text-gray-700">
                  {o.expected_date}
                </TableCell>
                <TableCell
                  className={`text-center font-semibold ${
                    o.status?.toLowerCase() === "delayed"
                      ? "text-orange-500"
                      : o.status?.toLowerCase() === "confirmed"
                      ? "text-blue-500"
                      : o.status?.toLowerCase() === "out-for-delivery"
                      ? "text-green-600"
                      : o.status?.toLowerCase() === "returned"
                      ? "text-gray-500"
                      : "text-gray-400"
                  }`}
                >
                  {o.status}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* === PAGINATION === */}
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
  );
}
