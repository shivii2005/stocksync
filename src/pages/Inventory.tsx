// import { MainLayout } from "@/components/layout/MainLayout";
// import { InventoryTable } from "@/components/inventory/InventoryTable";
// import { AddItemDialog } from "@/components/inventory/AddItemDialog";
// import { ProtectedRoute } from "@/components/ProtectedRoute";

// export default function Inventory() {
//   return (
//     <ProtectedRoute>
//       <MainLayout>
//         <div className="space-y-8 animate-fade-in p-6">
//           {/* Header */}
//           <div className="flex items-center justify-between">
//             <div>
//               <h1 className="font-display text-3xl font-bold text-foreground">Inventory</h1>
//               <p className="text-muted-foreground mt-1">Manage your stock levels and track item performance</p>
//             </div>
//             <AddItemDialog />
//           </div>

//           {/* Inventory Table */}
//           <InventoryTable />
//         </div>
//       </MainLayout>
//     </ProtectedRoute>
//   );
// }


import { MainLayout } from "@/components/layout/MainLayout";
import { InventoryTable } from "@/components/inventory/InventoryTable";
import { AddItemDialog } from "@/components/inventory/AddItemDialog";
import { ProtectedRoute } from "@/components/ProtectedRoute";

export default function Inventory() {
  return (
    <ProtectedRoute>
      <MainLayout>
        <div className="space-y-8 animate-fade-in p-6 bg-black">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-display text-3xl font-bold text-white">
                Inventory
              </h1>
              <p className="mt-1 text-white">
                Manage your stock levels and track item performance
              </p>
            </div>
            <AddItemDialog />
          </div>

          <InventoryTable />
        </div>
      </MainLayout>
    </ProtectedRoute>
  );
}
