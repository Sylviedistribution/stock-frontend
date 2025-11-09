import { useEffect, useState } from "react";
import dashboardApi from "../../../api/dashboardApi";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";

// Définition du type des produits
export interface TopProduct {
  product: string;
  sold: number;
  remaining: number;
  price: number;
}

// Props optionnelles pour le composant
interface BasicTableDashboardProps {
  topSellingStock?: TopProduct[];
}

export default function BasicTableDashboard({ topSellingStock }: BasicTableDashboardProps) {
  const [products, setProducts] = useState<TopProduct[]>([]);
  const [loading, setLoading] = useState(true);

  // Si la prop est fournie depuis le parent, on l’utilise directement.
  // Sinon, on fetch via l’API.
  useEffect(() => {
    if (topSellingStock && topSellingStock.length > 0) {
      setProducts(topSellingStock);
      setLoading(false);
    } else {
      dashboardApi
        .getTopProducts()
        .then((data) => setProducts(data))
        .finally(() => setLoading(false));
    }
  }, [topSellingStock]);

  if (loading) return <div className="text-center py-10">Chargement des produits...</div>;

  if (products.length === 0)
    return <div className="text-center py-10 text-gray-500">Aucun produit trouvé.</div>;

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <Table>
          {/* En-têtes de colonnes */}
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Produit
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Quantité vendue
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Stock restant
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Prix (FCFA)
              </TableCell>
            </TableRow>
          </TableHeader>

          {/* Corps du tableau */}
          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {products.map((p, index) => (
              <TableRow key={index}>
                <TableCell className="px-4 py-3 text-gray-800 dark:text-gray-300 font-medium">
                  {p.product}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-700 dark:text-gray-300">
                  {p.sold.toLocaleString()}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-700 dark:text-gray-300">
                  {p.remaining.toLocaleString()}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-700 dark:text-gray-300">
                  {p.price.toLocaleString("fr-FR")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
