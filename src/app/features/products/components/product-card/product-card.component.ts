import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonCard, IonCardContent, IonChip, IonLabel } from '@ionic/angular/standalone';
import { Product } from 'src/app/core/models/product.model';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
  imports: [
    IonCard,
    IonCardContent,
    IonChip,
    IonLabel,
    CommonModule,
  ],
})
export class ProductCardComponent implements OnInit {
  @Input() productslist: Product[] = [];
  @Output() productClick = new EventEmitter<Product>();

  constructor() { }

  ngOnInit() {}

  presentProductOptions(product: Product) {
    this.productClick.emit(product);
  }
}
