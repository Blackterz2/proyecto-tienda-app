"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import { LayoutDashboard, Package, ShoppingCart, History, Settings, LogOut, Moon, Sun, Menu, X} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useEffect }  from "react"


// Lista de enlaces de navegación
const navItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Productos",
    href: "/productos",
    icon: Package,
  },
  {
    title: "Ventas",
    href: "/ventas",
    icon: ShoppingCart,
  },
  {
    title: "Historial",
    href: "/historial",
    icon: History,
  },
  {
    title: "Configuración",
    href: "/configuracion",
    icon: Settings,
  },
]

export function AppSidebar() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  
  // Detectar si es móvil
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
      if (window.innerWidth >= 768) {
        setIsMobileOpen(false)
      }
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <>
      {/* Botón de menú hamburguesa para móvil */}
      {isMobile && (
        <div className="lg:hidden fixed top-4 left-4 z-50">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="h-10 w-10"
          >
            {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      )}

      {/* Overlay para móvil cuando el sidebar está abierto */}
      {isMobile && isMobileOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "bg-card border-r border-border flex flex-col transition-all duration-300 z-40",
        // Desktop: siempre visible, ancho fijo
        "lg:w-64 lg:static lg:translate-x-0",
        // Mobile: sidebar deslizante
        isMobile ? [
          "fixed top-0 left-0 h-full w-64 transform",
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        ] : "w-64"
      )}>
        {/* Header del sidebar */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-primary rounded-lg">
              <Package className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h2 className="font-semibold text-lg">Inventario</h2>
              <p className="text-xs text-muted-foreground">Sistema de Gestión</p>
            </div>
          </div>
        </div>

        {/* Navegación */}
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                )}
              >
                <Icon className="h-5 w-5" />
                {item.title}
              </Link>
            )
          })}
        </nav>

        {/* Footer con botón de logout y toggle de tema */}
        <div className="p-4 border-t border-border space-y-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="w-full justify-start gap-3"
          >
            {theme === "dark" ? (
              <>
                <Sun className="h-4 w-4" />
                Modo Claro
              </>
            ) : (
              <>
                <Moon className="h-4 w-4" />
                Modo Oscuro
              </>
            )}
          </Button>

          <Link
            href="/login"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
            onClick={() => setIsMobileOpen(false)}
          >
            <LogOut className="h-5 w-5" />
            Cerrar Sesión
          </Link>
        </div>
      </aside>

      {/* Espacio para el contenido principal en móvil */}
      {isMobile && (
        <div className="lg:hidden min-h-screen pt-20 px-4">
          {/* El contenido de la página irá aquí */}
        </div>
      )}
    </>
  )
}