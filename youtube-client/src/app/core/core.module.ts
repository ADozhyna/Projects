import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationComponent } from './components/header/authentication/authentication.component';
import { LogoComponent } from './components/header/logo/logo.component';
import { HeaderComponent } from './components/header/header.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [HeaderComponent, LogoComponent, AuthenticationComponent, NotFoundComponent],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  exports: [HeaderComponent, LogoComponent, AuthenticationComponent]
})
export class CoreModule { }
