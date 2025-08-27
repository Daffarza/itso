import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  UserCheck,
  UserX,
  Download,
  Users,
  Calendar,
  Clock,
  AlertTriangle
} from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();

  const stats = [
    {
      title: "Total Pegawai Non-ASN",
      value: "1,248",
      icon: Users,
      change: "+12 dari bulan lalu"
    },
    {
      title: "Hadir Hari Ini",
      value: "1,156",
      icon: UserCheck,
      change: "92.6% kehadiran"
    },
    {
      title: "Tidak Hadir 15+ Hari",
      value: "23",
      icon: AlertTriangle,
      change: "Perlu tindakan"
    },
    {
      title: "Jam Kerja Rata-rata",
      value: "7.8 jam",
      icon: Clock,
      change: "Sesuai standar"
    }
  ];

  const quickActions = [
    {
      title: "Lihat Absensi",
      description: "Filter dan lihat data absensi pegawai",
      icon: UserCheck,
      action: () => navigate("/absensi")
    },
    {
      title: "Kelola Ketidakhadiran",
      description: "Tinjau pegawai yang tidak hadir 15+ hari",
      icon: UserX,
      action: () => navigate("/absence")
    },
    {
      title: "Export Data",
      description: "Download laporan dalam format Excel/PDF",
      icon: Download,
      action: () => navigate("/export")
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          Selamat Datang 
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

    

      
    </div>
  );
};

export default Dashboard;