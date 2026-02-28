
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Progress } from "@/components/ui/progress";
// import { useInventoryItems } from "@/hooks/useInventory";
// import { formatINR } from "@/lib/formatCurrency";


// export function SKUPerformance() {
//   const { data: items = [] } = useInventoryItems();

//   if (items.length === 0) {
//     return (
//       <Card className="shadow-card">
//         <CardContent className="py-12 text-center text-muted-foreground">
//           No SKU data available
//         </CardContent>
//       </Card>
//     );
//   }

//   const totalValue = items.reduce(
//     (sum, item) => sum + item.quantity * Number(item.unit_cost),
//     0
//   );

//   const topItems = [...items]
//     .map((item) => {
//       const value = item.quantity * Number(item.unit_cost);
//       const performance = totalValue > 0 ? (value / totalValue) * 100 : 0;

//       let status: "top" | "good" | "average" | "poor" = "poor";
//       if (performance > 20) status = "top";
//       else if (performance > 10) status = "good";
//       else if (performance > 5) status = "average";

//       return {
//         ...item,
//         value,
//         performance: Math.round(performance),
//         status,
//       };
//     })
//     .sort((a, b) => b.value - a.value)
//     .slice(0, 5);

//   const statusColors = {
//     top: "success",
//     good: "default",
//     average: "warning",
//     poor: "destructive",
//   } as const;

//   return (
//     <Card className="shadow-card">
//       <CardHeader className="pb-4">
//         <CardTitle className="font-display text-lg">SKU Performance</CardTitle>
//       </CardHeader>
//       <CardContent className="space-y-4">
//         {topItems.map((item) => (
//           <div key={item.id} className="space-y-2">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium">{item.name}</p>
//                 <p className="text-xs text-muted-foreground">{item.sku}</p>
//               </div>
//               <div className="flex items-center gap-3">
//                 <span className="text-sm font-medium">
//                   {/* ₹{(item.value / 100000).toFixed(1)}L */}
//                   {formatINR(item.value)}
//                 </span>
//                 <Badge variant={statusColors[item.status]}>
//                   {item.status}
//                 </Badge>
//               </div>
//             </div>
//             <Progress value={item.performance} className="h-2" />
//           </div>
//         ))}
//       </CardContent>
//     </Card>
//   );
// }


import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useInventoryItems } from "@/hooks/useInventory";
import { formatINR } from "@/lib/formatCurrency";

export function SKUPerformance() {
  const { data: items = [] } = useInventoryItems();

  if (items.length === 0) {
    return (
      <Card className="bg-[#0d0d0d] border border-[#1f1f1f]">
        <CardContent className="py-12 text-center text-gray-400">
          No SKU data available
        </CardContent>
      </Card>
    );
  }

  const totalValue = items.reduce(
    (sum, item) => sum + item.quantity * Number(item.unit_cost),
    0
  );

  const topItems = [...items]
    .map((item) => {
      const value = item.quantity * Number(item.unit_cost);
      const performance = totalValue > 0 ? (value / totalValue) * 100 : 0;

      let status = "poor";
      if (performance > 20) status = "top";
      else if (performance > 10) status = "good";
      else if (performance > 5) status = "average";

      return {
        ...item,
        value,
        performance: Math.round(performance),
        status,
      };
    })
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);

  return (
    <Card className="bg-[#0d0d0d] border border-[#fff]">
      <CardHeader className="pb-4">
        <CardTitle className="font-display text-lg text-white">
          SKU Performance
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {topItems.map((item) => (
          <div
            key={item.id}
            className="space-y-2 p-3 rounded-lg bg-[#141414] border border-[#222]"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-white">
                  {item.name}
                </p>
                <p className="text-xs text-gray-400">{item.sku}</p>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-white">
                  {formatINR(item.value)}
                </span>

                <Badge
                  className={
                    item.status === "top"
                      ? "bg-[#00d187]/15 text-[#00d187] border border-[#00d187]/30"
                      : item.status === "good"
                      ? "bg-blue-500/15 text-blue-400 border border-blue-500/30"
                      : item.status === "average"
                      ? "bg-yellow-500/15 text-yellow-400 border border-yellow-500/30"
                      : "bg-red-500/15 text-red-400 border border-red-500/30"
                  }
                >
                  {item.status}
                </Badge>
              </div>
            </div>

            <Progress
              value={item.performance}
              className="h-2 bg-[#1f1f1f]"
              indicatorClassName={
                item.status === "top"
                  ? "bg-[#00d187]"
                  : item.status === "good"
                  ? "bg-blue-400"
                  : item.status === "average"
                  ? "bg-yellow-400"
                  : "bg-red-400"
              }
            />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
