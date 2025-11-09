import { useState, useEffect, FormEvent } from "react";
import { Product } from "../../types/Product";
import { Category } from "../../types/Category";
import { Supplier } from "../../types/Supplier";
import productsApi from "../../api/productsApi";
import CategoriesApi from "../../api/categoriesApi";
import SuppliersApi from "../../api/suppliersApi";

interface ProductFormProps {
  onClose: () => void;
  onProductAdded: (product: Product) => void;
  productToEdit?: Product | null; // ✅ optionnel : pour modifier un produit
}

export default function ProductForm({
  onClose,
  onProductAdded,
  productToEdit = null,
}: ProductFormProps) {
  const [formData, setFormData] = useState<Product>(
    productToEdit || {
      name: "",
      category_id: 0,
      buying_price: 0,
      selling_price: 0,
      quantity: 0,
      threshold: 5,
      expiry_date: "",
      supplier_id: 0,
    }
  );

  const [categories, setCategories] = useState<Category[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  // ✅ Charger les catégories et fournisseurs via Axios
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catRes, supRes] = await Promise.all([
          CategoriesApi.getAll(),
          SuppliersApi.getAll(),
        ]);

        setCategories(catRes.data?.data || catRes.data || []);
        setSuppliers(supRes.data?.data || supRes.data || []);
      } catch (error) {
        console.error("❌ Erreur lors du chargement :", error);
      }
    };

    fetchData();
  }, []); // ✅ tableau de dépendances vide → exécuté UNE SEULE FOIS

  // ✅ Gestion des changements
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]:
        name.includes("price") ||
        name === "quantity" ||
        name === "threshold" ||
        name === "category_id" ||
        name === "supplier_id"
          ? Number(value)
          : value,
    });
  };

  // ✅ Validation
  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Le nom du produit est requis.";
    if (formData.buying_price <= 0)
      newErrors.buying_price = "Prix d'achat invalide.";
    if (formData.selling_price <= 0)
      newErrors.selling_price = "Prix de vente invalide.";
    if (formData.quantity < 0) newErrors.quantity = "Quantité invalide.";
    if (!formData.expiry_date)
      newErrors.expiry_date = "Date d’expiration requise.";
    if (!formData.category_id) newErrors.category_id = "Catégorie obligatoire.";
    if (!formData.supplier_id)
      newErrors.supplier_id = "Fournisseur obligatoire.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ Soumission du formulaire
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setMessage("");

    try {
      let response;

      if (productToEdit) {
        // 🔧 Si on édite un produit existant
        response = await productsApi.update(productToEdit.id!, formData);
        setMessage("✅ Produit mis à jour avec succès !");
      } else {
        // 🔧 Si on crée un nouveau produit
        response = await productsApi.create(formData);
        setMessage("✅ Produit créé avec succès !");
      }

      onProductAdded(response.data);
      setTimeout(onClose, 1000);
    } catch (error) {
      console.error(error);
      setMessage("❌ Erreur lors de la sauvegarde du produit.");
    } finally {
      setLoading(false);
    }
  };

  return (
    // ✅ Modale plein écran avec fermeture au clic à l’extérieur
    <div
      className="fixed top-25 inset-0 z-50 flex justify-center items-center"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* === Conteneur principal === */}
      <div
        className="bg-white w-[90%] max-w-2xl rounded-2xl shadow-2xl relative animate-fadeIn overflow-y-auto"
        style={{
          maxHeight: "85vh", // ✅ limite la hauteur
          padding: "2rem",
        }}
      >
        {/* === HEADER === */}
        <div className="top-0 bg-white z-10 pb-3 flex justify-between items-center border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">
            {productToEdit ? "Modifier le produit" : "Créer un produit"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 text-2xl font-semibold"
          >
            ✕
          </button>
        </div>

        {/* === FORMULAIRE === */}
        <form onSubmit={handleSubmit} className="grid grid-cols-2">
          {/* Nom */}
          <div className="col-span-2">
            <label className="block text-sm font-semibold text-gray-600 mb-1">
              Nom du produit
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Ex : Paracétamol 500mg"
              className="w-full p-2 border rounded-md text-black focus:ring-2 focus:ring-blue-200"
            />
            {errors.name && (
              <p className="text-red-500 text-xs">{errors.name}</p>
            )}
          </div>

          {/* Catégorie */}
          <div className="col-span-2">
            <label className="block text-sm font-semibold text-gray-600 mb-1">
              Catégorie
            </label>
            <select
              name="category_id"
              value={formData.category_id}
              onChange={handleChange}
              className="w-full p-2 border rounded-md text-black focus:ring-2 focus:ring-blue-200"
            >
              <option value="">-- Sélectionner --</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
            {errors.category_id && (
              <p className="text-red-500 text-xs">{errors.category_id}</p>
            )}
          </div>

          {/* Fournisseur */}
          <div className="col-span-2">
            <label className="block text-sm font-semibold text-gray-600 mb-1">
              Fournisseur
            </label>
            <select
              name="supplier_id"
              value={formData.supplier_id}
              onChange={handleChange}
              className="w-full p-2 border rounded-md text-black focus:ring-2 focus:ring-blue-200"
            >
              <option value="">-- Sélectionner --</option>
              {suppliers.map((sup) => (
                <option key={sup.id} value={sup.id}>
                  {sup.name}
                </option>
              ))}
            </select>
            {errors.supplier_id && (
              <p className="text-red-500 text-xs">{errors.supplier_id}</p>
            )}
          </div>

          {/* Prix d’achat */}
          <div className="col-span-2">
            <label className="block text-sm font-semibold text-gray-600 mb-1">
              Prix d'achat (FCFA)
            </label>
            <input
              type="number"
              name="buying_price"
              value={formData.buying_price}
              onChange={handleChange}
              className="w-full p-2 border rounded-md text-black focus:ring-2 focus:ring-blue-200"
            />
            {errors.buying_price && (
              <p className="text-red-500 text-xs">{errors.buying_price}</p>
            )}
          </div>

          {/* Prix de vente */}
          <div className="col-span-2">
            <label className="block text-sm font-semibold text-gray-600 mb-1">
              Prix de vente (FCFA)
            </label>
            <input
              type="number"
              name="selling_price"
              value={formData.selling_price}
              onChange={handleChange}
              className="w-full p-2 border rounded-md text-black focus:ring-2 focus:ring-blue-200"
            />
            {errors.selling_price && (
              <p className="text-red-500 text-xs">{errors.selling_price}</p>
            )}
          </div>

          {/* Quantité */}
          <div className="col-span-2">
            <label className="block text-sm font-semibold text-gray-600 mb-1">
              Quantité
            </label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              className="w-full p-2 border rounded-md text-black focus:ring-2 focus:ring-blue-200"
            />
          </div>

          {/* Seuil */}
          <div className="col-span-2">
            <label className="block text-sm font-semibold text-gray-600 mb-1">
              Seuil minimum
            </label>
            <input
              type="number"
              name="threshold"
              value={formData.threshold}
              onChange={handleChange}
              className="w-full p-2 border rounded-md text-black focus:ring-2 focus:ring-blue-200"
            />
          </div>

          {/* Date d’expiration */}
          <div className="col-span-2">
            <label className="block text-sm font-semibold text-gray-600 mb-1">
              Date d'expiration
            </label>
            <input
              type="date"
              name="expiry_date"
              value={formData.expiry_date}
              onChange={handleChange}
              className="w-full p-2 border rounded-md text-black focus:ring-2 focus:ring-blue-200"
            />
            {errors.expiry_date && (
              <p className="text-red-500 text-xs">{errors.expiry_date}</p>
            )}
          </div>

          {/* Message */}
          {message && (
            <div className="col-span-2 text-center text-sm font-medium mt-2">
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
          <div className="col-span-2 flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`px-4 py-2 text-white rounded-lg ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loading
                ? "Enregistrement..."
                : productToEdit
                ? "Mettre à jour"
                : "Enregistrer"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
