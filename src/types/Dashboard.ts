export interface DashboardKPI {
  total_categories: number;
  total_products: number;
  total_suppliers: number;
  total_orders: number;
  quantity_in_hand: number;
  to_be_received: number;

  sales_last7: {
    units: number;
    revenue: number;
    profit: number;
    cost: number;
  };
  purchase_last7: {
    orders: number;
    cost: number;
    returned: number;
    returned_cost: number;
    on_the_way: number;
    on_the_way_cost: number;
  };
  low_stock_count: number;
  out_of_stock_count: number;
  delayed_orders: number;
}

export interface SalesPurchaseChartPoint {
  month: string;
  sales: number;
  purchases: number;
}

export interface OrderSummary {
  month: string;
  ordered: number;
  delivered: number;
}

export interface TopProduct {
  product: string;
  sold: number;
  remaining: number;
  price: number;
}

export interface LowStockItem {
  id: number;
  name: string;
  quantity: number;
  threshold: number;
}

export interface DashboardData extends DashboardKPI {
  sales_vs_purchases: SalesPurchaseChartPoint[];
  top_products: TopProduct[];
  low_stock: LowStockItem[];
}
