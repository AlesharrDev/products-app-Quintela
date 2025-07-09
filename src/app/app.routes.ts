import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./features/login/login.page').then((m) => m.LoginPage),
  },
  {
    path: 'products',
    loadComponent: () =>
      import('./features/products/products.page').then((m) => m.ProductsPage),
    canActivate: [AuthGuard],
  },
  {
    path: 'product-form',
    loadComponent: () =>
      import('./features/product-form/product-form.page').then(
        (m) => m.ProductFormPage
      ),
    canActivate: [AuthGuard],
  },
];
