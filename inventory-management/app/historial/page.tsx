// Página de historial de ventas con detalles de transacciones
"use client"

import { useState } from "react"
import { AppLayout } from "@/components/app-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { mockSales, type Sale } from "@/lib/mock-data"
import { History, Search, Eye, Calendar, DollarSign, Package } from "lucide-react"
import { SaleDetailsDialog } from "@/components/sale-details-dialog"
import { formatDate, formatCurrency } from "@/lib/utils"

export default function HistorialPage() {
  const [sales] = useState<Sale[]>(mockSales)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSale, setSelectedSale] = useState<Sale | null>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)

  // Filtrar ventas por búsqueda
  const filteredSales = sales.filter((sale) => {
    const searchLower = searchTerm.toLowerCase()
    return (
      sale.id.toLowerCase().includes(searchLower) ||
      sale.productos.some((p) => p.nombre.toLowerCase().includes(searchLower)) ||
      formatDate(sale.fecha).toLowerCase().includes(searchLower)
    )
  })

  // Ordenar por fecha más reciente
  const sortedSales = [...filteredSales].sort((a, b) => b.fecha.getTime() - a.fecha.getTime())

  // Abrir detalles de venta
  const openSaleDetails = (sale: Sale) => {
    setSelectedSale(sale)
    setIsDetailsOpen(true)
  }

  // Calcular estadísticas
  const totalSales = sales.length
  const totalRevenue = sales.reduce((sum, sale) => sum + sale.total, 0)
  const averageSale = totalSales > 0 ? totalRevenue / totalSales : 0
  const totalProducts = sales.reduce((sum, sale) => sum + sale.productos.reduce((s, p) => s + p.cantidad, 0), 0)

  return (
    <AppLayout>
      <div className="p-8 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-balance">Historial de Ventas</h1>
          <p className="text-muted-foreground mt-1">Revisa todas las transacciones realizadas</p>
        </div>

        {/* Estadísticas */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Ventas</CardTitle>
              <History className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalSales}</div>
              <p className="text-xs text-muted-foreground mt-1">Transacciones registradas</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Ingresos Totales</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(totalRevenue)}</div>
              <p className="text-xs text-muted-foreground mt-1">Suma de todas las ventas</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Venta Promedio</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(averageSale)}</div>
              <p className="text-xs text-muted-foreground mt-1">Por transacción</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Productos Vendidos</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalProducts}</div>
              <p className="text-xs text-muted-foreground mt-1">Unidades totales</p>
            </CardContent>
          </Card>
        </div>

        {/* Búsqueda */}
        <Card>
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por ID, producto o fecha..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Tabla de ventas */}
        <Card>
          <CardHeader>
            <CardTitle>Transacciones</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Productos</TableHead>
                  <TableHead className="text-right">Cantidad</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedSales.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                      No se encontraron ventas
                    </TableCell>
                  </TableRow>
                ) : (
                  sortedSales.map((sale) => {
                    const totalItems = sale.productos.reduce((sum, p) => sum + p.cantidad, 0)
                    const productNames = sale.productos.map((p) => p.nombre).join(", ")

                    return (
                      <TableRow key={sale.id}>
                        <TableCell className="font-medium">#{sale.id}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            {formatDate(sale.fecha)}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="max-w-xs truncate" title={productNames}>
                            {productNames}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <Badge variant="secondary">{totalItems} items</Badge>
                        </TableCell>
                        <TableCell className="text-right font-semibold">{formatCurrency(sale.total)}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="icon-sm" onClick={() => openSaleDetails(sale)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    )
                  })
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Diálogo de detalles */}
        <SaleDetailsDialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen} sale={selectedSale} />
      </div>
    </AppLayout>
  )
}
