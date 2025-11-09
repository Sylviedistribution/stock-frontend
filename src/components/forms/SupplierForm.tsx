import { useState, FormEvent } from "react";
import SuppliersApi from "../../api/suppliersApi";
import { Category } from "../../types/Category";
import { Supplier } from "../../types/Supplier";

interface SupplierFormProps {
  onClose: () => void;
  onSupplierAdded: (supplier: Supplier) => void;
  categories: Category[];
}

export default function SupplierForm({
  onClose,
  onSupplierAdded,
  categories,
}: SupplierFormProps) {
  const [formData, setFormData] = useState<any>({
    name: "",
    product: "",
    category_id: 0,
    buying_price: 0,
    contact_number: "",
    email: "",
    is_taking_return: false,
    on_the_way: null,
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]:
        type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : name === "buying_price" || name === "category_id"
          ? Number(value)
          : value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await SuppliersApi.create(formData);
      setMessage("✅ Supplier added successfully!");
      onSupplierAdded(res.data);
      setTimeout(onClose, 1000);
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to save supplier.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed top-25 inset-0 z-50 flex justify-center items-center">
      <div className="bg-white w-[90%] sm:w-[450px] rounded-2xl shadow-2xl p-6 animate-fadeIn overflow-y-auto max-h-[90vh]">
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h2 className="text-xl font-bold text-gray-800">New Supplier</h2>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 text-2xl"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Supplier Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">
              Supplier Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter supplier name"
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-200"
            />
          </div>

          {/* Product */}
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">
              Product
            </label>
            <input
              type="text"
              name="product"
              value={formData.product}
              onChange={handleChange}
              placeholder="Enter product"
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-200"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">
              Category
            </label>
            <select
              name="category_id"
              value={formData.category_id}
              onChange={handleChange}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-200"
            >
              <option value="">Select category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Buying Price */}
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">
              Buying Price
            </label>
            <input
              type="number"
              name="buying_price"
              value={formData.buying_price}
              onChange={handleChange}
              placeholder="Enter buying price"
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-200"
            />
          </div>

          {/* Contact Number */}
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">
              Contact Number
            </label>
            <input
              type="text"
              name="contact_number"
              value={formData.contact_number}
              onChange={handleChange}
              placeholder="Enter supplier contact number"
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-200"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter supplier email"
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-200"
            />
          </div>

          {/* Type */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() =>
                setFormData({ ...formData, is_taking_return: false })
              }
              className={`px-4 py-2 rounded-md border ${
                !formData.is_taking_return
                  ? "bg-gray-200 border-gray-400"
                  : "border-gray-300"
              }`}
            >
              Not taking return
            </button>

            <button
              type="button"
              onClick={() =>
                setFormData({ ...formData, is_taking_return: true })
              }
              className={`px-4 py-2 rounded-md border ${
                formData.is_taking_return
                  ? "bg-blue-100 border-blue-400"
                  : "border-gray-300"
              }`}
            >
              Taking return
            </button>
          </div>

          {/* Message */}
          {message && (
            <p
              className={`text-center text-sm ${
                message.startsWith("✅") ? "text-green-600" : "text-red-600"
              }`}
            >
              {message}
            </p>
          )}

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Discard
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`px-4 py-2 text-white rounded-md ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loading ? "Saving..." : "Add Supplier"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
