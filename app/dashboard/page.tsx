"use client"

import { AppLayout } from "@/components/app-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { mockProducts, mockSales } from "@/lib/mock-data"
import { DollarSign, Package, ShoppingCart, TrendingUp, AlertTriangle } from "lucide-react"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"

export default function DashboardPage() {
  // Calcular métricas
  const totalProductos = mockProducts.length
  const totalVentas = mockSales.length
  const ventasHoy = mockSales.filter((sale) => sale.fecha.toDateString() === new Date().toDateString()).length

  const ingresoTotal = mockSales.reduce((sum, sale) => sum + sale.total, 0)
  const valorInventario = mockProducts.reduce((sum, product) => sum + product.precio * product.stock, 0)

  // Productos con stock bajo
  const productosStockBajo = mockProducts.filter((product) => product.stock <= product.stockMinimo)

  const salesByDay = mockSales.reduce(
    (acc, sale) => {
      const day = sale.fecha.toLocaleDateString("es-ES", { month: "short", day: "numeric" })
      const existing = acc.find((item) => item.day === day)
      if (existing) {
        existing.ventas += 1
        existing.ingresos += sale.total
      } else {
        acc.push({ day, ventas: 1, ingresos: sale.total })
      }
      return acc
    },
    [] as { day: string; ventas: number; ingresos: number }[],
  )

  const salesByCategory = mockProducts.reduce(
    (acc, product) => {
      const existing = acc.find((item) => item.categoria === product.categoria)
      const productSales = mockSales.reduce((sum, sale) => {
        const productInSale = sale.productos.find((p) => p.productoId === product.id)
        return sum + (productInSale ? productInSale.cantidad * productInSale.precio : 0)
      }, 0)

      if (existing) {
        existing.ventas += productSales
      } else {
        acc.push({ categoria: product.categoria, ventas: productSales })
      }
      return acc
    },
    [] as { categoria: string; ventas: number }[],
  )

  return (
    <AppLayout>
      <div className="p-8 space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-balance">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Resumen general de tu negocio</p>
        </div>

        {/* Métricas principales */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Ingresos Totales</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${ingresoTotal.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground mt-1">De {totalVentas} ventas realizadas</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Valor Inventario</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${valorInventario.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground mt-1">{totalProductos} productos en stock</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Ventas Hoy</CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{ventasHoy}</div>
              <p className="text-xs text-muted-foreground mt-1">Transacciones del día</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Margen Promedio</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">25%</div>
              <p className="text-xs text-muted-foreground mt-1">Ganancia por venta</p>
            </CardContent>
          </Card>
        </div>

        {/* Alertas de stock bajo */}
        {productosStockBajo.length > 0 && (
          <Card className="border-destructive">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-destructive">
                <AlertTriangle className="h-5 w-5" />
                Alertas de Stock Bajo
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {productosStockBajo.map((product) => (
                  <div key={product.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div>
                      <p className="font-medium">{product.nombre}</p>
                      <p className="text-sm text-muted-foreground">Stock actual: {product.stock} unidades</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-destructive font-medium">Mínimo: {product.stockMinimo}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Tendencia de Ventas</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  ventas: {
                    label: "Ventas",
                    color: "hsl(var(--chart-1))",
                  },
                }}
                className="h-[200px]"
              >
                <LineChart data={salesByDay}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line type="monotone" dataKey="ventas" stroke="var(--color-ventas)" strokeWidth={2} />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Ingresos por Día</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  ingresos: {
                    label: "Ingresos",
                    color: "hsl(var(--chart-2))",
                  },
                }}
                className="h-[200px]"
              >
                <BarChart data={salesByDay}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="ingresos" fill="var(--color-ingresos)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Ventas por Categoría</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                ventas: {
                  label: "Ventas",
                  color: "hsl(var(--chart-3))",
                },
              }}
              className="h-[250px]"
            >
              <BarChart data={salesByCategory} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="categoria" type="category" width={100} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="ventas" fill="var(--color-ventas)" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Productos más vendidos */}
        <Card>
          <CardHeader>
            <CardTitle>Productos Más Vendidos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockProducts.slice(0, 5).map((product) => (
                <div key={product.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Package className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{product.nombre}</p>
                      <p className="text-sm text-muted-foreground">{product.categoria}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${product.precio}</p>
                    <p className="text-sm text-muted-foreground">Stock: {product.stock}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  )
}
