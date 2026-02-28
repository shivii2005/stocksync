// import { useState } from 'react';
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { Plus, Loader2 } from 'lucide-react';
// import { useCategories, useCreateInventoryItem } from '@/hooks/useInventory';

// export function AddItemDialog() {
//   const [open, setOpen] = useState(false);
//   const { data: categories } = useCategories();
//   const createItem = useCreateInventoryItem();

//   const [formData, setFormData] = useState<{
//     sku: string;
//     name: string;
//     category_id: string;
//     quantity: number;
//     unit: string;
//     unit_cost: number;
//     reorder_level: number;
//     location: string;
//     status: 'healthy' | 'low' | 'dead' | 'slow' | 'damaged';
//     last_movement_date: string;
//     days_since_movement: number;
//   }>({
//     sku: '',
//     name: '',
//     category_id: '',
//     quantity: 0,
//     unit: 'units',
//     unit_cost: 0,
//     reorder_level: 10,
//     location: '',
//     status: 'healthy' as const,
//     last_movement_date: new Date().toISOString(),
//     days_since_movement: 0,
//   });

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     await createItem.mutateAsync({
//       ...formData,
//       category_id: formData.category_id || null,
//       location: formData.location || null,
//     });
//     setOpen(false);
//     setFormData({
//       sku: '',
//       name: '',
//       category_id: '',
//       quantity: 0,
//       unit: 'units',
//       unit_cost: 0,
//       reorder_level: 10,
//       location: '',
//       status: 'healthy',
//       last_movement_date: new Date().toISOString(),
//       days_since_movement: 0,
//     });
//   };

//   return (
//     <Dialog open={open} onOpenChange={setOpen}>
//       <DialogTrigger asChild>
//         <Button className="gap-2">
//           <Plus className="h-4 w-4" />
//           Add Item
//         </Button>
//       </DialogTrigger>
//       <DialogContent className="sm:max-w-[500px]">
//         <DialogHeader>
//           <DialogTitle>Add New Inventory Item</DialogTitle>
//         </DialogHeader>
//         <form onSubmit={handleSubmit} className="space-y-4 mt-4">
//           <div className="grid grid-cols-2 gap-4">
//             <div className="space-y-2">
//               <Label htmlFor="sku">SKU</Label>
//               <Input
//                 id="sku"
//                 placeholder="e.g., CEM-PPC-50"
//                 value={formData.sku}
//                 onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
//                 required
//               />
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="name">Product Name</Label>
//               <Input
//                 id="name"
//                 placeholder="e.g., Cement PPC 50kg"
//                 value={formData.name}
//                 onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                 required
//               />
//             </div>
//           </div>

//           <div className="grid grid-cols-2 gap-4">
//             <div className="space-y-2">
//               <Label htmlFor="category">Category</Label>
//               <Select
//                 value={formData.category_id}
//                 onValueChange={(value) => setFormData({ ...formData, category_id: value })}
//               >
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select category" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   {categories?.map((cat) => (
//                     <SelectItem key={cat.id} value={cat.id}>
//                       {cat.name}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="location">Location</Label>
//               <Input
//                 id="location"
//                 placeholder="e.g., Warehouse A"
//                 value={formData.location}
//                 onChange={(e) => setFormData({ ...formData, location: e.target.value })}
//               />
//             </div>
//           </div>

//           <div className="grid grid-cols-3 gap-4">
//             <div className="space-y-2">
//               <Label htmlFor="quantity">Quantity</Label>
//               <Input
//                 id="quantity"
//                 type="number"
//                 min="0"
//                 value={formData.quantity}
//                 onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) || 0 })}
//                 required
//               />
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="unit">Unit</Label>
//               <Input
//                 id="unit"
//                 placeholder="e.g., kg, pcs"
//                 value={formData.unit}
//                 onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
//               />
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="unit_cost">Unit Cost (₹)</Label>
//               <Input
//                 id="unit_cost"
//                 type="number"
//                 min="0"
//                 step="0.01"
//                 value={formData.unit_cost}
//                 onChange={(e) => setFormData({ ...formData, unit_cost: parseFloat(e.target.value) || 0 })}
//               />
//             </div>
//           </div>

//           <div className="grid grid-cols-2 gap-4">
//             <div className="space-y-2">
//               <Label htmlFor="reorder_level">Reorder Level</Label>
//               <Input
//                 id="reorder_level"
//                 type="number"
//                 min="0"
//                 value={formData.reorder_level}
//                 onChange={(e) => setFormData({ ...formData, reorder_level: parseInt(e.target.value) || 0 })}
//               />
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="status">Status</Label>
//               <Select
//                 value={formData.status}
//                 onValueChange={(value: 'healthy' | 'low' | 'dead' | 'slow' | 'damaged') => 
//                   setFormData({ ...formData, status: value })
//                 }
//               >
//                 <SelectTrigger>
//                   <SelectValue />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="healthy">Healthy</SelectItem>
//                   <SelectItem value="low">Low Stock</SelectItem>
//                   <SelectItem value="slow">Slow Moving</SelectItem>
//                   <SelectItem value="dead">Dead Stock</SelectItem>
//                   <SelectItem value="damaged">Damaged</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//           </div>

//           <div className="flex justify-end gap-3 pt-4">
//             <Button type="button" variant="outline" onClick={() => setOpen(false)}>
//               Cancel
//             </Button>
//             <Button type="submit" disabled={createItem.isPending}>
//               {createItem.isPending && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
//               Add Item
//             </Button>
//           </div>
//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// }


// import { useState } from "react";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Plus, Loader2 } from "lucide-react";
// import { useCategories, useCreateInventoryItem } from "@/hooks/useInventory";

// export function AddItemDialog() {
//   const [open, setOpen] = useState(false);
//   const { data: categories } = useCategories();
//   const createItem = useCreateInventoryItem();

//   const [formData, setFormData] = useState({
//     sku: "",
//     name: "",
//     category_id: "",
//     quantity: 0,
//     unit: "units",
//     unit_cost: 0,
//     reorder_level: 10,
//     location: "",
//     status: "healthy",
//     last_movement_date: new Date().toISOString(),
//     days_since_movement: 0,
//   });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     await createItem.mutateAsync({
//       ...formData,
//       category_id: formData.category_id || null,
//       location: formData.location || null,
//     });
//     setOpen(false);
//   };

//   return (
//     <Dialog open={open} onOpenChange={setOpen}>
//       <DialogTrigger asChild>
//         <Button className="gap-2 bg-[#00d187] text-black hover:bg-[#00c07a]">
//           <Plus className="h-4 w-4" />
//           Add Item
//         </Button>
//       </DialogTrigger>

//       <DialogContent className="sm:max-w-[500px] bg-[#0d0d0d] border border-[#1f1f1f] text-white">
//         <DialogHeader>
//           <DialogTitle className="text-white">
//             Add New Inventory Item
//           </DialogTitle>
//         </DialogHeader>

//         <form onSubmit={handleSubmit} className="space-y-4 mt-4">
//           <div className="grid grid-cols-2 gap-4">
//             <div className="space-y-2">
//               <Label>SKU</Label>
//               <Input
//                 className="bg-[#141414] border-[#222] text-white"
//                 value={formData.sku}
//                 onChange={(e) =>
//                   setFormData({ ...formData, sku: e.target.value })
//                 }
//                 required
//               />
//             </div>

//             <div className="space-y-2">
//               <Label>Product Name</Label>
//               <Input
//                 className="bg-[#141414] border-[#222] text-white"
//                 value={formData.name}
//                 onChange={(e) =>
//                   setFormData({ ...formData, name: e.target.value })
//                 }
//                 required
//               />
//             </div>
//           </div>

//           <div className="grid grid-cols-2 gap-4">
//             <div className="space-y-2">
//               <Label>Category</Label>
//               <Select
//                 value={formData.category_id}
//                 onValueChange={(value) =>
//                   setFormData({ ...formData, category_id: value })
//                 }
//               >
//                 <SelectTrigger className="bg-[#141414] border-[#222] text-white">
//                   <SelectValue placeholder="Select category" />
//                 </SelectTrigger>
//                 <SelectContent className="bg-[#141414] border-[#222] text-white">
//                   {categories?.map((cat) => (
//                     <SelectItem key={cat.id} value={cat.id}>
//                       {cat.name}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             </div>

//             <div className="space-y-2">
//               <Label>Location</Label>
//               <Input
//                 className="bg-[#141414] border-[#222] text-white"
//                 value={formData.location}
//                 onChange={(e) =>
//                   setFormData({ ...formData, location: e.target.value })
//                 }
//               />
//             </div>
//           </div>

//           <div className="grid grid-cols-3 gap-4">
//             <div className="space-y-2">
//               <Label>Quantity</Label>
//               <Input
//                 type="number"
//                 min="0"
//                 step="1"
//                 className="bg-[#141414] border-[#222] text-white"
//                 value={formData.quantity}
//                 onChange={(e) =>
//                   setFormData({
//                     ...formData,
//                     quantity: Math.max(0, parseInt(e.target.value) || 0),
//                   })
//                 }
//               />
//             </div>

//             <div className="space-y-2">
//               <Label>Unit</Label>
//               <Select
//                 value={formData.unit}
//                 onValueChange={(value) =>
//                   setFormData({ ...formData, unit: value })
//                 }
//               >
//                 <SelectTrigger className="bg-[#141414] border-[#222] text-white">
//                   <SelectValue placeholder="Select unit" />
//                 </SelectTrigger>
//                 <SelectContent className="bg-[#141414] border-[#222] text-white">
//                   <SelectItem value="units">Units</SelectItem>
//                   <SelectItem value="pcs">Pieces</SelectItem>
//                   <SelectItem value="kg">Kilogram (kg)</SelectItem>
//                   <SelectItem value="gm">Gram (gm)</SelectItem>
//                   <SelectItem value="ltr">Litre (ltr)</SelectItem>
//                   <SelectItem value="box">Box</SelectItem>
//                   <SelectItem value="bag">Bag</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>


//             <div className="space-y-2">
//               <Label>Unit Cost (₹)</Label>
//               <Input
//                 type="number"
//                 min="0"
//                 step="0.01"
//                 className="bg-[#141414] border-[#222] text-white"
//                 value={formData.unit_cost}
//                 onChange={(e) =>
//                   setFormData({
//                     ...formData,
//                     unit_cost: Math.max(0, parseFloat(e.target.value) || 0),
//                   })
//                 }
//               />
//             </div>

//           </div>

//           <div className="grid grid-cols-2 gap-4">
//             <div className="space-y-2">
//               <Label>Reorder Level</Label>
//               <Input
//                 type="number"
//                 min="0"
//                 step="1"
//                 className="bg-[#141414] border-[#222] text-white"
//                 value={formData.reorder_level}
//                 onChange={(e) =>
//                   setFormData({
//                     ...formData,
//                     reorder_level: Math.max(0, parseInt(e.target.value) || 0),
//                   })
//                 }
//               />
//             </div>


//             <div className="space-y-2">
//               <Label>Status</Label>
//               <Select
//                 value={formData.status}
//                 onValueChange={(value) =>
//                   setFormData({ ...formData, status: value })
//                 }
//               >
//                 <SelectTrigger className="bg-[#141414] border-[#222] text-white">
//                   <SelectValue />
//                 </SelectTrigger>
//                 <SelectContent className="bg-[#141414] border-[#222] text-white">
//                   <SelectItem value="healthy">Healthy</SelectItem>
//                   <SelectItem value="low">Low Stock</SelectItem>
//                   <SelectItem value="slow">Slow Moving</SelectItem>
//                   <SelectItem value="dead">Dead Stock</SelectItem>
//                   <SelectItem value="damaged">Damaged</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//           </div>

//           <div className="flex justify-end gap-3 pt-4">
//             <Button
//               type="button"
//               variant="outline"
//               className="border-[#222] text-gray-400"
//               onClick={() => setOpen(false)}
//             >
//               Cancel
//             </Button>

//             <Button
//               type="submit"
//               disabled={createItem.isPending}
//               className="bg-[#00d187] text-black hover:bg-[#00c07a]"
//             >
//               {createItem.isPending && (
//                 <Loader2 className="h-4 w-4 animate-spin mr-2" />
//               )}
//               Add Item
//             </Button>
//           </div>
//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// }


import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Loader2 } from "lucide-react";
import { useCategories, useCreateInventoryItem } from "@/hooks/useInventory";

export function AddItemDialog() {
  const [open, setOpen] = useState(false);
  const { data: categories } = useCategories();
  const createItem = useCreateInventoryItem();

  const [formData, setFormData] = useState({
    sku: "",
    name: "",
    category_id: "",
    quantity: 0,
    unit: "",
    unit_cost: 0,
    reorder_level: 0,
    location: "",
    status: "healthy",
    last_movement_date: new Date().toISOString(),
    days_since_movement: 0,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createItem.mutateAsync({
      ...formData,
      category_id: formData.category_id || null,
      location: formData.location || null,
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2 bg-[#00d187] text-white hover:bg-[#00c07a]">
          <Plus className="h-4 w-4" />
          Add Item
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[650px] bg-[#0d0d0d] border border-[#009e66] text-white">
        <DialogHeader>
          <DialogTitle className="text-white">
            Add New Inventory Item
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-6">
          {/* SKU + Name */}
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>SKU</Label>
              <Input
                placeholder="e.g. CEM-PPC-50"
                className="bg-[#141414] border-[#222] text-white placeholder:text-gray-600"
                value={formData.sku}
                onChange={(e) =>
                  setFormData({ ...formData, sku: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Product Name</Label>
              <Input
                placeholder="e.g. Cement PPC 50kg"
                className="bg-[#141414] border-[#222] text-white placeholder:text-gray-600"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </div>
          </div>

          {/* Category + Location */}
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Category</Label>
              <Select
                value={formData.category_id}
                onValueChange={(value) =>
                  setFormData({ ...formData, category_id: value })
                }
              >
                <SelectTrigger className="bg-[#141414] border-[#222] text-white">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className="bg-[#141414] border-[#222] text-white">
                  {categories?.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Location</Label>
              <Input
                placeholder="e.g. Warehouse A / Rack 3"
                className="bg-[#141414] border-[#222] text-white placeholder:text-gray-600"
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
              />
            </div>
          </div>

          {/* Quantity + Unit + Cost */}
          <div className="grid grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label>Quantity</Label>
              <Input
                type="number"
                min="0"
                placeholder="0"
                className="bg-[#141414] border-[#222] text-white"
                value={formData.quantity}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    quantity: Math.max(0, parseInt(e.target.value) || 0),
                  })
                }
              />
            </div>

            <div className="space-y-2">
              <Label>Unit</Label>
              <Select
                value={formData.unit}
                onValueChange={(value) =>
                  setFormData({ ...formData, unit: value })
                }
              >
                <SelectTrigger className="bg-[#141414] border-[#222] text-white">
                  <SelectValue placeholder="Select unit" />
                </SelectTrigger>
                <SelectContent className="bg-[#141414] border-[#222] text-white">
                  <SelectItem value="units">Units</SelectItem>
                  <SelectItem value="pcs">Pieces</SelectItem>
                  <SelectItem value="kg">Kilogram (kg)</SelectItem>
                  <SelectItem value="gm">Gram (gm)</SelectItem>
                  <SelectItem value="ltr">Litre (ltr)</SelectItem>
                  <SelectItem value="box">Box</SelectItem>
                  <SelectItem value="bag">Bag</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Unit Cost (₹)</Label>
              <Input
                type="number"
                min="0"
                step="0.01"
                placeholder="e.g. 450.00"
                className="bg-[#141414] border-[#222] text-white"
                value={formData.unit_cost}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    unit_cost: Math.max(0, parseFloat(e.target.value) || 0),
                  })
                }
              />
            </div>
          </div>

          {/* Reorder + Status */}
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Reorder Level</Label>
              <Input
                type="number"
                min="0"
                placeholder="Minimum stock before reorder"
                className="bg-[#141414] border-[#222] text-white"
                value={formData.reorder_level}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    reorder_level: Math.max(0, parseInt(e.target.value) || 0),
                  })
                }
              />
            </div>

            <div className="space-y-2">
              <Label>Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value) =>
                  setFormData({ ...formData, status: value })
                }
              >
                <SelectTrigger className="bg-[#141414] border-[#222] text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#141414] border-[#222] text-white">
                  <SelectItem value="healthy">Healthy</SelectItem>
                  <SelectItem value="low">Low Stock</SelectItem>
                  <SelectItem value="slow">Slow Moving</SelectItem>
                  <SelectItem value="dead">Dead Stock</SelectItem>
                  <SelectItem value="damaged">Damaged</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-6">
            <Button
              type="button"
              variant="outline"
              className="border-[#222] text-gray-800"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={createItem.isPending}
              className="bg-[#00d187] text-black hover:bg-[#00c07a]"
            >
              {createItem.isPending && (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              )}
              Add Item
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
