import { BarChart3, Database, Home, PieChart, Upload, Wrench } from "lucide-react";
import Overview from "./pages/Overview";
import Analytics from "./pages/Analytics";
import Reports from "./pages/Reports";
import UploadData from "./pages/UploadData";
import Data from "./pages/Data";
import Build from "./pages/Build";

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
  {
    title: "Upload Data",
    to: "/upload-data",
    icon: <Upload className="h-4 w-4" />,
    page: <UploadData />,
  },
  {
    title: "Data",
    to: "/data",
    icon: <Database className="h-4 w-4" />,
    page: <Data />,
  },
  {
    title: "Build",
    to: "/build",
    icon: <Wrench className="h-4 w-4" />,
    page: <Build />,
  },
];