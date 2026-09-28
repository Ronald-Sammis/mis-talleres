import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { TallerListComponent } from './components/taller-list/taller-list.component';
import { TallerFormComponent } from './components/taller-form/taller-form.component';
import { TallerItemComponent } from './components/taller-item/taller-item.component';

const routes: Routes = [
  { path: '', component: TallerListComponent },
  { path: 'create', component: TallerFormComponent },
  { path: 'edit/:id', component: TallerFormComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [
    AppComponent,
    TallerListComponent,
    TallerFormComponent,
    TallerItemComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
