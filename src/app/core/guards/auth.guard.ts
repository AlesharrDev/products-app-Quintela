import { inject } from "@angular/core"
import { type CanActivateFn, Router } from "@angular/router"
import { AuthService } from "../services/auth.service"

export const AuthGuard: CanActivateFn = () => {
  const authService = inject(AuthService)
  const router = inject(Router)

  if (authService.isLoggedIn()) {
    return true;
  }

  // Redirigir a la página de login si no está autenticado.
  return router.parseUrl('/login');
}
