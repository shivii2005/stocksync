// import { MainLayout } from "@/components/layout/MainLayout";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { ProtectedRoute } from "@/components/ProtectedRoute";
// import { useInventoryItems, useCategories } from "@/hooks/useInventory";
// import { Loader2 } from "lucide-react";
// import { 
//   BarChart, 
//   Bar, 
//   XAxis, 
//   YAxis, 
//   CartesianGrid, 
//   Tooltip, 
//   ResponsiveContainer,
//   PieChart,
//   Pie,
//   Cell,
//   LineChart,
//   Line
// } from "recharts";

// const turnoverData = [
//   { month: "Jan", turnover: 4.2, target: 4.5 },
//   { month: "Feb", turnover: 4.5, target: 4.5 },
//   { month: "Mar", turnover: 4.1, target: 4.5 },
//   { month: "Apr", turnover: 4.3, target: 4.5 },
//   { month: "May", turnover: 3.9, target: 4.5 },
//   { month: "Jun", turnover: 4.0, target: 4.5 },
// ];

// const stockAgingColors = [
//   "hsl(142, 71%, 45%)",
//   "hsl(217, 91%, 40%)",
//   "hsl(38, 92%, 50%)",
//   "hsl(0, 84%, 60%)",
// ];

// export default function Analytics() {
//   const { data: items, isLoading: itemsLoading } = useInventoryItems();
//   const { data: categories, isLoading: categoriesLoading } = useCategories();

//   const isLoading = itemsLoading || categoriesLoading;

//   // Calculate category distribution
//   const categoryData = categories?.map(cat => {
//     const categoryItems = items?.filter(item => item.category_id === cat.id) || [];
//     const value = categoryItems.reduce((sum, item) => sum + (item.quantity * Number(item.unit_cost)), 0);
//     return { name: cat.name, value };
//   }).filter(c => c.value > 0).sort((a, b) => b.value - a.value) || [];

//   // Calculate stock aging (based on days_since_movement)
//   const stockAgingData = [
//     { name: "0-30 days", value: items?.filter(i => i.days_since_movement <= 30).length || 0 },
//     { name: "31-60 days", value: items?.filter(i => i.days_since_movement > 30 && i.days_since_movement <= 60).length || 0 },
//     { name: "61-90 days", value: items?.filter(i => i.days_since_movement > 60 && i.days_since_movement <= 90).length || 0 },
//     { name: "90+ days", value: items?.filter(i => i.days_since_movement > 90).length || 0 },
//   ].map((item, index) => ({ ...item, color: stockAgingColors[index] }));

//   const totalItems = items?.length || 0;
//   const stockAgingPercentages = stockAgingData.map(item => ({
//     ...item,
//     value: totalItems > 0 ? Math.round((item.value / totalItems) * 100) : 0
//   }));

//   // ABC Analysis
//   const sortedItems = [...(items || [])].sort((a, b) => 
//     (b.quantity * Number(b.unit_cost)) - (a.quantity * Number(a.unit_cost))
//   );
//   const aCount = Math.ceil(sortedItems.length * 0.2);
//   const bCount = Math.ceil(sortedItems.length * 0.3);

//   const skuAnalysis = [
//     { 
//       category: "A (Top 20%)", 
//       skus: aCount, 
//       revenue: "70%", 
//       recommendation: "Maintain high stock" 
//     },
//     { 
//       category: "B (Middle 30%)", 
//       skus: bCount, 
//       revenue: "20%", 
//       recommendation: "Monitor closely" 
//     },
//     { 
//       category: "C (Bottom 50%)", 
//       skus: sortedItems.length - aCount - bCount, 
//       revenue: "10%", 
//       recommendation: "Consider reducing" 
//     },
//   ];

//   return (
//     <ProtectedRoute>
//       <MainLayout>
//         <div className="space-y-8 animate-fade-in">
//           {/* Header */}
//           <div>
//             <h1 className="font-display text-3xl font-bold text-foreground">Analytics</h1>
//             <p className="text-muted-foreground mt-1">Deep insights into your inventory performance</p>
//           </div>

//           {isLoading ? (
//             <div className="flex items-center justify-center h-64">
//               <Loader2 className="h-8 w-8 animate-spin text-primary" />
//             </div>
//           ) : items?.length === 0 ? (
//             <Card className="shadow-card">
//               <CardContent className="py-12 text-center text-muted-foreground">
//                 <p>No inventory data available. Add items to see analytics.</p>
//               </CardContent>
//             </Card>
//           ) : (
//             <>
//               {/* Charts Grid */}
//               <div className="grid gap-6 lg:grid-cols-2">
//                 {/* Category Distribution */}
//                 <Card className="shadow-card">
//                   <CardHeader>
//                     <CardTitle className="font-display text-lg">Inventory by Category</CardTitle>
//                   </CardHeader>
//                   <CardContent>
//                     <div className="h-[300px]">
//                       {categoryData.length > 0 ? (
//                         <ResponsiveContainer width="100%" height="100%">
//                           <BarChart data={categoryData} layout="vertical" margin={{ left: 80 }}>
//                             <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 32%, 91%)" />
//                             <XAxis 
//                               type="number" 
//                               stroke="hsl(215, 16%, 47%)"
//                               fontSize={12}
//                               tickFormatter={(value) => `₹${(value / 100000).toFixed(0)}L`}
//                             />
//                             <YAxis 
//                               type="category" 
//                               dataKey="name" 
//                               stroke="hsl(215, 16%, 47%)"
//                               fontSize={12}
//                             />
//                             <Tooltip 
//                               contentStyle={{
//                                 backgroundColor: "hsl(0, 0%, 100%)",
//                                 border: "1px solid hsl(214, 32%, 91%)",
//                                 borderRadius: "8px",
//                               }}
//                               formatter={(value: number) => [`₹${(value / 100000).toFixed(1)}L`, "Value"]}
//                             />
//                             <Bar dataKey="value" fill="hsl(217, 91%, 40%)" radius={[0, 4, 4, 0]} />
//                           </BarChart>
//                         </ResponsiveContainer>
//                       ) : (
//                         <div className="flex items-center justify-center h-full text-muted-foreground">
//                           No category data available
//                         </div>
//                       )}
//                     </div>
//                   </CardContent>
//                 </Card>

//                 {/* Stock Aging */}
//                 <Card className="shadow-card">
//                   <CardHeader>
//                     <CardTitle className="font-display text-lg">Stock Aging Analysis</CardTitle>
//                   </CardHeader>
//                   <CardContent>
//                     <div className="h-[300px] flex items-center justify-center">
//                       <ResponsiveContainer width="100%" height="100%">
//                         <PieChart>
//                           <Pie
//                             data={stockAgingPercentages}
//                             cx="50%"
//                             cy="50%"
//                             innerRadius={60}
//                             outerRadius={100}
//                             paddingAngle={2}
//                             dataKey="value"
//                           >
//                             {stockAgingPercentages.map((entry, index) => (
//                               <Cell key={`cell-${index}`} fill={entry.color} />
//                             ))}
//                           </Pie>
//                           <Tooltip 
//                             contentStyle={{
//                               backgroundColor: "hsl(0, 0%, 100%)",
//                               border: "1px solid hsl(214, 32%, 91%)",
//                               borderRadius: "8px",
//                             }}
//                             formatter={(value: number) => [`${value}%`, "Percentage"]}
//                           />
//                         </PieChart>
//                       </ResponsiveContainer>
//                     </div>
//                     <div className="flex flex-wrap justify-center gap-4 mt-4">
//                       {stockAgingPercentages.map((item) => (
//                         <div key={item.name} className="flex items-center gap-2">
//                           <div 
//                             className="h-3 w-3 rounded-full" 
//                             style={{ backgroundColor: item.color }} 
//                           />
//                           <span className="text-sm text-muted-foreground">{item.name}</span>
//                         </div>
//                       ))}
//                     </div>
//                   </CardContent>
//                 </Card>
//               </div>

//               {/* Inventory Turnover */}
//               <Card className="shadow-card">
//                 <CardHeader>
//                   <CardTitle className="font-display text-lg">Inventory Turnover Ratio</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="h-[300px]">
//                     <ResponsiveContainer width="100%" height="100%">
//                       <LineChart data={turnoverData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
//                         <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 32%, 91%)" />
//                         <XAxis 
//                           dataKey="month" 
//                           stroke="hsl(215, 16%, 47%)"
//                           fontSize={12}
//                         />
//                         <YAxis 
//                           stroke="hsl(215, 16%, 47%)"
//                           fontSize={12}
//                           domain={[3, 5]}
//                         />
//                         <Tooltip 
//                           contentStyle={{
//                             backgroundColor: "hsl(0, 0%, 100%)",
//                             border: "1px solid hsl(214, 32%, 91%)",
//                             borderRadius: "8px",
//                           }}
//                         />
//                         <Line 
//                           type="monotone" 
//                           dataKey="turnover" 
//                           stroke="hsl(217, 91%, 40%)" 
//                           strokeWidth={2}
//                           dot={{ fill: "hsl(217, 91%, 40%)", strokeWidth: 2 }}
//                           name="Actual"
//                         />
//                         <Line 
//                           type="monotone" 
//                           dataKey="target" 
//                           stroke="hsl(142, 71%, 45%)" 
//                           strokeWidth={2}
//                           strokeDasharray="5 5"
//                           dot={false}
//                           name="Target"
//                         />
//                       </LineChart>
//                     </ResponsiveContainer>
//                   </div>
//                 </CardContent>
//               </Card>

//               {/* ABC Analysis */}
//               <Card className="shadow-card">
//                 <CardHeader>
//                   <CardTitle className="font-display text-lg">ABC Analysis</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="overflow-x-auto">
//                     <table className="w-full text-sm">
//                       <thead>
//                         <tr className="border-b border-border">
//                           <th className="text-left py-3 px-4 font-medium">Category</th>
//                           <th className="text-left py-3 px-4 font-medium">SKU Count</th>
//                           <th className="text-left py-3 px-4 font-medium">Revenue Contribution</th>
//                           <th className="text-left py-3 px-4 font-medium">Recommendation</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {skuAnalysis.map((row) => (
//                           <tr key={row.category} className="border-b border-border">
//                             <td className="py-3 px-4">
//                               <Badge variant={
//                                 row.category.startsWith("A") ? "success" : 
//                                 row.category.startsWith("B") ? "default" : "secondary"
//                               }>
//                                 {row.category}
//                               </Badge>
//                             </td>
//                             <td className="py-3 px-4 font-medium">{row.skus}</td>
//                             <td className="py-3 px-4 font-medium">{row.revenue}</td>
//                             <td className="py-3 px-4 text-muted-foreground">{row.recommendation}</td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>
//                   </div>
//                 </CardContent>
//               </Card>
//             </>
//           )}
//         </div>
//       </MainLayout>
//     </ProtectedRoute>
//   );
// }


import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useInventoryItems, useCategories } from "@/hooks/useInventory";
import { Loader2 } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";

const turnoverData = [
  { month: "Jan", turnover: 4.2, target: 4.5 },
  { month: "Feb", turnover: 4.5, target: 4.5 },
  { month: "Mar", turnover: 4.1, target: 4.5 },
  { month: "Apr", turnover: 4.3, target: 4.5 },
  { month: "May", turnover: 3.9, target: 4.5 },
  { month: "Jun", turnover: 4.0, target: 4.5 },
];

const stockAgingColors = ["#00d187", "#3b82f6", "#facc15", "#ef4444"];

export default function Analytics() {
  const { data: items, isLoading: itemsLoading } = useInventoryItems();
  const { data: categories, isLoading: categoriesLoading } = useCategories();
  const isLoading = itemsLoading || categoriesLoading;

  const categoryData =
    categories
      ?.map((cat) => {
        const categoryItems =
          items?.filter((item) => item.category_id === cat.id) || [];
        const value = categoryItems.reduce(
          (sum, item) => sum + item.quantity * Number(item.unit_cost),
          0
        );
        return { name: cat.name, value };
      })
      .filter((c) => c.value > 0)
      .sort((a, b) => b.value - a.value) || [];

  const stockAgingData = [
    { name: "0–30 days", value: items?.filter((i) => i.days_since_movement <= 30).length || 0 },
    { name: "31–60 days", value: items?.filter((i) => i.days_since_movement > 30 && i.days_since_movement <= 60).length || 0 },
    { name: "61–90 days", value: items?.filter((i) => i.days_since_movement > 60 && i.days_since_movement <= 90).length || 0 },
    { name: "90+ days", value: items?.filter((i) => i.days_since_movement > 90).length || 0 },
  ].map((item, index) => ({ ...item, color: stockAgingColors[index] }));

  const totalItems = items?.length || 0;
  const stockAgingPercentages = stockAgingData.map((item) => ({
    ...item,
    value: totalItems > 0 ? Math.round((item.value / totalItems) * 100) : 0,
  }));

  const sortedItems = [...(items || [])].sort(
    (a, b) => b.quantity * Number(b.unit_cost) - a.quantity * Number(a.unit_cost)
  );
  const aCount = Math.ceil(sortedItems.length * 0.2);
  const bCount = Math.ceil(sortedItems.length * 0.3);

  const skuAnalysis = [
    { category: "A (Top 20%)", skus: aCount, revenue: "70%", recommendation: "Maintain high stock" },
    { category: "B (Middle 30%)", skus: bCount, revenue: "20%", recommendation: "Monitor closely" },
    { category: "C (Bottom 50%)", skus: sortedItems.length - aCount - bCount, revenue: "10%", recommendation: "Consider reducing" },
  ];

  return (
    <ProtectedRoute>
      <MainLayout>
        <div className="space-y-8 animate-fade-in p-6 bg-black text-white">
          <div>
            <h1 className="font-display text-3xl font-bold text-white">Analytics</h1>
            <p className="mt-1 text-gray-400">
              Deep insights into your inventory performance
            </p>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-[#00d187]" />
            </div>
          ) : items?.length === 0 ? (
            <Card className="bg-[#0d0d0d] border border-[#1f1f1f]">
              <CardContent className="py-12 text-center text-gray-400">
                No inventory data available. Add items to see analytics.
              </CardContent>
            </Card>
          ) : (
            <>
              {/* Category + Aging */}
              <div className="grid gap-6 lg:grid-cols-2">
                <Card className="bg-[#0d0d0d] border border-[#1f1f1f]">
                  <CardHeader>
                    <CardTitle className="font-display text-lg text-white">
                      Inventory by Category
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={categoryData} layout="vertical" margin={{ left: 80 }}>
                        <CartesianGrid stroke="#1f1f1f" strokeDasharray="3 3" />
                        <XAxis
                          type="number"
                          tick={{ fill: "#9ca3af" }}
                          tickFormatter={(v) => `₹${(v / 100000).toFixed(0)}L`}
                        />
                        <YAxis type="category" dataKey="name" tick={{ fill: "#9ca3af" }} />
                        <Tooltip
                          contentStyle={{ backgroundColor: "#141414", border: "1px solid #222", color: "#fff" }}
                          formatter={(v) => `₹${(v / 100000).toFixed(1)}L`}
                        />
                        <Bar dataKey="value" fill="#00d187" radius={[0, 4, 4, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card className="bg-[#0d0d0d] border border-[#1f1f1f]">
                  <CardHeader>
                    <CardTitle className="font-display text-lg text-white">
                      Stock Aging Analysis
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={stockAgingPercentages}
                          innerRadius={60}
                          outerRadius={100}
                          dataKey="value"
                        >
                          {stockAgingPercentages.map((entry, index) => (
                            <Cell key={index} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#141414",
                            border: "1px solid #222",
                            color: "#ffffff",
                          }}
                          itemStyle={{ color: "#ffffff" }}
                          labelStyle={{ color: "#9ca3af" }}
                          formatter={(v) => [`${v}%`, "Stock"]}
                        />

                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>

              {/* Turnover */}
              <Card className="bg-[#0d0d0d] border border-[#1f1f1f]">
                <CardHeader>
                  <CardTitle className="font-display text-lg text-white">
                    Inventory Turnover Ratio
                  </CardTitle>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={turnoverData}>
                      <CartesianGrid stroke="#1f1f1f" strokeDasharray="3 3" />
                      <XAxis dataKey="month" tick={{ fill: "#9ca3af" }} />
                      <YAxis tick={{ fill: "#9ca3af" }} domain={[3, 5]} />
                      <Tooltip contentStyle={{ backgroundColor: "#141414", border: "1px solid #222", color: "#fff" }} />
                      <Line type="monotone" dataKey="turnover" stroke="#00d187" strokeWidth={2} />
                      <Line type="monotone" dataKey="target" stroke="#facc15" strokeDasharray="5 5" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* ABC */}
              <Card className="bg-[#0d0d0d] border border-[#1f1f1f]">
                <CardHeader>
                  <CardTitle className="font-display text-lg text-white">
                    ABC Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-[#222] text-gray-400">
                        <th className="py-3 px-4 text-left">Category</th>
                        <th className="py-3 px-4 text-left">SKU Count</th>
                        <th className="py-3 px-4 text-left">Revenue</th>
                        <th className="py-3 px-4 text-left">Recommendation</th>
                      </tr>
                    </thead>
                    <tbody>
                      {skuAnalysis.map((row) => (
                        <tr key={row.category} className="border-b border-[#1f1f1f]">
                          <td className="py-3 px-4">
                            <Badge
                              className={
                                row.category.startsWith("A")
                                  ? "bg-[#00d187]/15 text-[#00d187]"
                                  : row.category.startsWith("B")
                                    ? "bg-blue-500/15 text-blue-400"
                                    : "bg-gray-500/15 text-gray-400"
                              }
                            >
                              {row.category}
                            </Badge>
                          </td>
                          <td className="py-3 px-4 text-white">{row.skus}</td>
                          <td className="py-3 px-4 text-white">{row.revenue}</td>
                          <td className="py-3 px-4 text-gray-400">
                            {row.recommendation}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </MainLayout>
    </ProtectedRoute>
  );
}
