import { Component, type OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonButton,
  IonIcon,
  IonSearchbar,
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonCard,
  IonCardContent,
  IonChip,
  IonFab,
  IonFabButton,
  AlertController,
  ActionSheetController,
  IonInput,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  logOutOutline,
  cubeOutline,
  addOutline,
  eyeOutline,
  createOutline,
  trashOutline,
  closeOutline,
} from 'ionicons/icons';
import { Product } from 'src/app/core/models/product.model';
import { ProductService } from 'src/app/core/services/product.service';
import { AuthService } from 'src/app/core/services/auth.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButtons,
    IonButton,
    IonIcon,
    IonSearchbar,
    IonItem,
    IonLabel,
    IonSelect,
    IonSelectOption,
    IonCard,
    IonCardContent,
    IonChip,
    IonFab,
    IonFabButton,
  ],
})
export class ProductsPage implements OnInit {
  private productService = inject(ProductService);
  private authService = inject(AuthService);
  private router = inject(Router);
  private alertController: AlertController = inject(AlertController);
  private actionSheetController: ActionSheetController = inject(
    ActionSheetController
  );

  products: Product[] = [];
  filteredProducts: Product[] = [];
  searchTerm = '';
  selectedCategory = 'all';
  categories: string[] = [];

  constructor() {
    addIcons({
      logOutOutline,
      cubeOutline,
      addOutline,
      eyeOutline,
      createOutline,
      trashOutline,
      closeOutline,
    });
  }

  ngOnInit() {
    this.loadProducts();
    this.loadCategories();
  }

  ionViewWillEnter() {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.products$.subscribe((products) => {
      this.products = products;
      this.filterProducts();
    });
  }

  loadCategories() {
    this.categories = this.productService.getCategories();
  }

  filterProducts() {
    this.filteredProducts = this.products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        product.description
          .toLowerCase()
          .includes(this.searchTerm.toLowerCase());
      const matchesCategory =
        this.selectedCategory === 'all' ||
        product.category === this.selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }

  onSearchChange(event: any) {
    this.searchTerm = event.detail.value;
    this.filterProducts();
  }

  onCategoryChange(event: any) {
    this.selectedCategory = event.detail.value;
    this.filterProducts();
  }

  addProduct() {
    this.router.navigate(['/product-form']);                                //quiter el foco del boton despues del click
  }

  async presentProductOptions(product: Product) {
    const actionSheet = await this.actionSheetController.create({
      header: product.name,
      buttons: [
        {
          text: 'Ver Detalles',
          icon: 'eye-outline',
          handler: () => {
            this.viewProduct(product);
          },
        },
        {
          text: 'Editar',
          icon: 'create-outline',
          handler: () => {
            this.editProduct(product);
          },
        },
        {
          text: 'Eliminar',
          icon: 'trash-outline',
          role: 'destructive',
          handler: () => {
            this.confirmDelete(product);
          },
        },
        {
          text: 'Cancelar',
          icon: 'close-outline',
          role: 'cancel',
        },
      ],
    });
    await actionSheet.present();
  }

  viewProduct(product: Product) {
    console.log('Ver producto:', product);                            // Implementar vista de detalles si es necesario
  }

  editProduct(product: Product) {
    this.router.navigate(['/product-form', product.id]);              //implementar la edicion de producto
  }

  async confirmDelete(product: Product) {
    const alert = await this.alertController.create({
      header: 'Confirmar eliminación',
      message: `¿Está seguro de que desea eliminar "${product.name}"?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: () => {
            this.productService.deleteProduct(product.id);
          },
        },
      ],
    });
    await alert.present();
  }

  async logout() {
    const alert = await this.alertController.create({
      header: 'Cerrar sesión',
      message: '¿Está seguro de que desea cerrar sesión?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Cerrar sesión',
          handler: () => {
            this.authService.logout();
          },
        },
      ],
    });
    await alert.present();
  }
}

export default ProductsPage;
