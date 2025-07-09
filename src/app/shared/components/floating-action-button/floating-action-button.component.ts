import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonFab, IonFabButton, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { addOutline } from 'ionicons/icons';

@Component({
  selector: 'app-floating-action-button',
  templateUrl: './floating-action-button.component.html',
  styleUrls: ['./floating-action-button.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonFab,
    IonFabButton,
    IonIcon
  ]
})
export class FloatingActionButtonComponent {
  @Input() color: string = 'secondary';
  @Input() vertical: 'top' | 'bottom' = 'bottom';
  @Input() horizontal: 'start' | 'center' | 'end' = 'end';

  
  @Output() buttonClick = new EventEmitter<void>();

  constructor() {
    addIcons({ addOutline });
  }

  onClick(): void {
    this.buttonClick.emit();
  }
} 