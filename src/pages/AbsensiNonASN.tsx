import { useState } from "react";
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
import { Filter, Search, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AbsensiNonASN = () => {
  const [filters, setFilters] = useState({
    namaBidang: "",
    tanggalAwal: "",
    tanggalAkhir: ""
  });
  
  const [showResults, setShowResults] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  // Mock data
  const attendanceData = [
    {
      id: 1,
      nama: "Ahmad Susanto",
      divisi: "Sekretariat",
      tanggal: "01-08-2025",
      jamMasuk: "08:15",
      jamKeluar: "17:30",
      jamKerja: "8.25",
      perasaan: "Neutral",
      catatan: "Menyelesaikan update sistem"
    },
    {
      id: 2,
      nama: "Siti Nurhaliza",
      divisi: "Sekretariat",
      tanggal: "01-08-2025",
      jamMasuk: "08:00",
      jamKeluar: "17:00",
      jamKerja: "8.00",
      perasaan: "Neutral",
      catatan: "Laporan bulanan selesai"
    },
    {
      id: 3,
      nama: "Budi Santoso",
      divisi: "Sekretariat",
      tanggal: "01-08-2025",
      jamMasuk: "07:45",
      jamKeluar: "16:45",
      jamKerja: "8.00",
      perasaan: "-",
      catatan: "Patroli rutin selesai"
    }
  ];

  const bidangOptions = [
    "Semua kecuali UPTD",
    "APTIKA", 
    "E-GOV",
    "IKP",
    "SANDIKAMI",
    "Sekretariat",
    "Statistik",
    "UPTD PLDDIG"
  ];

  const handleFilter = () => {
    if (!filters.namaBidang || !filters.tanggalAwal || !filters.tanggalAkhir) {
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
      description: `Menampilkan data kehadiran untuk ${filters.namaBidang}`
    });
  };

  const exportData = (format: string) => {
    toast({
      title: "Export dimulai",
      description: `Data sedang diexport ke format ${format}`
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      

      {/* Filter Section */}
      <div className="bg-card rounded-lg border p-6 mb-6">
      <h1 className="text-3xl font-low   text-foreground mb-2">Kehadiran Non ASN</h1>
        <div className="grid gap-6 md:grid-cols-2">
          {/* Tanggal Awal */}
          <div className="space-y-2">
            <Label htmlFor="tanggalAwal" className="text-sm font-bold">
              Tanggal Awal
            </Label>
            <Input
              id="tanggalAwal"
              type="date"
              value={filters.tanggalAwal}
              onChange={(e) => setFilters({ ...filters, tanggalAwal: e.target.value })}
              placeholder="dd/mm/yyyy"
              className="w-full"
            />
          </div>

          {/* Tanggal Akhir */}
          <div className="space-y-2">
            <Label htmlFor="tanggalAkhir" className="text-sm font-bold">
              Tanggal Akhir  
            </Label>
            <Input
              id="tanggalAkhir"
              type="date"
              value={filters.tanggalAkhir}
              onChange={(e) => setFilters({ ...filters, tanggalAkhir: e.target.value })}
              placeholder="dd/mm/yyyy"
              className="w-full"
            />
          </div>

          {/* Nama Bidang */}
          <div className="space-y-2">
            <Label htmlFor="namaBidang" className="text-sm font-bold">
              Nama Bidang
            </Label>
            <Select value={filters.namaBidang} onValueChange={(value) => setFilters({ ...filters, namaBidang: value })}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="--Semua--" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="semua">- Semua -</SelectItem>
                {bidangOptions.map((bidang) => (
                  <SelectItem key={bidang} value={bidang}>
                    {bidang}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Filter Button */}
        <div className="flex justify-start mt-6">
          <Button 
            onClick={handleFilter}
            variant="warning"
            className="flex items-center gap-2 px-6"
          >
            <Filter className="w-4 h-4" />
            Filter
          </Button>
        </div>
      </div>

      {/* Results Table */}
      {showResults && (
        <div className="bg-card rounded-lg border p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Data Kehadiran Non ASN</h3>
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
              <Button
                variant="outline"
                size="sm"
                onClick={() => exportData("Copy")}
              >
                Copy
              </Button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="text-center">No</TableHead>
                  <TableHead>Nama</TableHead>
                  <TableHead>Divisi</TableHead>
                  <TableHead className="text-center">Tanggal</TableHead>
                  <TableHead className="text-center">Scan Masuk</TableHead>
                  <TableHead className="text-center">Scan Keluar</TableHead>
                  <TableHead className="text-center">Jumlah Jam Kerja</TableHead>
                  <TableHead className="text-center">Perasaan</TableHead>
                  <TableHead>Keterangan</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {attendanceData.map((item, index) => (
                  <TableRow key={item.id} className="hover:bg-muted/30">
                    <TableCell className="text-center">{index + 1}</TableCell>
                    <TableCell className="font-medium">{item.nama}</TableCell>
                    <TableCell>{item.divisi}</TableCell>
                    <TableCell className="text-center">{item.tanggal}</TableCell>
                    <TableCell className="text-center">{item.jamMasuk}</TableCell>
                    <TableCell className="text-center">{item.jamKeluar}</TableCell>
                    <TableCell className="text-center">{item.jamKerja} jam</TableCell>
                    <TableCell className="text-center">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        item.perasaan === "Sangat Baik" 
                          ? "bg-success/20 text-success" 
                          : "bg-primary/20 text-primary"
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
        </div>
      )}

      
    </div>
  );
};

export default AbsensiNonASN;