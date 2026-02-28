

// import {
//   AlertTriangle,
//   Package,
//   TrendingDown,
//   Trash2,
//   CheckCircle,
//   Loader2,
// } from "lucide-react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { useAlerts } from "@/hooks/useAlerts";
// import { formatDistanceToNow } from "date-fns";

// const typeIcons = {
//   dead_stock: Package,
//   low_stock: TrendingDown,
//   damaged: Trash2,
//   expiring: AlertTriangle,
//   slow_moving: AlertTriangle,
// };

// export function AlertsList() {
//   const { data: alerts, isLoading } = useAlerts();

//   const activeAlerts =
//     alerts?.filter((a) => !a.is_resolved).slice(0, 4) || [];

//   if (isLoading) {
//     return (
//       <Card className="shadow-card">
//         <CardContent className="flex items-center justify-center h-40">
//           <Loader2 className="h-6 w-6 animate-spin text-primary" />
//         </CardContent>
//       </Card>
//     );
//   }

//   return (
//     <Card className="shadow-card">
//       <CardHeader className="pb-4">
//         <CardTitle className="flex items-center gap-2 font-display text-lg">
//           <AlertTriangle className="h-5 w-5 text-warning" />
//           Active Alerts
//         </CardTitle>
//       </CardHeader>

//       <CardContent className="space-y-4">
//         {activeAlerts.length === 0 ? (
//           <div className="text-center py-6 text-muted-foreground">
//             <CheckCircle className="h-8 w-8 mx-auto mb-2 text-success" />
//             No active alerts
//           </div>
//         ) : (
//           activeAlerts.map((alert) => {
//             const Icon = typeIcons[alert.type] || AlertTriangle;
//             const critical = alert.severity === "critical";

//             return (
//               <div
//                 key={alert.id}
//                 className="flex gap-3 border rounded-lg p-3 hover:bg-secondary/40"
//               >
//                 <div
//                   className={`h-10 w-10 rounded-lg flex items-center justify-center ${
//                     critical
//                       ? "bg-destructive/10"
//                       : "bg-warning/10"
//                   }`}
//                 >
//                   <Icon
//                     className={`h-5 w-5 ${
//                       critical
//                         ? "text-destructive"
//                         : "text-warning"
//                     }`}
//                   />
//                 </div>

//                 <div className="flex-1">
//                   <div className="flex justify-between items-center">
//                     <p className="font-medium">{alert.title}</p>
//                     <Badge
//                       variant={critical ? "destructive" : "warning"}
//                     >
//                       {alert.type.replace("_", " ")}
//                     </Badge>
//                   </div>

//                   <p className="text-sm text-muted-foreground">
//                     {alert.description}
//                   </p>

//                   <p className="text-xs text-muted-foreground mt-1">
//                     {formatDistanceToNow(
//                       new Date(alert.created_at),
//                       { addSuffix: true }
//                     )}
//                   </p>
//                 </div>
//               </div>
//             );
//           })
//         )}
//       </CardContent>
//     </Card>
//   );
// }


import {
  AlertTriangle,
  Package,
  TrendingDown,
  Trash2,
  CheckCircle,
  Loader2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAlerts } from "@/hooks/useAlerts";
import { formatDistanceToNow } from "date-fns";

const typeIcons = {
  dead_stock: Package,
  low_stock: TrendingDown,
  damaged: Trash2,
  expiring: AlertTriangle,
  slow_moving: AlertTriangle,
};

export function AlertsList() {
  const { data: alerts, isLoading } = useAlerts();

  const activeAlerts =
    alerts?.filter((a) => !a.is_resolved).slice(0, 4) || [];

  if (isLoading) {
    return (
      <Card className="bg-[#0d0d0d] border border-[#1f1f1f]">
        <CardContent className="flex items-center justify-center h-40">
          <Loader2 className="h-6 w-6 animate-spin text-[#00d187]" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-[#0d0d0d] border border-[#009e66]">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 font-display text-lg text-white">
          <AlertTriangle className="h-5 w-5 text-[#00d187]" />
          Active Alerts
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        {activeAlerts.length === 0 ? (
          <div className="text-center py-6 text-gray-400">
            <CheckCircle className="h-8 w-8 mx-auto mb-2 text-[#00d187]" />
            No active alerts
          </div>
        ) : (
          activeAlerts.map((alert) => {
            const Icon = typeIcons[alert.type] || AlertTriangle;
            const critical = alert.severity === "critical";

            return (
              <div
                key={alert.id}
                className="flex gap-3 rounded-lg p-3 bg-[#141414] border border-[#009e66]"
              >
                <div
                  className={`h-10 w-10 rounded-md flex items-center justify-center ${
                    critical
                      ? "bg-red-500/15"
                      : "bg-[#00d187]/15"
                  }`}
                >
                  <Icon
                    className={`h-5 w-5 ${
                      critical ? "text-red-500" : "text-[#00d187]"
                    }`}
                  />
                </div>

                <div className="flex-1 space-y-1">
                  <div className="flex justify-between items-start gap-3">
                    <p className="font-medium text-white leading-tight">
                      {alert.title}
                    </p>
                    <Badge
                      className={`text-xs ${
                        critical
                          ? "bg-red-500/15 text-red-400 border border-red-500/30"
                          : "bg-[#00d187]/15 text-[#00d187] border border-[#00d187]/30"
                      }`}
                    >
                      {alert.type.replace("_", " ")}
                    </Badge>
                  </div>

                  <p className="text-sm text-gray-400">
                    {alert.description}
                  </p>

                  <p className="text-xs text-gray-500">
                    {formatDistanceToNow(
                      new Date(alert.created_at),
                      { addSuffix: true }
                    )}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </CardContent>
    </Card>
  );
}
