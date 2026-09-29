import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Taller } from '../../models/taller.model';

@Component({
  selector: 'app-taller-item',
  templateUrl: './taller-item.component.html',
  styleUrls: ['./taller-item.component.css']
})
export class TallerItemComponent {
  @Input() taller!: Taller;
  @Output() onEdit = new EventEmitter<number>();
  @Output() onDelete = new EventEmitter<number>();

  constructor() { }

  editTaller() {
    this.onEdit.emit(this.taller.id);
  }

  deleteTaller() {
    this.onDelete.emit(this.taller.id);
  }

  openGoogleMaps() {
    window.open(this.taller.linkGoogleMaps, '_blank');
  }

  getAvatarInitial(nombre: string): string {
    if (!nombre) return '?';
    const trimmed = nombre.trim();
    if (!trimmed) return '?';
    return trimmed.charAt(0).toUpperCase();
  }
}
