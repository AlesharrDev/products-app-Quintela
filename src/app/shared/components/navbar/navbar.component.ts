import { Component, inject, OnInit } from '@angular/core';
import { addIcons } from 'ionicons';
import { arrowBackOutline } from 'ionicons/icons';
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonTitle,
  IonBackButton,
  IonIcon,
  IonButton,
  IonLabel,
} from '@ionic/angular/standalone';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  imports: [
    IonLabel,
    IonButton,
    IonIcon,
    // IonBackButton,
    IonTitle,
    IonButtons,
    IonToolbar,
    IonHeader,
  ],
})
export class NavbarComponent implements OnInit {
  private router = inject(AuthService);
  constructor() {
    addIcons({
      arrowBackOutline,
    });
  }
  
  ngOnInit() {}

  logout() {
    this.router.logout();
  }
}
