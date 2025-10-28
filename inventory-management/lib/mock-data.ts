// Datos de ejemplo para el sistema (mock data)

export interface Product {
  id: string
  nombre: string
  descripcion: string
  precio: number
  costo: number
  stock: number
  categoria: string
  stockMinimo: number
}

export interface Sale {
  id: string
  fecha: Date
  productos: {
    productoId: string
    nombre: string
    cantidad: number
    precio: number
  }[]
  total: number
}

// Productos de ejemplo
export const mockProducts: Product[] = [
  {
    id: "1",
    nombre: "Laptop HP Pavilion",
    descripcion: "Laptop con procesador Intel i5, 8GB RAM, 256GB SSD",
    precio: 15000,
    costo: 12000,
    stock: 15,
    categoria: "Electrónica",
    stockMinimo: 5,
  },
  {
    id: "2",
    nombre: "Mouse Logitech MX",
    descripcion: "Mouse inalámbrico ergonómico",
    precio: 800,
    costo: 600,
    stock: 3,
    categoria: "Accesorios",
    stockMinimo: 10,
  },
  {
    id: "3",
    nombre: "Teclado Mecánico",
    descripcion: "Teclado mecánico RGB con switches azules",
    precio: 1200,
    costo: 900,
    stock: 25,
    categoria: "Accesorios",
    stockMinimo: 8,
  },
  {
    id: "4",
    nombre: 'Monitor Samsung 24"',
    descripcion: "Monitor Full HD 24 pulgadas",
    precio: 3500,
    costo: 2800,
    stock: 8,
    categoria: "Electrónica",
    stockMinimo: 5,
  },
  {
    id: "5",
    nombre: "Webcam Logitech C920",
    descripcion: "Cámara web Full HD 1080p",
    precio: 1500,
    costo: 1200,
    stock: 12,
    categoria: "Accesorios",
    stockMinimo: 6,
  },
]

// Ventas de ejemplo
export const mockSales: Sale[] = [
  {
    id: "1",
    fecha: new Date("2025-01-20"),
    productos: [
      { productoId: "1", nombre: "Laptop HP Pavilion", cantidad: 1, precio: 15000 },
      { productoId: "2", nombre: "Mouse Logitech MX", cantidad: 2, precio: 800 },
    ],
    total: 16600,
  },
  {
    id: "2",
    fecha: new Date("2025-01-21"),
    productos: [{ productoId: "3", nombre: "Teclado Mecánico", cantidad: 3, precio: 1200 }],
    total: 3600,
  },
  {
    id: "3",
    fecha: new Date("2025-01-22"),
    productos: [
      { productoId: "4", nombre: 'Monitor Samsung 24"', cantidad: 1, precio: 3500 },
      { productoId: "5", nombre: "Webcam Logitech C920", cantidad: 1, precio: 1500 },
    ],
    total: 5000,
  },
]

// Categorías disponibles
export const categories = ["Electrónica", "Accesorios", "Muebles", "Papelería", "Otros"]
