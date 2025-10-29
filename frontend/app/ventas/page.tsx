"use client"

import { useState } from "react"
import { AppLayout } from "@/components/app-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { mockProducts, type Product } from "@/lib/mock-data"
import { ShoppingCart, Plus, Minus, Trash2, Search, DollarSign } from "lucide-react"
import { CompleteSaleDialog } from "@/components/complete-sale-dialog"

interface CartItem {
  product: Product
  cantidad: number
}

export default function VentasPage() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)

  // Filtrar productos por búsqueda
  const filteredProducts = mockProducts.filter(
    (product) =>
      product.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.categoria.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Agregar producto al carrito
  const addToCart = (product: Product) => {
    const existingItem = cart.find((item) => item.product.id === product.id)

    if (existingItem) {
      // Incrementar cantidad si ya existe
      setCart(cart.map((item) => (item.product.id === product.id ? { ...item, cantidad: item.cantidad + 1 } : item)))
    } else {
      // Agregar nuevo item
      setCart([...cart, { product, cantidad: 1 }])
    }
  }

  // Actualizar cantidad de un item
  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(productId)
      return
    }

    setCart(cart.map((item) => (item.product.id === productId ? { ...item, cantidad: newQuantity } : item)))
  }

  // Eliminar item del carrito
  const removeFromCart = (productId: string) => {
    setCart(cart.filter((item) => item.product.id !== productId))
  }

  // Limpiar carrito
  const clearCart = () => {
    setCart([])
  }

  // Calcular totales
  const subtotal = cart.reduce((sum, item) => sum + item.product.precio * item.cantidad, 0)
  const totalItems = cart.reduce((sum, item) => sum + item.cantidad, 0)

  // Completar venta
  const handleCompleteSale = () => {
    // Aquí se guardaría la venta en la base de datos
    console.log("Venta completada:", {
      productos: cart.map((item) => ({
        productoId: item.product.id,
        nombre: item.product.nombre,
        cantidad: item.cantidad,
        precio: item.product.precio,
      })),
      total: subtotal,
      fecha: new Date(),
    })

    clearCart()
    setIsCheckoutOpen(false)
  }

  return (
    <AppLayout>
      <div className="flex h-full">
        {/* Panel de productos */}
        <div className="flex-1 p-8 space-y-6 overflow-y-auto">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-balance">Punto de Venta</h1>
            <p className="text-muted-foreground mt-1">Selecciona productos para agregar al carrito</p>
          </div>

          {/* Búsqueda */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Grid de productos */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-base">{product.nombre}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">{product.categoria}</p>
                    </div>
                    <Badge variant={product.stock <= product.stockMinimo ? "destructive" : "secondary"}>
                      Stock: {product.stock}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground line-clamp-2">{product.descripcion}</p>
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold">${product.precio.toLocaleString()}</div>
                    <Button onClick={() => addToCart(product)} disabled={product.stock === 0} size="sm">
                      <Plus className="h-4 w-4" />
                      Agregar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No se encontraron productos</p>
            </div>
          )}
        </div>

        {/* Panel del carrito */}
        <div className="w-96 border-l border-border bg-card flex flex-col">
          {/* Header del carrito */}
          <div className="p-6 border-b border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5" />
                <h2 className="text-xl font-semibold">Carrito</h2>
              </div>
              {totalItems > 0 && (
                <Badge variant="default" className="text-sm">
                  {totalItems} {totalItems === 1 ? "item" : "items"}
                </Badge>
              )}
            </div>
          </div>

          {/* Items del carrito */}
          <ScrollArea className="flex-1">
            <div className="p-6 space-y-4">
              {cart.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingCart className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
                  <p className="text-muted-foreground">El carrito está vacío</p>
                  <p className="text-sm text-muted-foreground mt-1">Agrega productos para comenzar</p>
                </div>
              ) : (
                cart.map((item) => (
                  <Card key={item.product.id}>
                    <CardContent className="p-4 space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="font-medium">{item.product.nombre}</p>
                          <p className="text-sm text-muted-foreground">${item.product.precio.toLocaleString()}</p>
                        </div>
                        <Button variant="ghost" size="icon-sm" onClick={() => removeFromCart(item.product.id)}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon-sm"
                            onClick={() => updateQuantity(item.product.id, item.cantidad - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center font-medium">{item.cantidad}</span>
                          <Button
                            variant="outline"
                            size="icon-sm"
                            onClick={() => updateQuantity(item.product.id, item.cantidad + 1)}
                            disabled={item.cantidad >= item.product.stock}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        <div className="font-semibold">${(item.product.precio * item.cantidad).toLocaleString()}</div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </ScrollArea>

          {/* Footer del carrito */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-border space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">${subtotal.toLocaleString()}</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold">Total</span>
                  <span className="text-2xl font-bold">${subtotal.toLocaleString()}</span>
                </div>
              </div>

              <div className="space-y-2">
                <Button className="w-full" size="lg" onClick={() => setIsCheckoutOpen(true)}>
                  <DollarSign className="h-5 w-5" />
                  Completar Venta
                </Button>
                <Button variant="outline" className="w-full bg-transparent" onClick={clearCart}>
                  Limpiar Carrito
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Diálogo de completar venta */}
        <CompleteSaleDialog
          open={isCheckoutOpen}
          onOpenChange={setIsCheckoutOpen}
          cart={cart}
          total={subtotal}
          onConfirm={handleCompleteSale}
        />
      </div>
    </AppLayout>
  )
}
