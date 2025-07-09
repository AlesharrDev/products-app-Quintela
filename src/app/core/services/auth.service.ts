import { Injectable, inject } from "@angular/core"
import { Router } from "@angular/router"
import { BehaviorSubject } from "rxjs"

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private router = inject(Router)
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false)
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable()

  // Usuario y contraseña predefinidos
  private readonly VALID_CREDENTIALS = {
    username: "admin",
    password: "123456",
  }

  constructor() {
    // Verificar si ya está autenticado al inicializar
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true"
    this.isAuthenticatedSubject.next(isLoggedIn)
  }

  login(username: string, password: string): Promise<boolean> {
    return new Promise((resolve) => {
        if (username === this.VALID_CREDENTIALS.username && password === this.VALID_CREDENTIALS.password) {
          localStorage.setItem("isLoggedIn", "true")
          localStorage.setItem("currentUser", username)
          this.isAuthenticatedSubject.next(true)
          resolve(true)
        } else {
          resolve(false)
        }
    })
  }

  logout(): void {
    localStorage.removeItem("isLoggedIn")
    localStorage.removeItem("currentUser")
    this.isAuthenticatedSubject.next(false)
    this.router.navigate(["/login"])
  }

  isLoggedIn(): boolean {
    return localStorage.getItem("isLoggedIn") === "true"
  }

  getCurrentUser(): string | null {
    return localStorage.getItem("currentUser")
  }
}
