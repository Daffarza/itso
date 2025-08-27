import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useNavigate } from "react-router-dom";
import { LogOut, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Header = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    toast({
      title: "Logout berhasil",
      description: "Anda telah keluar dari sistem"
    });
    navigate("/");
  };

  return (
    <header className="h-16 border-b bg-card flex items-center justify-between px-4">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="p-2" />
        <div>
          <h1 className="font-semibold">Sistem Absensi Non-ASN</h1>
          <p className="text-sm text-muted-foreground">Admin Kepegawaian</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-sm">
          <User className="w-4 h-4" />
          <span>Admin</span>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleLogout}
          className="text-destructive hover:text-destructive"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Keluar
        </Button>
      </div>
    </header>
  );
};

export default Header;