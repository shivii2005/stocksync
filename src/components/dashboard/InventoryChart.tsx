
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { useInventoryItems, useCategories } from "@/hooks/useInventory";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";

// export function InventoryChart() {
//   const { data: items } = useInventoryItems();
//   const { data: categories } = useCategories();

//   if (!items || !categories) {
//     return (
//       <Card className="shadow-card">
//         <CardContent className="py-12 text-center text-muted-foreground">
//           No inventory data
//         </CardContent>
//       </Card>
//     );
//   }

//   const data = categories
//     .map((cat) => {
//       const value = items
//         .filter((i) => i.category_id === cat.id)
//         .reduce((sum, i) => sum + i.quantity * Number(i.unit_cost), 0);

//       return { name: cat.name, value };
//     })
//     .filter((d) => d.value > 0);

//   return (
//     <Card className="shadow-card">
//       <CardHeader className="pb-4">
//         <CardTitle className="font-display text-lg">
//           Inventory Value by Category
//         </CardTitle>
//       </CardHeader>
//       <CardContent>
//         <div className="h-[300px]">
//           <ResponsiveContainer width="100%" height="100%">
//             <BarChart data={data}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="name" fontSize={12} />
//               <YAxis
//                 fontSize={12}
//                 tickFormatter={(v) => `₹${(v / 100000).toFixed(0)}L`}
//               />
//               <Tooltip
//                 formatter={(v: number) =>
//                   `₹${(v / 100000).toFixed(1)}L`
//                 }
//               />
//               <Bar dataKey="value" fill="hsl(217, 91%, 40%)" radius={[4,4,0,0]} />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }


import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useInventoryItems, useCategories } from "@/hooks/useInventory";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export function InventoryChart() {
  const { data: items } = useInventoryItems();
  const { data: categories } = useCategories();

  if (!items || !categories) {
    return (
      <Card className="bg-[#0d0d0d] border border-[#1f1f1f]">
        <CardContent className="py-12 text-center text-gray-400">
          No inventory data
        </CardContent>
      </Card>
    );
  }

  const data = categories
    .map((cat) => {
      const value = items
        .filter((i) => i.category_id === cat.id)
        .reduce((sum, i) => sum + i.quantity * Number(i.unit_cost), 0);

      return { name: cat.name, value };
    })
    .filter((d) => d.value > 0);

  return (
    <Card className="bg-[#0d0d0d] border border-[#fff]">
      <CardHeader className="pb-4">
        <CardTitle className="font-display text-lg text-white">
          Inventory Value by Category
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid
                stroke="#1f1f1f"
                strokeDasharray="3 3"
              />
              <XAxis
                dataKey="name"
                fontSize={12}
                tick={{ fill: "#9ca3af" }}
                axisLine={{ stroke: "#1f1f1f" }}
              />
              <YAxis
                fontSize={12}
                tick={{ fill: "#9ca3af" }}
                axisLine={{ stroke: "#1f1f1f" }}
                tickFormatter={(v) => `₹${(v / 100000).toFixed(0)}L`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#141414",
                  border: "1px solid #1f1f1f",
                  color: "#ffffff",
                }}
                labelStyle={{ color: "#00d187" }}
                formatter={(v) =>
                  `₹${(v / 100000).toFixed(1)}L`
                }
              />
              <Bar
                dataKey="value"
                fill="#00d187"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
