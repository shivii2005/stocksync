// import { ReactNode } from "react";
// import { Card, CardContent } from "@/components/ui/card";
// import { cn } from "@/lib/utils";

// interface MetricCardProps {
//   title: string;
//   value: string | number;
//   subtitle?: string;
//   icon: ReactNode;
//   trend?: {
//     value: number;
//     isPositive: boolean;
//   };
//   variant?: "default" | "warning" | "success" | "destructive";
// }

// export function MetricCard({ 
//   title, 
//   value, 
//   subtitle,
//   icon, 
//   trend,
//   variant = "default" 
// }: MetricCardProps) {
//   const iconBgVariants = {
//     default: "bg-primary/10 text-primary",
//     warning: "bg-warning/10 text-warning",
//     success: "bg-success/10 text-success",
//     destructive: "bg-destructive/10 text-destructive",
//   };

//   return (
//     <Card className="shadow-card hover:shadow-elevated transition-shadow">
//       <CardContent className="p-6">
//         <div className="flex items-start justify-between">
//           <div className="space-y-2">
//             <p className="text-sm font-medium text-muted-foreground">{title}</p>
//             <p className="font-display text-3xl font-bold text-foreground">{value}</p>
//             {subtitle && (
//               <p className="text-sm text-muted-foreground">{subtitle}</p>
//             )}
//             {trend && (
//               <div className="flex items-center gap-1">
//                 <span className={cn(
//                   "text-sm font-medium",
//                   trend.isPositive ? "text-success" : "text-destructive"
//                 )}>
//                   {trend.isPositive ? "+" : ""}{trend.value}%
//                 </span>
//                 <span className="text-sm text-muted-foreground">vs last month</span>
//               </div>
//             )}
//           </div>
//           <div className={cn(
//             "flex h-12 w-12 items-center justify-center rounded-lg",
//             iconBgVariants[variant]
//           )}>
//             {icon}
//           </div>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }

import { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  variant?: "default" | "warning" | "success" | "destructive";
}

export function MetricCard({
  title,
  value,
  subtitle,
  icon,
  trend,
  variant = "default",
}: MetricCardProps) {
  const iconBgVariants = {
    default: "bg-[#00d187]/20 text-[#00d187]",
    warning: "bg-[#00d187]/20 text-[#00d187]",
    success: "bg-[#00d187]/20 text-[#00d187]",
    destructive: "bg-[#00d187]/20 text-[#00d187]",
  };

  return (
    <Card className="bg-black border border-[#00d187]/40 shadow-[0_0_25px_rgba(0,20,15,0.25)]  transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-300">{title}</p>
            <p className="font-display text-3xl font-bold text-white">
              {value}
            </p>
            {subtitle && (
              <p className="text-sm text-white">{subtitle}</p>
            )}
            {trend && (
              <div className="flex items-center gap-1">
                <span
                  className={cn(
                    "text-sm font-medium",
                    trend.isPositive
                      ? "text-[#00d187]"
                      : "text-red-500"
                  )}
                >
                  {trend.isPositive ? "+" : ""}
                  {trend.value}%
                </span>
                <span className="text-sm text-white">
                  vs last month
                </span>
              </div>
            )}
          </div>
          <div
            className={cn(
              "flex h-12 w-12 items-center justify-center rounded-lg",
              iconBgVariants[variant]
            )}
          >
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
