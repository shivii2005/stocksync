// import { useState } from "react";
// import { Search, Filter, ArrowUpDown, Trash2, Loader2 } from "lucide-react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { useInventoryItems, useDeleteInventoryItem } from "@/hooks/useInventory";
// import { formatDistanceToNow } from "date-fns";

// const statusConfig = {
//   healthy: { label: "Healthy", variant: "success" as const },
//   low: { label: "Low Stock", variant: "destructive" as const },
//   dead: { label: "Dead Stock", variant: "warning" as const },
//   slow: { label: "Slow Moving", variant: "secondary" as const },
//   damaged: { label: "Damaged", variant: "destructive" as const }, 
// };

// export function InventoryTable() {
//   const [searchQuery, setSearchQuery] = useState("");
//   const { data: items, isLoading } = useInventoryItems();
//   const deleteItem = useDeleteInventoryItem();

//   const filteredData = items?.filter(
//     (item) =>
//       item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       item.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       item.category?.name?.toLowerCase().includes(searchQuery.toLowerCase())
//   ) || [];

//   if (isLoading) {
//     return (
//       <Card className="shadow-card">
//         <CardContent className="flex items-center justify-center h-64">
//           <Loader2 className="h-8 w-8 animate-spin text-primary" />
//         </CardContent>
//       </Card>
//     );
//   }

//   return (
//     <Card className="shadow-card">
//       <CardHeader className="pb-4">
//         <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//           <CardTitle className="font-display text-lg">Inventory Items</CardTitle>
//           <div className="flex items-center gap-2">
//             <div className="relative">
//               <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
//               <Input
//                 placeholder="Search inventory..."
//                 className="pl-9 w-64"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//               />
//             </div>
//             <Button variant="outline" size="icon">
//               <Filter className="h-4 w-4" />
//             </Button>
//           </div>
//         </div>
//       </CardHeader>
//       <CardContent>
//         {filteredData.length === 0 ? (
//           <div className="text-center py-12 text-muted-foreground">
//             <p>No inventory items found.</p>
//             <p className="text-sm mt-1">Add your first item to get started.</p>
//           </div>
//         ) : (
//           <div className="rounded-lg border border-border">
//             <Table>
//               <TableHeader>
//                 <TableRow>
//                   <TableHead className="w-[100px]">SKU</TableHead>
//                   <TableHead>Product Name</TableHead>
//                   <TableHead>Category</TableHead>
//                   <TableHead className="text-right">
//                     <Button variant="ghost" size="sm" className="h-8 gap-1 text-xs">
//                       Stock
//                       <ArrowUpDown className="h-3 w-3" />
//                     </Button>
//                   </TableHead>
//                   <TableHead className="text-right">Reorder Point</TableHead>
//                   <TableHead className="text-right">Value</TableHead>
//                   <TableHead>Status</TableHead>
//                   <TableHead>Last Movement</TableHead>
//                   <TableHead className="w-[50px]"></TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {filteredData.map((item) => (
//                   <TableRow key={item.id} className="text-white:bg-secondary/50">
//                     <TableCell className="font-mono text-sm">{item.sku}</TableCell>
//                     <TableCell className="font-medium">{item.name}</TableCell>
//                     <TableCell className="text-muted-foreground">
//                       {item.category?.name || '-'}
//                     </TableCell>
//                     <TableCell className="text-right font-medium">
//                       {item.quantity.toLocaleString()} {item.unit}
//                     </TableCell>
//                     <TableCell className="text-right text-muted-foreground">
//                       {item.reorder_level.toLocaleString()}
//                     </TableCell>
//                     <TableCell className="text-right">
//                       ₹{((item.quantity * Number(item.unit_cost)) / 1000).toFixed(1)}K
//                     </TableCell>
//                     <TableCell>
//                       <Badge variant={statusConfig[item.status]?.variant || 'secondary'}>
//                         {statusConfig[item.status]?.label || item.status}
//                       </Badge>
//                     </TableCell>
//                     <TableCell className="text-muted-foreground">
//                       {item.last_movement_date 
//                         ? formatDistanceToNow(new Date(item.last_movement_date), { addSuffix: true })
//                         : '-'
//                       }
//                     </TableCell>
//                     <TableCell>
//                       <Button
//                         variant="ghost"
//                         size="icon"
//                         className="h-8 w-8 text-muted-foreground text-white:text-destructive"
//                         onClick={() => deleteItem.mutate(item.id)}
//                         disabled={deleteItem.isPending}
//                       >
//                         <Trash2 className="h-4 w-4" />
//                       </Button>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </div>
//         )}
//       </CardContent>
//     </Card>
//   );
// }



import { useState } from "react";
import { Search, Filter, ArrowUpDown, Trash2, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useInventoryItems, useDeleteInventoryItem } from "@/hooks/useInventory";
import { formatDistanceToNow } from "date-fns";

const statusStyles = {
  healthy: "bg-[#00d187]/15 text-[#00d187] border border-[#00d187]/30",
  low: "bg-yellow-500/15 text-yellow-400 border border-yellow-500/30",
  dead: "bg-red-500/15 text-red-400 border border-red-500/30",
  slow: "bg-blue-500/15 text-blue-400 border border-blue-500/30",
  damaged: "bg-red-500/15 text-red-400 border border-red-500/30",
};

export function InventoryTable() {
  const [searchQuery, setSearchQuery] = useState("");
  const { data: items, isLoading } = useInventoryItems();
  const deleteItem = useDeleteInventoryItem();

  const filteredData =
    items?.filter(
      (item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category?.name
          ?.toLowerCase()
          .includes(searchQuery.toLowerCase())
    ) || [];

  if (isLoading) {
    return (
      <Card className="bg-[#0d0d0d] border border-[#1f1f1f]">
        <CardContent className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-[#00d187]" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-[#0d0d0d] border border-[#1f1f1f]">
      <CardHeader className="pb-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle className="font-display text-lg text-white">
            Inventory Items
          </CardTitle>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search inventory..."
                className="pl-9 w-64 bg-[#141414] border-[#222] text-white placeholder:text-gray-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <Button
              variant="outline"
              size="icon"
              className="border-[#222] text-white bg-[#009e66]"
            >
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {filteredData.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <p>No inventory items found.</p>
            <p className="text-sm mt-1">
              Add your first item to get started.
            </p>
          </div>
        ) : (
          <div className="rounded-lg border border-[#222] overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-[#141414] border-b border-[#222]">
                  <TableHead className="text-white">SKU</TableHead>
                  <TableHead className="text-white">
                    Product Name
                  </TableHead>
                  <TableHead className="text-white">
                    Category
                  </TableHead>
                  <TableHead className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 gap-1 text-xs text-white"
                    >
                      Stock
                      <ArrowUpDown className="h-3 w-3" />
                    </Button>
                  </TableHead>
                  <TableHead className="text-right text-white">
                    Reorder Point
                  </TableHead>
                  <TableHead className="text-right text-white">
                    Value
                  </TableHead>
                  <TableHead className="text-white">
                    Status
                  </TableHead>
                  <TableHead className="text-white">
                    Last Movement
                  </TableHead>
                  <TableHead />
                </TableRow>
              </TableHeader>

              <TableBody>
                {filteredData.map((item) => (
                  <TableRow
                    key={item.id}
                    className="border-b border-[#1f1f1f]"
                  >
                    <TableCell className="font-mono text-sm text-white">
                      {item.sku}
                    </TableCell>
                    <TableCell className="font-medium text-white">
                      {item.name}
                    </TableCell>
                    <TableCell className="text-gray-400">
                      {item.category?.name || "-"}
                    </TableCell>
                    <TableCell className="text-right text-white font-medium">
                      {item.quantity.toLocaleString()} {item.unit}
                    </TableCell>
                    <TableCell className="text-right text-gray-400">
                      {item.reorder_level.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right text-white">
                      ₹
                      {(
                        (item.quantity * Number(item.unit_cost)) /
                        1000
                      ).toFixed(1)}
                      K
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={
                          statusStyles[item.status] ||
                          "bg-gray-500/15 text-gray-400"
                        }
                      >
                        {item.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-gray-400">
                      {item.last_movement_date
                        ? formatDistanceToNow(
                            new Date(item.last_movement_date),
                            { addSuffix: true }
                          )
                        : "-"}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-gray-400 text-white:text-red-500"
                        onClick={() =>
                          deleteItem.mutate(item.id)
                        }
                        disabled={deleteItem.isPending}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
