"use client"

import { useState } from "react"
import { useTheme } from "next-themes"
import { AppLayout } from "@/components/app-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Building2, Bell, Palette, Database, CheckCircle2, Info } from "lucide-react"

export default function ConfiguracionPage() {
  const { theme, setTheme } = useTheme()

  const [businessName, setBusinessName] = useState("Mi Negocio")
  const [businessAddress, setBusinessAddress] = useState("Calle Principal 123")
  const [businessPhone, setBusinessPhone] = useState("+52 123 456 7890")
  const [businessEmail, setBusinessEmail] = useState("contacto@minegocio.com")
  const [taxId, setTaxId] = useState("RFC123456789")

  const [lowStockNotifications, setLowStockNotifications] = useState(true)
  const [salesNotifications, setSalesNotifications] = useState(true)
  const [emailNotifications, setEmailNotifications] = useState(false)

  const [compactView, setCompactView] = useState(false)

  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    // Aquí se guardarían las configuraciones
    console.log("Configuraciones guardadas:", {
      business: { businessName, businessAddress, businessPhone, businessEmail, taxId },
      notifications: { lowStockNotifications, salesNotifications, emailNotifications },
      appearance: { theme, compactView },
    })

    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <AppLayout>
      <div className="p-8 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-balance">Configuración</h1>
          <p className="text-muted-foreground mt-1">Administra las preferencias del sistema</p>
        </div>

        {/* Alert de guardado exitoso */}
        {saved && (
          <Alert>
            <CheckCircle2 className="h-4 w-4" />
            <AlertTitle>Cambios guardados</AlertTitle>
            <AlertDescription>Tu configuración se ha actualizado correctamente.</AlertDescription>
          </Alert>
        )}

        {/* Tabs de configuración */}
        <Tabs defaultValue="business" className="space-y-6">
          <TabsList>
            <TabsTrigger value="business">
              <Building2 className="h-4 w-4" />
              Negocio
            </TabsTrigger>
            <TabsTrigger value="notifications">
              <Bell className="h-4 w-4" />
              Notificaciones
            </TabsTrigger>
            <TabsTrigger value="appearance">
              <Palette className="h-4 w-4" />
              Apariencia
            </TabsTrigger>
            <TabsTrigger value="data">
              <Database className="h-4 w-4" />
              Datos
            </TabsTrigger>
          </TabsList>

          {/* Tab: Información del Negocio */}
          <TabsContent value="business">
            <Card>
              <CardHeader>
                <CardTitle>Información del Negocio</CardTitle>
                <CardDescription>Configura los datos de tu empresa</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="business-name">Nombre del Negocio</Label>
                  <Input
                    id="business-name"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    placeholder="Ej: Mi Tienda"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="business-address">Dirección</Label>
                  <Textarea
                    id="business-address"
                    value={businessAddress}
                    onChange={(e) => setBusinessAddress(e.target.value)}
                    placeholder="Dirección completa del negocio"
                    rows={3}
                  />
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="business-phone">Teléfono</Label>
                    <Input
                      id="business-phone"
                      type="tel"
                      value={businessPhone}
                      onChange={(e) => setBusinessPhone(e.target.value)}
                      placeholder="+52 123 456 7890"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="business-email">Email</Label>
                    <Input
                      id="business-email"
                      type="email"
                      value={businessEmail}
                      onChange={(e) => setBusinessEmail(e.target.value)}
                      placeholder="contacto@negocio.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tax-id">RFC / ID Fiscal</Label>
                  <Input
                    id="tax-id"
                    value={taxId}
                    onChange={(e) => setTaxId(e.target.value)}
                    placeholder="RFC123456789"
                  />
                </div>

                <Separator />

                <Button onClick={handleSave}>Guardar Cambios</Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab: Notificaciones */}
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Preferencias de Notificaciones</CardTitle>
                <CardDescription>Configura cómo y cuándo recibir alertas</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="low-stock">Alertas de Stock Bajo</Label>
                    <p className="text-sm text-muted-foreground">
                      Recibe notificaciones cuando los productos alcancen el stock mínimo
                    </p>
                  </div>
                  <Switch id="low-stock" checked={lowStockNotifications} onCheckedChange={setLowStockNotifications} />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="sales-notifications">Notificaciones de Ventas</Label>
                    <p className="text-sm text-muted-foreground">Recibe alertas cuando se complete una venta</p>
                  </div>
                  <Switch
                    id="sales-notifications"
                    checked={salesNotifications}
                    onCheckedChange={setSalesNotifications}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-notifications">Notificaciones por Email</Label>
                    <p className="text-sm text-muted-foreground">Enviar resúmenes diarios por correo electrónico</p>
                  </div>
                  <Switch
                    id="email-notifications"
                    checked={emailNotifications}
                    onCheckedChange={setEmailNotifications}
                  />
                </div>

                <Separator />

                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertTitle>Información</AlertTitle>
                  <AlertDescription>
                    Las notificaciones te ayudan a mantener el control de tu inventario y ventas en tiempo real.
                  </AlertDescription>
                </Alert>

                <Button onClick={handleSave}>Guardar Cambios</Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab: Apariencia */}
          <TabsContent value="appearance">
            <Card>
              <CardHeader>
                <CardTitle>Preferencias de Apariencia</CardTitle>
                <CardDescription>Personaliza la interfaz del sistema</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="dark-mode">Modo Oscuro</Label>
                    <p className="text-sm text-muted-foreground">Activa el tema oscuro para reducir la fatiga visual</p>
                  </div>
                  <Switch
                    id="dark-mode"
                    checked={theme === "dark"}
                    onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="compact-view">Vista Compacta</Label>
                    <p className="text-sm text-muted-foreground">Reduce el espaciado para mostrar más información</p>
                  </div>
                  <Switch id="compact-view" checked={compactView} onCheckedChange={setCompactView} />
                </div>

                <Separator />

                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertTitle>Próximamente</AlertTitle>
                  <AlertDescription>
                    Pronto podrás personalizar colores, fuentes y más opciones de visualización.
                  </AlertDescription>
                </Alert>

                <Button onClick={handleSave}>Guardar Cambios</Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab: Datos */}
          <TabsContent value="data">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Gestión de Datos</CardTitle>
                  <CardDescription>Administra la información del sistema</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-medium">Exportar Datos</h3>
                    <p className="text-sm text-muted-foreground">
                      Descarga una copia de tus productos, ventas e historial
                    </p>
                    <Button variant="outline">Exportar a CSV</Button>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <h3 className="font-medium">Importar Datos</h3>
                    <p className="text-sm text-muted-foreground">Carga productos desde un archivo CSV</p>
                    <Button variant="outline">Seleccionar Archivo</Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-destructive">
                <CardHeader>
                  <CardTitle className="text-destructive">Zona de Peligro</CardTitle>
                  <CardDescription>Acciones irreversibles que afectan tus datos</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-medium">Limpiar Historial de Ventas</h3>
                    <p className="text-sm text-muted-foreground">Elimina todas las transacciones registradas</p>
                    <Button variant="destructive" size="sm">
                      Limpiar Historial
                    </Button>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <h3 className="font-medium">Restablecer Sistema</h3>
                    <p className="text-sm text-muted-foreground">
                      Elimina todos los datos y vuelve a la configuración inicial
                    </p>
                    <Button variant="destructive" size="sm">
                      Restablecer Todo
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  )
}
