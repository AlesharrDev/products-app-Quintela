import { Injectable } from "@angular/core"
import { BehaviorSubject } from "rxjs"
import type { Product } from "../models/product.model"
import { CreateProductRequest } from "../models/createProductRecuest"

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
//cargar los productos del localStorage
  private loadProducts(): void {
    const stored = localStorage.getItem(this.STORAGE_KEY)
    if (stored) {
      const products = JSON.parse(stored)
      this.productsSubject.next(products)
    } 
  }
//guardar los productos en el localStorage
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

  addProduct(product: CreateProductRequest): void {
    const newProduct: Product = {
      ...product,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    const products = [...this.productsSubject.value, newProduct]
    this.saveProducts(products)
  }
  //Partial hace que la interfaz sea parcial, es decir, que no sea obligatorio que se pase todo el objeto
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
      const categories = ["Electrónicos", "Computadoras", "Ropa", "Hogar","Otros"]
      return categories;
    } 
}
