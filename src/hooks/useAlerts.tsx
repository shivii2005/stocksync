
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";
import { toast } from "sonner";

export interface Alert {
  id: string;
  user_id: string;
  inventory_item_id: string | null;
  type: "dead_stock" | "low_stock" | "damaged" | "expiring" | "slow_moving";
  severity: "critical" | "warning" | "info";
  title: string;
  description: string | null;
  is_resolved: boolean;
  created_at: string;
  resolved_at: string | null;
  inventory_item?: { name: string; sku: string } | null;
}

/* ===================== GET ALERTS ===================== */

export function useAlerts() {
  const { user } = useAuth();

  return useQuery<Alert[]>({
    queryKey: ["alerts", user?.id],
    enabled: !!user,
    queryFn: async () => {
      if (!user) return [];

      const { data, error } = await supabase
        .from("alerts")
        .select(`*, inventory_item:inventory_items(name, sku)`)
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as Alert[];
    },
  });
}

/* ===================== RESOLVE ALERT ===================== */

export function useResolveAlert() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("alerts")
        .update({
          is_resolved: true,
          resolved_at: new Date().toISOString(),
        })
        .eq("id", id);

      if (error) throw error;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["alerts", user?.id],
      });
      toast.success("Alert resolved");
    },
  });
}

/* ===================== DELETE ALERT ===================== */

export function useDeleteAlert() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("alerts")
        .delete()
        .eq("id", id);

      if (error) throw error;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["alerts", user?.id],
      });
      toast.success("Alert deleted");
    },
  });
}
