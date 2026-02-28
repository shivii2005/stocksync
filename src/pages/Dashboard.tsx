
// import {
//   Package,
//   AlertTriangle,
//   TrendingDown,
//   IndianRupee,
//   Loader2,
// } from "lucide-react";
// import { MainLayout } from "@/components/layout/MainLayout";
// import { MetricCard } from "@/components/dashboard/MetricCard";
// import { AlertsList } from "@/components/dashboard/AlertsList";
// import { InventoryChart } from "@/components/dashboard/InventoryChart";
// import { SKUPerformance } from "@/components/dashboard/SKUPerformance";
// import { ProtectedRoute } from "@/components/ProtectedRoute";
// import { formatINR } from "@/lib/formatCurrency";


// import { useInventoryItems, InventoryItem } from "@/hooks/useInventory";
// import { useAlerts, Alert } from "@/hooks/useAlerts";

// export default function Dashboard() {
//   const {
//     data: items = [],
//     isLoading: itemsLoading,
//   } = useInventoryItems();

//   const {
//     data: alerts = [],
//     isLoading: alertsLoading,
//   } = useAlerts();

//   // const totalValue = items.reduce(
//   //   (sum, item) => sum + item.quantity * Number(item.unit_cost),
//   //   0
//   // );
// const totalValue = items.reduce(
//   (sum, item) => sum + item.quantity * Number(item.unit_cost),
//   0
// );


//   const totalSKUs = items.length;
//   const lowStockItems = items.filter((item) => item.status === "low").length;
//   const deadStockItems = items.filter((item) => item.status === "dead").length;
//   const activeAlerts = alerts.filter((a) => !a.is_resolved).length;

//   const isLoading = itemsLoading || alertsLoading;

//   return (
//     <ProtectedRoute>
//       <MainLayout>
//         <div className="space-y-8 animate-fade-in">
//           {/* Header */}
//           <div>
//             <h1 className="font-display text-3xl font-bold text-foreground">
//               Dashboard
//             </h1>
//             <p className="text-muted-foreground mt-1">
//               Monitor your inventory health and performance
//             </p>
//           </div>

//           {isLoading ? (
//             <div className="flex items-center justify-center h-64">
//               <Loader2 className="h-8 w-8 animate-spin text-primary" />
//             </div>
//           ) : (
//             <>
//               {/* Metrics */}
//               <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
//                 <MetricCard
//                   title="Total Inventory Value"
//                   // value={`₹${(totalValue / 100000).toFixed(1)}L`}
//                   value={formatINR(totalValue)}
//                   subtitle={`Across ${totalSKUs} SKUs`}
//                   icon={<IndianRupee className="h-6 w-6" />}
//                 />

//                 <MetricCard
//                   title="Low Stock Items"
//                   value={lowStockItems}
//                   subtitle="Need reordering"
//                   icon={<TrendingDown className="h-6 w-6" />}
//                   variant="destructive"
//                 />

//                 <MetricCard
//                   title="Dead Stock"
//                   value={deadStockItems}
//                   subtitle="No movement 90+ days"
//                   icon={<Package className="h-6 w-6" />}
//                   variant="warning"
//                 />

//                 <MetricCard
//                   title="Active Alerts"
//                   value={activeAlerts}
//                   subtitle="Require attention"
//                   icon={<AlertTriangle className="h-6 w-6" />}
//                   variant="warning"
//                 />
//               </div>

//               {/* Charts */}
//               <div className="grid gap-6 lg:grid-cols-2">
//                 <InventoryChart />
//                 <SKUPerformance />
//               </div>

//               {/* Alerts */}
//               <AlertsList />
//             </>
//           )}
//         </div>
//       </MainLayout>
//     </ProtectedRoute>
//   );
// }


import {
  Package,
  AlertTriangle,
  TrendingDown,
  IndianRupee,
  Loader2,
} from "lucide-react";
import { MainLayout } from "@/components/layout/MainLayout";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { AlertsList } from "@/components/dashboard/AlertsList";
import { InventoryChart } from "@/components/dashboard/InventoryChart";
import { SKUPerformance } from "@/components/dashboard/SKUPerformance";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { formatINR } from "@/lib/formatCurrency";

import { useInventoryItems } from "@/hooks/useInventory";
import { useAlerts } from "@/hooks/useAlerts";

export default function Dashboard() {
  const { data: items = [], isLoading: itemsLoading } = useInventoryItems();
  const { data: alerts = [], isLoading: alertsLoading } = useAlerts();

  const totalValue = items.reduce(
    (sum, item) => sum + item.quantity * Number(item.unit_cost),
    0
  );

  const totalSKUs = items.length;
  const lowStockItems = items.filter((item) => item.status === "low").length;
  const deadStockItems = items.filter((item) => item.status === "dead").length;
  const activeAlerts = alerts.filter((a) => !a.is_resolved).length;

  const isLoading = itemsLoading || alertsLoading;

  return (
    <ProtectedRoute>
      <MainLayout>
        <div className="space-y-8 p-8 animate-fade-in bg-black text-white">
          <div>
            <h1 className="font-display text-3xl font-bold text-white">
              Dashboard
            </h1>
            <p className="mt-1 text-white ">
              Monitor your inventory health and performance
            </p>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-[#009e66]" />
            </div>
          ) : (
            <>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <MetricCard
                  title="Total Inventory Value"
                  value={formatINR(totalValue)}
                  subtitle={`Across ${totalSKUs} SKUs`}
                  icon={<IndianRupee className="h-6 w-6" />}
                />

                <MetricCard
                  title="Low Stock Items"
                  value={lowStockItems}
                  subtitle="Need reordering"
                  icon={<TrendingDown className="h-6 w-6" />}
                  variant="destructive"
                />

                <MetricCard
                  title="Dead Stock"
                  value={deadStockItems}
                  subtitle="No movement 90+ days"
                  icon={<Package className="h-6 w-6" />}
                  variant="warning"
                />

                <MetricCard
                  title="Active Alerts"
                  value={activeAlerts}
                  subtitle="Require attention"
                  icon={<AlertTriangle className="h-6 w-6" />}
                  variant="warning"
                />
              </div>

              <div className="grid gap-6 lg:grid-cols-2">
                <InventoryChart />
                <SKUPerformance />
              </div>

              <AlertsList />
            </>
          )}
        </div>
      </MainLayout>
    </ProtectedRoute>
  );
}
