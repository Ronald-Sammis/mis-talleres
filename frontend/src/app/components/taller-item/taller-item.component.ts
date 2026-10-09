
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Taller } from '../../models/taller.model';

@Component({
  selector: 'app-taller-item',
  templateUrl: './taller-item.component.html',
  styleUrls: ['./taller-item.component.css']
})
export class TallerItemComponent {
  @Input() taller!: Taller;
  @Input() expanded = false;

  @Output() onToggleExpand = new EventEmitter<number>();
  @Output() onEdit = new EventEmitter<number>();
  @Output() onDelete = new EventEmitter<number>();

  toggleExpand(): void {
    this.onToggleExpand.emit(this.taller.id);
  }

  editTaller(): void {
    this.onEdit.emit(this.taller.id);
  }

  deleteTaller(): void {
    this.onDelete.emit(this.taller.id);
  }

  openGoogleMaps(): void {
    if (this.taller.linkGoogleMaps) {
      window.open(this.taller.linkGoogleMaps, '_blank', 'noopener,noreferrer');
    }
  }
}
