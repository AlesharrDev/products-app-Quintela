import { Component, type OnInit, inject } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"
import { ActivatedRoute, Router } from "@angular/router"
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonBackButton,
  IonItem,
  IonLabel,
  IonInput,
  IonTextarea,
  IonSelect,
  IonSelectOption,
  IonButton,
  IonIcon,
  ToastController,
  ActionSheetController,
} from "@ionic/angular/standalone"
import { addIcons } from "ionicons"
import { camera, cameraOutline, close, image } from "ionicons/icons"
import { ProductService } from "src/app/core/services/product.service"
import { Product } from "src/app/core/models/product.model"
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera"


@Component({
  selector: "app-product-form",
  templateUrl: "./product-form.page.html",
  styleUrls: ["./product-form.page.scss"],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButtons,
    IonBackButton,
    IonItem,
    IonLabel,
    IonInput,
    IonTextarea,
    IonSelect,
    IonSelectOption,
    IonButton,
    IonIcon,
  ],
})
export class ProductFormPage implements OnInit {
  private route = inject(ActivatedRoute)
  private router = inject(Router)
  private productService = inject(ProductService)
  private toastController = inject(ToastController)
  private actionSheetController = inject(ActionSheetController)

  product: Partial<Product> = {
    name: "",
    description: "",
    category: "",
    image: "",
  }

  isEditing = false
  productId: string | null = null
  categories: string[] = []

  constructor() {
    addIcons({ cameraOutline, camera, image, close })
  }

  ngOnInit() {
    this.productId = this.route.snapshot.paramMap.get("id")

    if (this.productId) {
      this.isEditing = true
      this.loadProduct()
    }
  }
  ionViewWillEnter() {
    this.categories = this.productService.getCategories()
  }

  loadProduct() {
    if (this.productId) {
      const existingProduct = this.productService.getProduct(this.productId)
      if (existingProduct) {
        this.product = { ...existingProduct }
      }
    }
  }

  async onSubmit() {
    if (!this.isFormValid()) {
      this.showToast("Por favor, complete todos los campos requeridos", "warning")
      return
    }

    try {
      if (this.isEditing && this.productId) {
        this.productService.updateProduct(this.productId, this.product)
        this.showToast("Producto actualizado exitosamente", "success")
      } else {
        this.productService.addProduct(this.product as Omit<Product, "id" | "createdAt" | "updatedAt">)
        this.showToast("Producto creado exitosamente", "success")
      }

      this.router.navigate(["/products"])
    } catch (error) {
      this.showToast("Error al guardar el producto", "danger")
    }
  }

  isFormValid(): boolean {
    return !!(this.product.name && this.product.description && this.product.category)
  }

  async selectImage() {
    const actionSheet = await this.actionSheetController.create({
      header: "Seleccionar Imagen",
      buttons: [
        {
          text: "Tomar Foto",
          icon: "camera",
          handler: () => {
            this.takePicture(CameraSource.Camera)
          },
        },
        {
          text: "Elegir de la Galería",
          icon: "image",
          handler: () => {
            this.takePicture(CameraSource.Photos)
          },
        },
        {
          text: "Cancelar",
          icon: "close",
          role: "cancel",
        },
      ],
    })
    await actionSheet.present()
  }

  async takePicture(source: CameraSource) {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: source,
      })

      if (image.dataUrl) {
        this.product.image = image.dataUrl
      }
    } catch (error) {
      this.showToast("No se pudo seleccionar la imagen.", "danger")
    }
  }

  private async showToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      color,
      position: "top",
    })
    toast.present()
  }
}

export default ProductFormPage
