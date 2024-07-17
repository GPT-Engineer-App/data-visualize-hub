import { BarChart3, Home, PieChart } from "lucide-react";
import Overview from "./pages/Overview";
import Analytics from "./pages/Analytics";
import Reports from "./pages/Reports";

export const navItems = [
  {
    title: "Overview",
    to: "/",
    icon: <Home className="h-4 w-4" />,
    page: <Overview />,
  },
  {
    title: "Analytics",
    to: "/analytics",
    icon: <BarChart3 className="h-4 w-4" />,
    page: <Analytics />,
  },
  {
    title: "Reports",
    to: "/reports",
    icon: <PieChart className="h-4 w-4" />,
    page: <Reports />,
  },
];