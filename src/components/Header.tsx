 import { LayoutDashboard } from 'lucide-react';
 
 export function Header() {
   return (
     <header className="bg-card border-b border-border px-6 py-4 shadow-card">
       <div className="flex items-center gap-3">
         <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary text-primary-foreground">
           <LayoutDashboard className="w-5 h-5" />
         </div>
         <div>
           <h1 className="text-xl font-bold text-foreground">TaskFlow</h1>
           <p className="text-xs text-muted-foreground">Organize your work, your way</p>
         </div>
       </div>
     </header>
   );
 }