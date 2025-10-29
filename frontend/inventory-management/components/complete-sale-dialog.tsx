// Diálogo para completar una venta
"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { CheckCircle2 } from "lucide-react"
import type { Product } from "@/lib/mock-data"

interface CartItem {
  product: Product
  cantidad: number
}

interface CompleteSaleDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  cart: CartItem[]
  total: number
  onConfirm: () => void
}

export function CompleteSaleDialog({ open, onOpenChange, cart, total, onConfirm }: CompleteSaleDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-primary" />
            Confirmar Venta
          </DialogTitle>
          <DialogDescription>Revisa los detalles antes de completar la venta</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Resumen de productos */}
          <div className="space-y-2">
            <h3 className="font-medium text-sm">Productos</h3>
            <div className="space-y-2">
              {cart.map((item) => (
                <div key={item.product.id} className="flex items-center justify-between text-sm">
                  <div className="flex-1">
                    <p className="font-medium">{item.product.nombre}</p>
                    <p className="text-muted-foreground">
                      {item.cantidad} x ${item.product.precio.toLocaleString()}
                    </p>
                  </div>
                  <span className="font-medium">${(item.product.precio * item.cantidad).toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Total */}
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold">Total a Cobrar</span>
            <span className="text-2xl font-bold text-primary">${total.toLocaleString()}</span>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={onConfirm}>Confirmar Venta</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
