import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonInput,
  IonIcon,
  IonItem,
  IonFab,
  IonFabButton,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { searchOutline ,add} from 'ionicons/icons';
import { NavbarComponent } from "src/app/shared/components/navbar/navbar.component";
import { Router, RouterLink } from '@angular/router';
@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
  standalone: true,
  imports: [
    IonFabButton,
    IonFab,
    IonItem,
    IonIcon,
    IonInput,
    IonContent,
    CommonModule,
    FormsModule,
    NavbarComponent,
],
})
export class ProductsPage implements OnInit {
  private router = inject(Router)
  constructor() {
    addIcons({
      searchOutline,add
    });
  }
  navigatetoProductForm(event: Event) {
  (event.target as HTMLElement).blur(); 
  this.router.navigate(['/product-form']);
}
  ngOnInit() {}
}
