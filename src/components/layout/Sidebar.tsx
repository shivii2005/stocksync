// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { 
//   LayoutDashboard, 
//   Package, 
//   AlertTriangle, 
//   FileText, 
//   TrendingUp,
//   LogOut,
//   BoxesIcon,
//   User
// } from "lucide-react";
// import { cn } from "@/lib/utils";
// import { useAuth } from "@/hooks/useAuth";
// import { Button } from "@/components/ui/button";

// const navigation = [
//   { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
//   { name: "Inventory", href: "/inventory", icon: Package },
//   { name: "Alerts", href: "/alerts", icon: AlertTriangle },
//   { name: "Analytics", href: "/analytics", icon: TrendingUp },
//   { name: "Documentation", href: "/documentation", icon: FileText },
// ];

// export function Sidebar() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { user, signOut } = useAuth();

//   const handleSignOut = async () => {
//     await signOut();
//     navigate('/auth');
//   };

//   return (
//     <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-border bg-card">
//       <div className="flex h-full flex-col">
//         {/* Logo */}
//         <div className="flex h-16 items-center gap-2 border-b border-border px-6">
//           <div className="flex h-9 w-9 items-center justify-center rounded-lg gradient-primary">
//             <BoxesIcon className="h-5 w-5 text-primary-foreground" />
//           </div>
//           <span className="font-display text-xl font-bold text-foreground">StockSync</span>
//         </div>

//         {/* Navigation */}
//         <nav className="flex-1 space-y-1 px-3 py-4">
//           {navigation.map((item) => {
//             const isActive = location.pathname === item.href || 
//               (item.href === '/dashboard' && location.pathname === '/');
//             return (
//               <Link
//                 key={item.name}
//                 to={item.href}
//                 className={cn(
//                   "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
//                   isActive
//                     ? "bg-primary text-primary-foreground"
//                     : "text-muted-foreground hover:bg-secondary hover:text-foreground"
//                 )}
//               >
//                 <item.icon className="h-5 w-5" />
//                 {item.name}
//               </Link>
//             );
//           })}
//         </nav>

//         {/* User & Sign Out */}
//         <div className="border-t border-border p-3 space-y-2">
//           {user && (
//             <div className="flex items-center gap-3 rounded-lg px-3 py-2.5">
//               <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
//                 <User className="h-4 w-4 text-primary" />
//               </div>
//               <div className="flex-1 min-w-0">
//                 <p className="text-sm font-medium text-foreground truncate">
//                   {user.email}
//                 </p>
//               </div>
//             </div>
//           )}
//           <Button
//             variant="ghost"
//             className="w-full justify-start gap-3 text-muted-foreground hover:text-foreground"
//             onClick={handleSignOut}
//           >
//             <LogOut className="h-5 w-5" />
//             Sign Out
//           </Button>
//         </div>
//       </div>
//     </aside>
//   );
// }


import { Link, useLocation, useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, 
  Package, 
  AlertTriangle, 
  TrendingUp,
  LogOut,
  BoxesIcon,
  User
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Inventory", href: "/inventory", icon: Package },
  { name: "Alerts", href: "/alerts", icon: AlertTriangle },
  { name: "Analytics", href: "/analytics", icon: TrendingUp },
];

export function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    navigate("/auth");
  };

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-black bg-black">
      <div className="flex h-full flex-col">
        
        {/* Logo */}
        <div className="flex h-16 items-center gap-2 border-b border-black px-6">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#009e66]">
            <BoxesIcon className="h-5 w-5 text-white" />
          </div>
          <span className="font-display text-xl font-bold text-white">
            StockSync
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-3 py-4">
          {navigation.map((item) => {
            const isActive =
              location.pathname === item.href ||
              (item.href === "/dashboard" && location.pathname === "/");

            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
                  isActive
                    ? "bg-[#009e66] text-white"
                    : "text-white hover:bg-[#009e66]/10 hover:text-[#009e66]"
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* User & Sign Out */}
        <div className="border-t border-black p-3 space-y-2">
          {user && (
            <div className="flex items-center gap-3 rounded-lg px-3 py-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#009e66]/20">
                <User className="h-4 w-4 text-[#009e66]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">
                  {user.email}
                </p>
              </div>
            </div>
          )}

          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-white hover:text-[#009e66] hover:bg-[#009e66]/10"
            onClick={handleSignOut}
          >
            <LogOut className="h-5 w-5" />
            Sign Out
          </Button>
        </div>
      </div>
    </aside>
  );
}
