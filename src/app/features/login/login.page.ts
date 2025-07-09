import { Component, inject } from "@angular/core"
import { FormsModule } from "@angular/forms"
import { Router } from "@angular/router"
import {
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonCard,
  IonCardContent,
  LoadingController,
  ToastController,
} from "@ionic/angular/standalone"
import { addIcons } from "ionicons"
import { storefrontOutline, eyeOutline, eyeOffOutline } from "ionicons/icons"
import { AuthService } from "src/app/core/services/auth.service"


@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"],
  standalone: true,
  imports: [IonContent, IonItem, IonLabel, IonInput, IonButton, IonCard, IonCardContent, FormsModule],
})
export class LoginPage {
  private authService = inject(AuthService)
  private router = inject(Router)
  private loadingController = inject(LoadingController)
  private toastController = inject(ToastController)

  username = ""
  password = ""

  constructor() {
    addIcons({ storefrontOutline, eyeOutline, eyeOffOutline })
  }

  async onLogin() {
    if (!this.username || !this.password) {
      this.showToast("Por favor, complete todos los campos", "warning")
      return
    }

    const loading = await this.loadingController.create({
      message: "Iniciando sesión...",
      spinner: "crescent",
    })
    await loading.present()

    try {
      const success = await this.authService.login(this.username, this.password)
      await loading.dismiss()

      if (success) {
        this.showToast("¡Bienvenido!", "success")
        this.router.navigate(["/products"], { replaceUrl: true })
      } else {
        this.showToast("Credenciales incorrectas. Use admin/123456", "danger")
      }
    } catch (error) {
      await loading.dismiss()
      this.showToast("Error al iniciar sesión", "danger")
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

export default LoginPage
