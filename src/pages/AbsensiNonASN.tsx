import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, Filter, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AbsensiNonASN = () => {
  const [filters, setFilters] = useState({
    unitKerja: "",
    periode: "",
    startDate: "",
    endDate: ""
  });
  
  const [showResults, setShowResults] = useState(false);
  const { toast } = useToast();

  // Mock data
  const attendanceData = [
    {
      id: 1,
      nama: "Ahmad Susanto",
      divisi: "IT Support",
      jamMasuk: "08:15",
      jamKeluar: "17:30",
      jamKerja: "8.25",
      perasaan: "Baik",
      catatan: "Menyelesaikan update sistem"
    },
    {
      id: 2,
      nama: "Siti Nurhaliza",
      divisi: "Administrasi",
      jamMasuk: "08:00",
      jamKeluar: "17:00",
      jamKerja: "8.00",
      perasaan: "Sangat Baik",
      catatan: "Laporan bulanan selesai"
    },
    {
      id: 3,
      nama: "Budi Santoso",
      divisi: "Keamanan",
      jamMasuk: "07:45",
      jamKeluar: "16:45",
      jamKerja: "8.00",
      perasaan: "Baik",
      catatan: "Patroli rutin selesai"
    }
  ];

  const unitKerjaOptions = [
    "Bagian Kepegawaian",
    "Bagian Keuangan",
    "Bagian Administrasi",
    "Bagian IT",
    "Bagian Keamanan"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!filters.unitKerja || !filters.startDate || !filters.endDate) {
      toast({
        variant: "destructive",
        title: "Data tidak lengkap",
        description: "Mohon lengkapi semua field filter"
      });
      return;
    }

    setShowResults(true);
    toast({
      title: "Data berhasil dimuat",
      description: `Menampilkan data absensi untuk ${filters.unitKerja}`
    });
  };

  const exportData = (format: string) => {
    toast({
      title: "Export dimulai",
      description: `Data sedang diexport ke format ${format}`
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Absensi Non-ASN</h2>
        <p className="text-muted-foreground">
          Filter dan lihat data absensi pegawai non-ASN
        </p>
      </div>

      {/* Filter Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filter Data
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div className="space-y-2">
                <Label htmlFor="unitKerja">Unit Kerja</Label>
                <Select value={filters.unitKerja} onValueChange={(value) =>
                  setFilters({ ...filters, unitKerja: value })
                }>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih Unit Kerja" />
                  </SelectTrigger>
                  <SelectContent>
                    {unitKerjaOptions.map((unit) => (
                      <SelectItem key={unit} value={unit}>
                        {unit}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="startDate">Tanggal Mulai</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={filters.startDate}
                  onChange={(e) =>
                    setFilters({ ...filters, startDate: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="endDate">Tanggal Selesai</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={filters.endDate}
                  onChange={(e) =>
                    setFilters({ ...filters, endDate: e.target.value })
                  }
                />
              </div>

              <div className="flex items-end">
                <Button type="submit" className="w-full">
                  <Search className="w-4 h-4 mr-2" />
                  Tampilkan Data
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Results Table */}
      {showResults && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Data Absensi</CardTitle>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => exportData("Excel")}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Excel
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => exportData("PDF")}
                >
                  <Download className="w-4 h-4 mr-2" />
                  PDF
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>No</TableHead>
                    <TableHead>Nama</TableHead>
                    <TableHead>Divisi</TableHead>
                    <TableHead>Jam Masuk</TableHead>
                    <TableHead>Jam Keluar</TableHead>
                    <TableHead>Jam Kerja</TableHead>
                    <TableHead>Perasaan</TableHead>
                    <TableHead>Catatan</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {attendanceData.map((item, index) => (
                    <TableRow key={item.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell className="font-medium">{item.nama}</TableCell>
                      <TableCell>{item.divisi}</TableCell>
                      <TableCell>{item.jamMasuk}</TableCell>
                      <TableCell>{item.jamKeluar}</TableCell>
                      <TableCell>{item.jamKerja} jam</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          item.perasaan === "Sangat Baik" 
                            ? "bg-success/10 text-success" 
                            : "bg-primary/10 text-primary"
                        }`}>
                          {item.perasaan}
                        </span>
                      </TableCell>
                      <TableCell>{item.catatan}</TableCell>
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

export default AbsensiNonASN;