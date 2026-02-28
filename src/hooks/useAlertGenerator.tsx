import { supabase } from '@/integrations/supabase/client';

type AlertType =
  | 'low_stock'
  | 'dead_stock'
  | 'slow_moving'
  | 'damaged'
  | 'expiring';

type AlertSeverity = 'critical' | 'warning' | 'info';

interface InventoryItem {
  id: string;
  name: string;
  quantity: number;
  reorder_level: number;
  status: string;
  days_since_movement: number;
}

interface AlertInsert {
  user_id: string;
  inventory_item_id: string;
  type: AlertType;
  severity: AlertSeverity;
  title: string;
  description: string;
  is_resolved: boolean;
}

export async function syncInventoryAlerts(
  userId: string,
  items: InventoryItem[]
) {
  if (!userId || !items || items.length === 0) return;

  // 1️⃣ Remove old unresolved alerts (fresh rebuild)
  await supabase
    .from('alerts')
    .delete()
    .eq('user_id', userId)
    .eq('is_resolved', false);

  const alerts: AlertInsert[] = [];

  for (const item of items) {
    // 🔴 LOW STOCK
    if (item.quantity <= item.reorder_level) {
      alerts.push({
        user_id: userId,
        inventory_item_id: item.id,
        type: 'low_stock',
        severity: 'warning',
        title: 'Low Stock Alert',
        description: `${item.name} is below reorder level`,
        is_resolved: false,
      });
    }

    // 🔴 DEAD / SLOW MOVING
    if (item.days_since_movement >= 90) {
      alerts.push({
        user_id: userId,
        inventory_item_id: item.id,
        type: 'dead_stock',
        severity: 'critical',
        title: 'Dead Stock Alert',
        description: `${item.name} has no movement for 90+ days`,
        is_resolved: false,
      });
    } else if (item.days_since_movement >= 60) {
      alerts.push({
        user_id: userId,
        inventory_item_id: item.id,
        type: 'slow_moving',
        severity: 'warning',
        title: 'Slow Moving Item',
        description: `${item.name} is slow moving`,
        is_resolved: false,
      });
    }

    // 🔴 DAMAGED
    if (item.status === 'damaged') {
      alerts.push({
        user_id: userId,
        inventory_item_id: item.id,
        type: 'damaged',
        severity: 'critical',
        title: 'Damaged Item',
        description: `${item.name} is marked as damaged`,
        is_resolved: false,
      });
    }
  }

  if (alerts.length > 0) {
    await supabase.from('alerts').insert(alerts);
  }
}
