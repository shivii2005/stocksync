
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";
import { toast } from "sonner";
import { syncInventoryAlerts } from "./useAlertGenerator";
import { useEffect } from "react";

/* ===================== TYPES ===================== */

export interface InventoryItem {
  id: string;
  user_id: string;
  sku: string;
  name: string;
  category_id: string | null;
  quantity: number;
  unit: string;
  unit_cost: number;
  reorder_level: number;
  location: string | null;
  status: 'healthy' | 'low' | 'dead' | 'slow' | 'damaged';
  last_movement_date: string | null;
  days_since_movement: number;
  created_at: string;
  updated_at: string;
  category?: { name: string } | null;
}

export interface Category {
  id: string;
  name: string;
  description: string | null;
}

/* ===================== CATEGORIES ===================== */

export function useCategories() {
  return useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .order("name");

      if (error) throw error;
      return data as Category[];
    },
  });
}
/* ===================== INVENTORY LIST ===================== */

export function useInventoryItems() {
  const { user } = useAuth();

  const query = useQuery<InventoryItem[]>({
    queryKey: ["inventory-items", user?.id],
    enabled: !!user,

    queryFn: async () => {
      if (!user) return [];

      const { data, error } = await supabase
        .from("inventory_items")
        .select("*, category:categories(name)")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data ?? [];
    },
  });

  useEffect(() => {
    if (!user?.id) return;
    if (!query.data) return;

    const items: InventoryItem[] = query.data;
    syncInventoryAlerts(user.id, items);
  }, [user?.id, query.data]);

  return query;
}


/* ===================== CREATE ITEM ===================== */

export function useCreateInventoryItem() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (
      item: Omit<
        InventoryItem,
        "id" | "user_id" | "created_at" | "updated_at" | "category"
      >
    ) => {
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("inventory_items")
        .insert({ ...item, user_id: user.id })
        .select()
        .single();

      if (error) throw error;
      return data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["inventory-items", user?.id],
      });
      toast.success("Item added successfully");
    },
  });
}

/* ===================== UPDATE ITEM ===================== */

export function useUpdateInventoryItem() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async ({
      id,
      ...updates
    }: Partial<InventoryItem> & { id: string }) => {
      const { data, error } = await supabase
        .from("inventory_items")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["inventory-items", user?.id],
      });
      toast.success("Item updated successfully");
    },
  });
}

/* ===================== DELETE ITEM ===================== */

export function useDeleteInventoryItem() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("inventory_items")
        .delete()
        .eq("id", id);

      if (error) throw error;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["inventory-items", user?.id],
      });
      toast.success("Item deleted successfully");
    },
  });
}
