import { useState, FormEvent, useEffect } from "react";
import OrdersApi from "../../api/ordersApi";
import { PurchaseOrder } from "../../types/Order";
import CategoriesApi from "../../api/categoriesApi";
import { Category } from "../../types/Category";

interface PurchaseOrderFormProps {
  onClose: () => void;
  onOrderAdded: (order: PurchaseOrder) => void;
  orderToEdit?: PurchaseOrder | null;
}

export default function PurchaseOrderForm({
  onClose,
  onOrderAdded,
  orderToEdit = null,
}: PurchaseOrderFormProps) {
  const [formData, setFormData] = useState<any>(
    orderToEdit || {
      product_id: "",
      category_id: null,
      order_value: null,
      quantity: null,
      unit: "",
      buying_price: null,
      delivery_date: "",
      notify: false,
      produxt_name: "",
    }
  );

  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Charger les catégories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await CategoriesApi.getAll();
        setCategories(res.data?.data || res.data || []);
      } catch (error) {
        console.error("❌ Erreur lors du chargement des catégories :", error);
      }
    };
    fetchCategories();

    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  // Gestion des changements
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type, } = e.target;
    setFormData({
      ...formData,
      [name]:
        type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : name === "order_value" ||
            name === "buying_price" ||
            name === "quantity" ||
            name === "category_id"
          ? Number(value)
          : value,
    });
  };

  // Validation
  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.product_name.trim())
      newErrors.product_name = "Le nom du produit est requis.";
    if (!formData.product_id.trim())
      newErrors.product_id = "L'identifiant produit est requis.";
    if (!formData.category_id) newErrors.category_id = "Catégorie requise.";
    if (formData.order_value <= 0)
      newErrors.order_value = "Valeur de commande invalide.";
    if (formData.quantity <= 0)
      newErrors.quantity = "Quantité invalide.";
    if (!formData.unit.trim()) newErrors.unit = "L’unité est requise.";
    if (formData.buying_price <= 0)
      newErrors.buying_price = "Prix d’achat invalide.";
    if (!formData.delivery_date)
      newErrors.delivery_date = "Date de livraison requise.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Soumission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setMessage("");

    try {
      let response;
      if (orderToEdit) {
        response = await OrdersApi.update(orderToEdit.id!, formData);
        setMessage("✅ Commande mise à jour avec succès !");
      } else {
        response = await OrdersApi.create(formData);
        setMessage("✅ Commande ajoutée avec succès !");
      }
      onOrderAdded(response.data);
      setTimeout(onClose, 1000);
    } catch (error) {
      console.error(error);
      setMessage("❌ Erreur lors de la sauvegarde.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed top-25 inset-0 z-50 flex justify-center items-center"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white w-full sm:w-[400px] md:w-[500px] h-full shadow-xl rounded-l-2xl overflow-y-auto animate-slideInRight p-6">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-6 border-b pb-2">
          <h2 className="text-xl font-bold text-gray-800">New Order</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 text-2xl"
          >
            ✕
          </button>
        </div>

        {/* FORMULAIRE */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Product Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">
              Product Name
            </label>
            <input
              type="text"
              name="product_name"
              value={formData.product_name}
              onChange={handleChange}
              placeholder="Enter product name"
              className="w-full p-2 border rounded-md text-gray-700 focus:ring-2 focus:ring-blue-200"
            />
            {errors.product_name && (
              <p className="text-red-500 text-xs">{errors.product_name}</p>
            )}
          </div>

          {/* Product ID */}
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">
              Product ID
            </label>
            <input
              type="text"
              name="product_id"
              value={formData.product_id}
              onChange={handleChange}
              placeholder="Enter product ID"
              className="w-full p-2 border rounded-md text-gray-700 focus:ring-2 focus:ring-blue-200"
            />
            {errors.product_id && (
              <p className="text-red-500 text-xs">{errors.product_id}</p>
            )}
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
              className="w-full p-2 border rounded-md text-gray-700 focus:ring-2 focus:ring-blue-200"
            >
              <option value="">Select product category</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
            {errors.category_id && (
              <p className="text-red-500 text-xs">{errors.category_id}</p>
            )}
          </div>

          {/* Order Value */}
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">
              Order value
            </label>
            <input
              type="number"
              name="order_value"
              value={formData.order_value}
              onChange={handleChange}
              placeholder="Enter order value"
              className="w-full p-2 border rounded-md text-gray-700 focus:ring-2 focus:ring-blue-200"
            />
            {errors.order_value && (
              <p className="text-red-500 text-xs">{errors.order_value}</p>
            )}
          </div>

          {/* Quantity */}
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">
              Quantity
            </label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              placeholder="Enter product quantity"
              className="w-full p-2 border rounded-md text-gray-700 focus:ring-2 focus:ring-blue-200"
            />
            {errors.quantity && (
              <p className="text-red-500 text-xs">{errors.quantity}</p>
            )}
          </div>

          {/* Unit */}
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">
              Unit
            </label>
            <input
              type="text"
              name="unit"
              value={formData.unit}
              onChange={handleChange}
              placeholder="Enter product unit"
              className="w-full p-2 border rounded-md text-gray-700 focus:ring-2 focus:ring-blue-200"
            />
            {errors.unit && (
              <p className="text-red-500 text-xs">{errors.unit}</p>
            )}
          </div>

          {/* Buying Price */}
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">
              Buying price
            </label>
            <input
              type="number"
              name="buying_price"
              value={formData.buying_price}
              onChange={handleChange}
              placeholder="Enter buying price"
              className="w-full p-2 border rounded-md text-gray-700 focus:ring-2 focus:ring-blue-200"
            />
            {errors.buying_price && (
              <p className="text-red-500 text-xs">{errors.buying_price}</p>
            )}
          </div>

          {/* Delivery Date */}
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">
              Date of delivery
            </label>
            <input
              type="date"
              name="delivery_date"
              value={formData.delivery_date}
              onChange={handleChange}
              className="w-full p-2 border rounded-md text-gray-700 focus:ring-2 focus:ring-blue-200"
            />
            {errors.delivery_date && (
              <p className="text-red-500 text-xs">{errors.delivery_date}</p>
            )}
          </div>

          {/* Notify checkbox */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="notify"
              checked={formData.notify}
              onChange={handleChange}
              className="w-4 h-4"
            />
            <label className="text-sm text-gray-600">
              Notify on the date of delivery
            </label>
          </div>

          {/* Message */}
          {message && (
            <div className="text-center text-sm font-medium mt-2">
              <p
                className={`${
                  message.startsWith("✅") ? "text-green-600" : "text-red-600"
                }`}
              >
                {message}
              </p>
            </div>
          )}

          {/* Boutons */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
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
              {loading
                ? "Saving..."
                : orderToEdit
                ? "Update Order"
                : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
