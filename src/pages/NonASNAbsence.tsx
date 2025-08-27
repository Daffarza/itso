import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, UserX, Ban } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AbsentEmployee {
  id: number;
  nama: string;
  UnitKerja: string;
  divisi: string;
  nomorTelepon: string;
  hariTidakHadir: number;
  tanggalTerakhir: string;
  status: "active" | "disabled";
}

const NonASNAbsence = () => {
  const { toast } = useToast();
  const [employees, setEmployees] = useState<AbsentEmployee[]>([
    {
      id: 1,
      nama: "Andi Wijaya",
      UnitKerja: "Sekretariat",
      divisi: "Sekretariat",
      nomorTelepon: "081234567890",
      hariTidakHadir: 18,
      tanggalTerakhir: "2024-01-15",
      status: "active"
    },
    {
      id: 2,
      nama: "Sri Rahayu",
      UnitKerja: "IKP",
      divisi: "JQR",
      nomorTelepon: "081234567891",
      hariTidakHadir: 22,
      tanggalTerakhir: "2024-01-10",
      status: "active"
    },
    {
      id: 3,
      nama: "Muhammad Ikhsan",
      UnitKerja: "IKP",
      divisi: "JQR",
      nomorTelepon: "081234567892",
      hariTidakHadir: 25,
      tanggalTerakhir: "2024-01-08",
      status: "active"
    },
    {
      id: 4,
      nama: "Dewi Sartika",
      UnitKerja: "Bagian Keuangan",
      divisi: "Accounting",
      nomorTelepon: "081234567893",
      hariTidakHadir: 30,
      tanggalTerakhir: "2024-01-05",
      status: "disabled"
    }
  ]);

  const handleDisableEmployee = (employeeId: number, employeeName: string) => {
    setEmployees(prev => 
      prev.map(emp => 
        emp.id === employeeId 
          ? { ...emp, status: "disabled" as const }
          : emp
      )
    );
    
    toast({
      title: "Pegawai berhasil dinonaktifkan",
      description: `${employeeName} telah dinonaktifkan dari sistem`
    });
  };

  const handleEnableEmployee = (employeeId: number, employeeName: string) => {
    setEmployees(prev => 
      prev.map(emp => 
        emp.id === employeeId 
          ? { ...emp, status: "active" as const }
          : emp
      )
    );
    
    toast({
      title: "Pegawai berhasil diaktifkan",
      description: `${employeeName} telah diaktifkan kembali`
    });
  };

  const activeEmployees = employees.filter(emp => emp.status === "active");
  const disabledEmployees = employees.filter(emp => emp.status === "disabled");

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Non PNS Tidak Absen</h2>
        <p className="text-muted-foreground">
          Data Pegawai DISKOMINFO JAWA BARAT yang tidak absen selama 15 hari berturut-turut dalam 30 hari terakhir
        </p>
      </div>

      

      {/* Active Employees Table */}
      <Card>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>No</TableHead>
                  <TableHead>Nama</TableHead>
                  <TableHead>UnitKerja</TableHead>
                  <TableHead>Divisi</TableHead>
                  <TableHead>Nomor Telepon</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {activeEmployees.map((employee, index) => (
                  <TableRow key={employee.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell className="font-medium">{employee.nama}</TableCell>
                    <TableCell>{employee.UnitKerja}</TableCell>
                    <TableCell>{employee.divisi}</TableCell>
                    <TableCell>{employee.nomorTelepon}</TableCell>
                    <TableCell>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="destructive" size="sm">
                            <UserX className="w-4 h-4 mr-2" />
                            
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Konfirmasi Nonaktifkan Pegawai</AlertDialogTitle>
                            <AlertDialogDescription>
                              Apakah yakin menonaktifkan pegawai ? 
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Batal</AlertDialogCancel>
                            <AlertDialogAction
                              className="bg-destructive hover:bg-destructive/90"
                              onClick={() => handleDisableEmployee(employee.id, employee.nama)}
                            >
                              Ya, Nonaktifkan
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          {activeEmployees.length === 0 && (
            <div className="text-center py-8">
              <UserX className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-2 text-sm font-semibold">Tidak ada pegawai yang perlu tindakan</h3>
              <p className="text-sm text-muted-foreground">
                Semua pegawai memiliki catatan kehadiran yang baik
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Disabled Employees Table */}

    </div>
  );
};

export default NonASNAbsence;