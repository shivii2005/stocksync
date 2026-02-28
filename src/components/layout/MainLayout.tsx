// import { ReactNode } from "react";
// import { Sidebar } from "./Sidebar";

// interface MainLayoutProps {
//   children: ReactNode;
// }

// export function MainLayout({ children }: MainLayoutProps) {
//   return (
//     <div className="min-h-screen bg-background">
//       <Sidebar />
//       <main className="pl-60">
//         <div className="min-h-screen">
//           {children}
//         </div>
//       </main>
//     </div>
//   );
// }

import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-black">
      <Sidebar />
      <main className="pl-60">
        <div className="min-h-screen bg-black text-white">
          {children}
        </div>
      </main>
    </div>
  );
}
