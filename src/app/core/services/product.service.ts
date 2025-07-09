import { Injectable } from "@angular/core"
import { BehaviorSubject } from "rxjs"
import type { Product } from "../models/product.model"

@Injectable({
  providedIn: "root",
})
export class ProductService {
  private productsSubject = new BehaviorSubject<Product[]>([])
  public products$ = this.productsSubject.asObservable()

  private readonly STORAGE_KEY = "products"

  constructor() {
    this.loadProducts()
  }

  private loadProducts(): void {
    const stored = localStorage.getItem(this.STORAGE_KEY)
    if (stored) {
      const products = JSON.parse(stored)
      this.productsSubject.next(products)
    } else {
      // Productos de ejemplo
      const sampleProducts: Product[] = [
        {
          id: "1",
          name: "iPhone 15",
          description: "Último modelo de iPhone con tecnología avanzada",
          category: "Electrónicos",
          image: "/placeholder.svg?height=200&width=200",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "2",
          name: "MacBook Pro",
          description: "Laptop profesional para desarrollo y diseño",
          category: "Computadoras",
          image: "/placeholder.svg?height=200&width=200",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]
      this.saveProducts(sampleProducts)
    }
  }

  private saveProducts(products: Product[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(products))
    this.productsSubject.next(products)
  }

  getProducts(): Product[] {
    return this.productsSubject.value
  }

  getProduct(id: string): Product | undefined {
    return this.productsSubject.value.find((p) => p.id === id)
  }

  addProduct(product: Omit<Product, "id" | "createdAt" | "updatedAt">): void {
    const newProduct: Product = {
      ...product,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const products = [...this.productsSubject.value, newProduct]
    this.saveProducts(products)
  }

  updateProduct(id: string, updates: Partial<Product>): void {
    const products = this.productsSubject.value.map((p) =>
      p.id === id ? { ...p, ...updates, updatedAt: new Date() } : p,
    )
    this.saveProducts(products)
  }

  deleteProduct(id: string): void {
    const products = this.productsSubject.value.filter((p) => p.id !== id)
    this.saveProducts(products)
  }

  getCategories(): string[] {
    const products = this.productsSubject.value
    const categories = [...new Set(products.map((p) => p.category))]
    return categories.length > 0 ? categories : ["Electrónicos", "Computadoras", "Ropa", "Hogar"]
  }
}
