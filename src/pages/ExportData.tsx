import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Download, FileSpreadsheet, FileText, Copy, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ExportData = () => {
  const { toast } = useToast();
  const [exportConfig, setExportConfig] = useState({
    dataType: "",
    format: "",
    dateRange: {
      start: "",
      end: ""
    },
    unitKerja: "",
    includeFields: {
      nama: true,
      divisi: true,
      jamMasuk: true,
      jamKeluar: true,
      jamKerja: true,
      perasaan: false,
      catatan: false
    }
  });

  const dataTypes = [
    { value: "absensi", label: "Data Absensi Harian" },
    { value: "absence", label: "Data Ketidakhadiran 15+ Hari" },
    { value: "summary", label: "Ringkasan Bulanan" },
    { value: "all", label: "Semua Data" }
  ];

  const exportFormats = [
    { value: "xlsx", label: "Excel (.xlsx)", icon: FileSpreadsheet },
    { value: "pdf", label: "PDF (.pdf)", icon: FileText },
    { value: "csv", label: "CSV (.csv)", icon: FileSpreadsheet }
  ];

  const unitKerjaOptions = [
    "Semua Unit",
    "Bagian Kepegawaian",
    "Bagian Keuangan", 
    "Bagian Administrasi",
    "Bagian IT",
    "Bagian Keamanan"
  ];

  const handleExport = () => {
    if (!exportConfig.dataType || !exportConfig.format) {
      toast({
        variant: "destructive",
        title: "Konfigurasi tidak lengkap",
        description: "Mohon pilih jenis data dan format export"
      });
      return;
    }

    toast({
      title: "Export berhasil dimulai",
      description: `Data ${exportConfig.dataType} sedang diexport ke format ${exportConfig.format.toUpperCase()}`
    });

    // Simulate export process
    setTimeout(() => {
      toast({
        title: "Export selesai",
        description: "File telah berhasil didownload"
      });
    }, 2000);
  };

  const handleQuickExport = (type: string, format: string) => {
    toast({
      title: `Export ${format.toUpperCase()} dimulai`,
      description: `Mengexport ${type} ke format ${format.toUpperCase()}`
    });
  };

  const copyToClipboard = () => {
    toast({
      title: "Data disalin",
      description: "Data tabel telah disalin ke clipboard"
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Export Data</h2>
        <p className="text-muted-foreground">
          Export data absensi dalam berbagai format
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Export Configuration */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Download className="h-5 w-5" />
              Konfigurasi Export
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Data Type Selection */}
            <div className="space-y-2">
              <Label>Jenis Data</Label>
              <Select
                value={exportConfig.dataType}
                onValueChange={(value) =>
                  setExportConfig({ ...exportConfig, dataType: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Pilih jenis data" />
                </SelectTrigger>
                <SelectContent>
                  {dataTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Format Selection */}
            <div className="space-y-2">
              <Label>Format Export</Label>
              <div className="grid gap-2">
                {exportFormats.map((format) => (
                  <div
                    key={format.value}
                    className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                      exportConfig.format === format.value
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-muted"
                    }`}
                    onClick={() =>
                      setExportConfig({ ...exportConfig, format: format.value })
                    }
                  >
                    <div className="flex items-center gap-2">
                      <format.icon className="h-4 w-4" />
                      <span className="font-medium">{format.label}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Date Range */}
            <div className="space-y-2">
              <Label>Rentang Tanggal</Label>
              <div className="grid gap-2 md:grid-cols-2">
                <div>
                  <Label className="text-sm text-muted-foreground">Tanggal Mulai</Label>
                  <Input
                    type="date"
                    value={exportConfig.dateRange.start}
                    onChange={(e) =>
                      setExportConfig({
                        ...exportConfig,
                        dateRange: { ...exportConfig.dateRange, start: e.target.value }
                      })
                    }
                  />
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground">Tanggal Selesai</Label>
                  <Input
                    type="date"
                    value={exportConfig.dateRange.end}
                    onChange={(e) =>
                      setExportConfig({
                        ...exportConfig,
                        dateRange: { ...exportConfig.dateRange, end: e.target.value }
                      })
                    }
                  />
                </div>
              </div>
            </div>

            {/* Unit Kerja */}
            <div className="space-y-2">
              <Label>Unit Kerja</Label>
              <Select
                value={exportConfig.unitKerja}
                onValueChange={(value) =>
                  setExportConfig({ ...exportConfig, unitKerja: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Pilih unit kerja" />
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

            {/* Field Selection */}
            <div className="space-y-2">
              <Label>Kolom yang Disertakan</Label>
              <div className="grid gap-2">
                {Object.entries(exportConfig.includeFields).map(([field, checked]) => (
                  <div key={field} className="flex items-center space-x-2">
                    <Checkbox
                      id={field}
                      checked={checked}
                      onCheckedChange={(isChecked) =>
                        setExportConfig({
                          ...exportConfig,
                          includeFields: {
                            ...exportConfig.includeFields,
                            [field]: isChecked as boolean
                          }
                        })
                      }
                    />
                    <Label htmlFor={field} className="text-sm capitalize">
                      {field.replace(/([A-Z])/g, ' $1').toLowerCase()}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <Button onClick={handleExport} className="w-full">
              <Download className="w-4 h-4 mr-2" />
              Export Data
            </Button>
          </CardContent>
        </Card>

        {/* Quick Export Options */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Aksi Cepat</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => handleQuickExport("data absensi hari ini", "xlsx")}
              >
                <FileSpreadsheet className="w-4 h-4 mr-2" />
                Export Absensi Hari Ini (Excel)
              </Button>
              
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => handleQuickExport("laporan bulanan", "pdf")}
              >
                <FileText className="w-4 h-4 mr-2" />
                Export Laporan Bulanan (PDF)
              </Button>
              
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={copyToClipboard}
              >
                <Copy className="w-4 h-4 mr-2" />
                Salin Data ke Clipboard
              </Button>
            </CardContent>
          </Card>

          {/* Export History */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Riwayat Export
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 bg-muted/50 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-sm">Data Absensi Januari 2024</p>
                      <p className="text-xs text-muted-foreground">Format: Excel • 15:30 WIB</p>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="p-3 bg-muted/50 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-sm">Laporan Ketidakhadiran</p>
                      <p className="text-xs text-muted-foreground">Format: PDF • 14:15 WIB</p>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="p-3 bg-muted/50 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-sm">Semua Data Pegawai</p>
                      <p className="text-xs text-muted-foreground">Format: CSV • 13:45 WIB</p>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ExportData;