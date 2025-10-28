// Diálogo para mostrar detalles de una venta
"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Calendar, Package } from "lucide-react"
import type { Sale } from "@/lib/mock-data"
import { formatDate, formatCurrency } from "@/lib/utils"

interface SaleDetailsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  sale: Sale | null
}

export function SaleDetailsDialog({ open, onOpenChange, sale }: SaleDetailsDialogProps) {
  if (!sale) return null

  const totalItems = sale.productos.reduce((sum, p) => sum + p.cantidad, 0)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">Detalles de Venta #{sale.id}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Información general */}
          <Card>
            <CardContent className="pt-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Calendar className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Fecha</p>
                    <p className="font-medium">{formatDate(sale.fecha)}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Package className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Items</p>
                    <p className="font-medium">{totalItems} productos</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Productos */}
          <div className="space-y-2">
            <h3 className="font-semibold">Productos</h3>
            <div className="space-y-2">
              {sale.productos.map((producto, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="font-medium">{producto.nombre}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="secondary" className="text-xs">
                            Cantidad: {producto.cantidad}
                          </Badge>
                          <span className="text-sm text-muted-foreground">{formatCurrency(producto.precio)} c/u</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{formatCurrency(producto.precio * producto.cantidad)}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <Separator />

          {/* Total */}
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold">Total de la Venta</span>
            <span className="text-2xl font-bold text-primary">{formatCurrency(sale.total)}</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
