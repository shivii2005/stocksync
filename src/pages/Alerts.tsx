
// import { MainLayout } from "@/components/layout/MainLayout";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import {
//   AlertTriangle,
//   Package,
//   TrendingDown,
//   Trash2,
//   CheckCircle,
//   Clock,
//   Bell,
//   BellOff,
//   Loader2,
// } from "lucide-react";
// import { ProtectedRoute } from "@/components/ProtectedRoute";
// import { useAlerts, useResolveAlert, useDeleteAlert } from "@/hooks/useAlerts";
// import { formatDistanceToNow } from "date-fns";

// const typeIcons = {
//   dead_stock: Package,
//   low_stock: TrendingDown,
//   damaged: Trash2,
//   expiring: Clock,
//   slow_moving: AlertTriangle,
// };

// const severityConfig = {
//   critical: {
//     bgClass: "bg-destructive/10 border-destructive/20",
//     badgeVariant: "destructive" as const,
//     iconClass: "text-destructive",
//   },
//   warning: {
//     bgClass: "bg-warning/10 border-warning/20",
//     badgeVariant: "warning" as const,
//     iconClass: "text-warning",
//   },
//   info: {
//     bgClass: "bg-primary/10 border-primary/20",
//     badgeVariant: "default" as const,
//     iconClass: "text-primary",
//   },
// };

// export default function Alerts() {
//   const { data: alerts, isLoading } = useAlerts();
//   const resolveAlert = useResolveAlert();
//   const deleteAlert = useDeleteAlert();

//   const unresolvedAlerts = alerts?.filter((a) => !a.is_resolved) || [];
//   const criticalCount = unresolvedAlerts.filter(
//     (a) => a.severity === "critical"
//   ).length;
//   const warningCount = unresolvedAlerts.filter(
//     (a) => a.severity === "warning"
//   ).length;

//   return (
//     <ProtectedRoute>
//       <MainLayout>
//         <div className="space-y-8 animate-fade-in">
//           {/* Header */}
//           <div className="flex items-center justify-between">
//             <div>
//               <h1 className="font-display text-3xl font-bold text-foreground">
//                 Alerts
//               </h1>
//               <p className="text-muted-foreground mt-1">
//                 {criticalCount} critical, {warningCount} warnings requiring
//                 attention
//               </p>
//             </div>
//             <div className="flex items-center gap-2">
//               <Button variant="outline" className="gap-2" disabled>
//                 <BellOff className="h-4 w-4" />
//                 Mute All
//               </Button>
//               <Button variant="outline" className="gap-2" disabled>
//                 <CheckCircle className="h-4 w-4" />
//                 Mark All Read
//               </Button>
//             </div>
//           </div>

//           {/* Stats */}
//           <div className="grid gap-4 sm:grid-cols-3">
//             <Card className="shadow-card border-destructive/20 bg-destructive/5">
//               <CardContent className="p-4 flex items-center gap-4">
//                 <AlertTriangle className="h-6 w-6 text-destructive" />
//                 <div>
//                   <p className="text-2xl font-bold">{criticalCount}</p>
//                   <p className="text-sm text-muted-foreground">
//                     Critical Alerts
//                   </p>
//                 </div>
//               </CardContent>
//             </Card>

//             <Card className="shadow-card border-warning/20 bg-warning/5">
//               <CardContent className="p-4 flex items-center gap-4">
//                 <Bell className="h-6 w-6 text-warning" />
//                 <div>
//                   <p className="text-2xl font-bold">{warningCount}</p>
//                   <p className="text-sm text-muted-foreground">Warnings</p>
//                 </div>
//               </CardContent>
//             </Card>

//             <Card className="shadow-card">
//               <CardContent className="p-4 flex items-center gap-4">
//                 <Clock className="h-6 w-6 text-muted-foreground" />
//                 <div>
//                   <p className="text-2xl font-bold">
//                     {unresolvedAlerts.length}
//                   </p>
//                   <p className="text-sm text-muted-foreground">
//                     Total Unresolved
//                   </p>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>

//           {/* Alerts List */}
//           <Card className="shadow-card">
//             <CardHeader>
//               <CardTitle className="font-display text-lg">
//                 All Alerts
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               {isLoading ? (
//                 <div className="flex justify-center py-10">
//                   <Loader2 className="h-8 w-8 animate-spin text-primary" />
//                 </div>
//               ) : unresolvedAlerts.length === 0 ? (
//                 <div className="text-center py-10 text-muted-foreground">
//                   <CheckCircle className="h-10 w-10 mx-auto mb-3 text-success" />
//                   No active alerts
//                 </div>
//               ) : (
//                 unresolvedAlerts.map((alert) => {
//                   const Icon = typeIcons[alert.type] || AlertTriangle;
//                   const config = severityConfig[alert.severity];

//                   return (
//                     <div
//                       key={alert.id}
//                       className={`flex gap-4 border rounded-lg p-4 ${config.bgClass}`}
//                     >
//                       <Icon className={`h-6 w-6 ${config.iconClass}`} />

//                       <div className="flex-1">
//                         <div className="flex justify-between">
//                           <p className="font-medium">{alert.title}</p>
//                           <Badge variant={config.badgeVariant}>
//                             {alert.severity}
//                           </Badge>
//                         </div>

//                         <p className="text-sm text-muted-foreground">
//                           {alert.description}
//                         </p>

//                         <div className="flex justify-between items-center mt-2 text-xs text-muted-foreground">
//                           <span>
//                             {formatDistanceToNow(
//                               new Date(alert.created_at),
//                               { addSuffix: true }
//                             )}
//                           </span>

//                           <div className="flex gap-2">
//                             <Button
//                               size="sm"
//                               variant="outline"
//                               onClick={() =>
//                                 deleteAlert.mutate(alert.id)
//                               }
//                             >
//                               Dismiss
//                             </Button>
//                             <Button
//                               size="sm"
//                               onClick={() =>
//                                 resolveAlert.mutate(alert.id)
//                               }
//                             >
//                               Resolve
//                             </Button>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   );
//                 })
//               )}
//             </CardContent>
//           </Card>
//         </div>
//       </MainLayout>
//     </ProtectedRoute>
//   );
// }



import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  AlertTriangle,
  Package,
  TrendingDown,
  Trash2,
  CheckCircle,
  Clock,
  Bell,
  BellOff,
  Loader2,
} from "lucide-react";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useAlerts, useResolveAlert, useDeleteAlert } from "@/hooks/useAlerts";
import { formatDistanceToNow } from "date-fns";

const typeIcons = {
  dead_stock: Package,
  low_stock: TrendingDown,
  damaged: Trash2,
  expiring: Clock,
  slow_moving: AlertTriangle,
};

const severityConfig = {
  critical: {
    rowBg: "bg-[#1a0f0f] border-red-500/30",
    badge: "bg-red-500/15 text-red-400 border border-red-500/30",
    icon: "text-red-400",
  },
  warning: {
    rowBg: "bg-[#1a1608] border-yellow-500/30",
    badge: "bg-yellow-500/15 text-yellow-400 border border-yellow-500/30",
    icon: "text-yellow-400",
  },
  info: {
    rowBg: "bg-[#0f1a14] border-[#00d187]/30",
    badge: "bg-[#00d187]/15 text-[#00d187] border border-[#00d187]/30",
    icon: "text-[#00d187]",
  },
};

export default function Alerts() {
  const { data: alerts, isLoading } = useAlerts();
  const resolveAlert = useResolveAlert();
  const deleteAlert = useDeleteAlert();

  const unresolvedAlerts = alerts?.filter((a) => !a.is_resolved) || [];
  const criticalCount = unresolvedAlerts.filter(
    (a) => a.severity === "critical"
  ).length;
  const warningCount = unresolvedAlerts.filter(
    (a) => a.severity === "warning"
  ).length;

  return (
    <ProtectedRoute>
      <MainLayout>
        <div className="space-y-8 animate-fade-in p-6 bg-black text-white">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-display text-3xl font-bold text-white">
                Alerts
              </h1>
              <p className="mt-1 text-white">
                {criticalCount} critical, {warningCount} warnings requiring
                attention
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                className="gap-2 border-[#222] text-white bg-[#009e66]"
                disabled
              >
                <BellOff className="h-4 w-4" />
                Mute All
              </Button>
              <Button
                variant="outline"
                className="gap-2 border-[#222] text-white bg-[#009e66]"
                disabled
              >
                <CheckCircle className="h-4 w-4" />
                Mark All Read
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid gap-4 sm:grid-cols-3">
            <Card className="bg-[#0d0d0d] border border-red-500/30">
              <CardContent className="p-4 flex items-center gap-4">
                <AlertTriangle className="h-6 w-6 text-red-400" />
                <div>
                  <p className="text-2xl font-bold text-white">{criticalCount}</p>
                  <p className="text-sm text-white">Critical Alerts</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#0d0d0d] border border-yellow-500/30">
              <CardContent className="p-4 flex items-center gap-4">
                <Bell className="h-6 w-6 text-yellow-400" />
                <div>
                  <p className="text-2xl font-bold text-white">{warningCount}</p>
                  <p className="text-sm text-white">Warnings</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#0d0d0d] border border-[#1f1f1f]">
              <CardContent className="p-4 flex items-center gap-4">
                <Clock className="h-6 w-6 text-white" />
                <div>
                  <p className="text-2xl font-bold text-white">
                    {unresolvedAlerts.length}
                  </p>
                  <p className="text-sm text-white">Total Unresolved</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Alerts List */}
          <Card className="bg-[#0d0d0d] border border-[#1f1f1f]">
            <CardHeader>
              <CardTitle className="font-display text-lg text-white">
                All Alerts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {isLoading ? (
                <div className="flex justify-center py-10">
                  <Loader2 className="h-8 w-8 animate-spin text-[#00d187]" />
                </div>
              ) : unresolvedAlerts.length === 0 ? (
                <div className="text-center py-10 text-white">
                  <CheckCircle className="h-10 w-10 mx-auto mb-3 text-[#00d187]" />
                  No active alerts
                </div>
              ) : (
                unresolvedAlerts.map((alert) => {
                  const Icon = typeIcons[alert.type] || AlertTriangle;
                  const config = severityConfig[alert.severity];

                  return (
                    <div
                      key={alert.id}
                      className={`flex gap-4 rounded-lg p-4 border ${config.rowBg}`}
                    >
                      <Icon className={`h-6 w-6 ${config.icon}`} />

                      <div className="flex-1 space-y-1">
                        <div className="flex justify-between items-start gap-3">
                          <p className="font-medium text-white">
                            {alert.title}
                          </p>
                          <Badge className={config.badge}>
                            {alert.severity}
                          </Badge>
                        </div>

                        <p className="text-sm text-white">
                          {alert.description}
                        </p>

                        <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
                          <span>
                            {formatDistanceToNow(
                              new Date(alert.created_at),
                              { addSuffix: true }
                            )}
                          </span>

                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-[#222] text-gray-800"
                              onClick={() =>
                                deleteAlert.mutate(alert.id)
                              }
                            >
                              Dismiss
                            </Button>
                            <Button
                              size="sm"
                              className="bg-[#00d187] text-black hover:bg-[#00c07a]"
                              onClick={() =>
                                resolveAlert.mutate(alert.id)
                              }
                            >
                              Resolve
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </CardContent>
          </Card>
        </div>
      </MainLayout>
    </ProtectedRoute>
  );
}
