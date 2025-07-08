import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonButton,
  IonButtons,
  IonInput,
  IonIcon,
  IonLabel,
  IonItem,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { searchOutline } from 'ionicons/icons';
@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
  standalone: true,
  imports: [
    IonItem,
    IonIcon,
    IonInput,
    IonButtons,
    IonContent,
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonButton,
  ],
})
export class ProductsPage implements OnInit {
  constructor() {
    addIcons({
      searchOutline,
    });
  }

  ngOnInit() {}
}
