import { inject } from "@angular/core";
import { type CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";

export const LoginGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    // Si el usuario ya ha iniciado sesión, redirigir a la página de productos.
    return router.parseUrl("/products");
  }

  // Si no ha iniciado sesión, permitir el acceso a la página de login.
  return true;
};