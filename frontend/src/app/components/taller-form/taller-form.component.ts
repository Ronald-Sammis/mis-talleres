import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Taller } from '../../models/taller.model';
import { TallerService } from '../../services/taller.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-taller-form',
  templateUrl: './taller-form.component.html',
  styleUrls: ['./taller-form.component.css']
})
export class TallerFormComponent implements OnInit {
  tallerForm!: FormGroup;
  isEditMode = false;
  tallerId: number | null = null;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private tallerService: TallerService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.tallerForm = this.fb.group({
      propietario: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      linkGoogleMaps: ['', [Validators.required, Validators.pattern('^https?://.*')]]
    });

    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.tallerId = +params['id'];
        this.loadTaller(this.tallerId);
      }
    });
  }

  loadTaller(id: number): void {
    this.tallerService.getById(id).subscribe({
      next: (taller) => {
        this.tallerForm.patchValue(taller);
      },
      error: (error) => {
        console.error('Error al cargar taller:', error);
      }
    });
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.tallerForm.invalid) {
      return;
    }

    const taller: Taller = this.tallerForm.value;

    if (this.isEditMode && this.tallerId) {
      this.tallerService.update(this.tallerId, taller).subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: (error) => {
          console.error('Error al actualizar taller:', error);
        }
      });
    } else {
      this.tallerService.create(taller).subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: (error) => {
          console.error('Error al crear taller:', error);
        }
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/']);
  }

  get f() {
    return this.tallerForm.controls;
  }
}
