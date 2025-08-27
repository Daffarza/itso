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
  unit: string;
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
      unit: "Bagian IT",
      divisi: "Technical Support",
      nomorTelepon: "081234567890",
      hariTidakHadir: 18,
      tanggalTerakhir: "2024-01-15",
      status: "active"
    },
    {
      id: 2,
      nama: "Sri Rahayu",
      unit: "Bagian Administrasi",
      divisi: "Data Entry",
      nomorTelepon: "081234567891",
      hariTidakHadir: 22,
      tanggalTerakhir: "2024-01-10",
      status: "active"
    },
    {
      id: 3,
      nama: "Muhammad Ikhsan",
      unit: "Bagian Keamanan",
      divisi: "Security",
      nomorTelepon: "081234567892",
      hariTidakHadir: 25,
      tanggalTerakhir: "2024-01-08",
      status: "active"
    },
    {
      id: 4,
      nama: "Dewi Sartika",
      unit: "Bagian Keuangan",
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
        <h2 className="text-3xl font-bold tracking-tight">Non-ASN Absence Management</h2>
        <p className="text-muted-foreground">
          Kelola pegawai yang tidak hadir 15+ hari berturut-turut
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-warning" />
              Perlu Tindakan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">{activeEmployees.length}</div>
            <p className="text-xs text-muted-foreground">Pegawai aktif tidak hadir 15+ hari</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Ban className="h-4 w-4 text-destructive" />
              Dinonaktifkan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{disabledEmployees.length}</div>
            <p className="text-xs text-muted-foreground">Pegawai yang telah dinonaktifkan</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <UserX className="h-4 w-4 text-muted-foreground" />
              Total
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{employees.length}</div>
            <p className="text-xs text-muted-foreground">Total pegawai bermasalah</p>
          </CardContent>
        </Card>
      </div>

      {/* Active Employees Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-warning" />
            Pegawai Perlu Tindakan ({activeEmployees.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>No</TableHead>
                  <TableHead>Nama</TableHead>
                  <TableHead>Unit</TableHead>
                  <TableHead>Divisi</TableHead>
                  <TableHead>No. Telepon</TableHead>
                  <TableHead>Hari Tidak Hadir</TableHead>
                  <TableHead>Tanggal Terakhir</TableHead>
                  <TableHead>Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {activeEmployees.map((employee, index) => (
                  <TableRow key={employee.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell className="font-medium">{employee.nama}</TableCell>
                    <TableCell>{employee.unit}</TableCell>
                    <TableCell>{employee.divisi}</TableCell>
                    <TableCell>{employee.nomorTelepon}</TableCell>
                    <TableCell>
                      <Badge variant={employee.hariTidakHadir >= 25 ? "destructive" : "default"}>
                        {employee.hariTidakHadir} hari
                      </Badge>
                    </TableCell>
                    <TableCell>{employee.tanggalTerakhir}</TableCell>
                    <TableCell>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="destructive" size="sm">
                            <Ban className="w-4 h-4 mr-2" />
                            Nonaktifkan
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Konfirmasi Nonaktifkan Pegawai</AlertDialogTitle>
                            <AlertDialogDescription>
                              Apakah Anda yakin ingin menonaktifkan <strong>{employee.nama}</strong>? 
                              Pegawai ini telah tidak hadir selama <strong>{employee.hariTidakHadir} hari berturut-turut</strong>.
                              <br /><br />
                              Tindakan ini akan menonaktifkan akses pegawai ke sistem.
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
      {disabledEmployees.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Ban className="h-5 w-5 text-destructive" />
              Pegawai Dinonaktifkan ({disabledEmployees.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>No</TableHead>
                    <TableHead>Nama</TableHead>
                    <TableHead>Unit</TableHead>
                    <TableHead>Divisi</TableHead>
                    <TableHead>No. Telepon</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {disabledEmployees.map((employee, index) => (
                    <TableRow key={employee.id} className="opacity-75">
                      <TableCell>{index + 1}</TableCell>
                      <TableCell className="font-medium">{employee.nama}</TableCell>
                      <TableCell>{employee.unit}</TableCell>
                      <TableCell>{employee.divisi}</TableCell>
                      <TableCell>{employee.nomorTelepon}</TableCell>
                      <TableCell>
                        <Badge variant="destructive">Dinonaktifkan</Badge>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEnableEmployee(employee.id, employee.nama)}
                        >
                          Aktifkan Kembali
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default NonASNAbsence;