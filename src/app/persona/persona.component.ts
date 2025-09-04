import {Component, inject, input, ViewChild} from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {Persona} from './model/persona.model';
import {NgxCaptureService} from 'ngx-capture';
import {tap} from 'rxjs';

@Component({
  selector: 'app-persona',
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './persona.component.html',
  styleUrl: './persona.component.css'
})
export class PersonaComponent {
  private captureService = inject(NgxCaptureService);

  @ViewChild("profile", {static: true}) screen: any;

  persona = input<Persona>();

  capturePersonaImage() {
    this.captureService
      .getImage(this.screen.nativeElement, true)
      .pipe(
        tap((image) => console.log(image)),
        tap((image) => this.captureService.downloadImage(image))
      ).subscribe();
  }
}
