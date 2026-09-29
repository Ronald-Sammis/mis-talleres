import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Taller } from '../../models/taller.model';
import { TallerService } from '../../services/taller.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-taller-list',
  templateUrl: './taller-list.component.html',
  styleUrls: ['./taller-list.component.css']
})
export class TallerListComponent implements OnInit {
  @ViewChild('searchInput') searchInput?: ElementRef<HTMLInputElement>;

  talleres: Taller[] = [];
  loading = false;
  error: string | null = null;
  searchOpen = false;
  searchQuery = '';

  constructor(
    private tallerService: TallerService,
    private router: Router
  ) { }

  get talleresFiltrados(): Taller[] {
    const query = this.normalize(this.searchQuery);
    if (!query) {
      return this.talleres;
    }

    return this.talleres.filter((taller) =>
      this.normalize(taller.propietario).includes(query) ||
      this.normalize(taller.telefono || '').includes(query) ||
      this.normalize(taller.direccion).includes(query)
    );
  }

  ngOnInit(): void {
    this.loadTalleres();
  }

  loadTalleres(): void {
    this.loading = true;
    this.error = null;

    this.tallerService.getAll().subscribe({
      next: (data) => {
        this.talleres = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al cargar talleres:', error);
        this.error = 'Error al cargar la lista de talleres';
        this.loading = false;
      }
    });
  }

  onEdit(id: number): void {
    this.router.navigate(['/edit', id]);
  }

  onDelete(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este taller?')) {
      this.tallerService.delete(id).subscribe({
        next: () => {
          this.loadTalleres();
        },
        error: (error) => {
          console.error('Error al eliminar taller:', error);
          this.error = 'Error al eliminar el taller';
        }
      });
    }
  }

  onCreateNew(): void {
    this.router.navigate(['/create']);
  }

  openSearch(): void {
    this.searchOpen = true;
    setTimeout(() => this.searchInput?.nativeElement.focus(), 0);
  }

  closeSearch(): void {
    this.searchOpen = false;
    this.searchQuery = '';
  }

  clearSearch(): void {
    this.searchQuery = '';
    this.searchInput?.nativeElement.focus();
  }

  private normalize(value: string): string {
    return (value || '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim();
  }
}
