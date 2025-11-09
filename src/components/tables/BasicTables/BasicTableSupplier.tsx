import { useEffect, useState } from "react";
import SuppliersApi from "../../../api/suppliersApi";
import CategoriesApi from "../../../api/categoriesApi";
import { Supplier } from "../../../types/Supplier";
import { Category } from "../../../types/Category";
import SupplierForm from "../../forms/SupplierForm";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";

export default function Suppliers() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
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

  // === Charger les fournisseurs et catégories ===
  const fetchSuppliers = async (page = 1) => {
    try {
      setLoading(true);
      const [supRes] = await Promise.all([
        SuppliersApi.getAll1(page),
      ]);

      const supplierArray = Array.isArray(supRes.suppliers)
        ? supRes.suppliers
        : Array.isArray(supRes.suppliers)
        ? supRes.suppliers
        : [];

      setSuppliers(supplierArray);
      setMeta(supRes.meta || {});
    } catch (error) {
      console.error("❌ Erreur lors du chargement des fournisseurs :", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

  // Pagination
  const handlePrev = () => {
    if (meta.current_page > 1) fetchSuppliers(meta.current_page - 1);
  };

  const handleNext = () => {
    if (meta.current_page < meta.last_page) fetchSuppliers(meta.current_page + 1);
  };

  if (loading)
    return <div className="text-center text-gray-500 py-10">Chargement...</div>;

  return (
    <div className="p-6 space-y-8">
      {/* === HEADER === */}
      <div className="flex flex-col sm:flex-row justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-700 mb-3 sm:mb-0">
          Suppliers
        </h2>

        <div className="flex gap-2">
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition"
            onClick={openForm}
          >
            Add Supplier
          </button>
          <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 transition">
            Filters
          </button>
          <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 transition">
            Download all
          </button>
        </div>
      </div>

      {/* === MODALE FORM === */}
      {showForm && (
        <SupplierForm
          onClose={closeForm}
          onSupplierAdded={() => {
            fetchSuppliers();
            closeForm();
          }}
          categories={categories}
        />
      )}

      {/* === TABLE === */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-md overflow-x-auto">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableCell isHeader className="text-center text-gray-600 font-semibold">
                Supplier Name
              </TableCell>
              <TableCell isHeader className="text-center text-gray-600 font-semibold">
                Product
              </TableCell>
              <TableCell isHeader className="text-center text-gray-600 font-semibold">
                Contact Number
              </TableCell>
              <TableCell isHeader className="text-center text-gray-600 font-semibold">
                Email
              </TableCell>
              <TableCell isHeader className="text-center text-gray-600 font-semibold">
                Type
              </TableCell>
              <TableCell isHeader className="text-center text-gray-600 font-semibold">
                On the way
              </TableCell>
            </TableRow>
          </TableHeader>

          <TableBody>
            {Array.isArray(suppliers) && suppliers.length > 0 ? (
              suppliers.map((s) => (
                <TableRow key={s.id} className="hover:bg-gray-50 transition duration-150">
                  <TableCell className="text-center font-medium text-gray-800">
                    {s.name}
                  </TableCell>
                  <TableCell className="text-center text-gray-700">
                    {
                    s.product?[0] : "-"}
                  </TableCell>
                  <TableCell className="text-center text-gray-700">
                    {s.phone}
                  </TableCell>
                  <TableCell className="text-center text-gray-700">
                    {s.email}
                  </TableCell>
                  <TableCell
                    className={`text-center font-semibold ${
                      s.takes_back_returns ? "text-green-600" : "text-red-500"
                    }`}
                  >
                    {s.takes_back_returns? "Taking Return" : "Not Taking Return"}
                  </TableCell>
                  <TableCell className="text-center text-gray-700">
                    {s.takes_back_returns ?? "-"}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell className="text-center text-gray-400 py-6">
                  Aucun fournisseur disponible
                </TableCell>
              </TableRow>
            )}
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
