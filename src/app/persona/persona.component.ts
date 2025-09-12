import {Component, inject, input, ViewChild} from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {Persona} from './model/persona.model';
import {NgxCaptureService} from 'ngx-capture';
import {tap} from 'rxjs';
import html2canvas from 'html2canvas';

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

  capturePersonaImageHtml2Canvas(name: string | undefined) {
    html2canvas(this.screen.nativeElement, {
        scale: 3, // Increase scale factor (try 2, 3, or higher)
        useCORS: true // Helps if you have external images
      }).then((canvas: HTMLCanvasElement) => {
          // Convert canvas to image
          const image = canvas.toDataURL('image/png');

          // Create a link and trigger a download with a custom filename
          const link = document.createElement('a');
          link.href = image;
          link.download = `user_persona_${name?.replace(' ', '_')?.toLowerCase()}.png`; // Custom filename
          link.click();
        });
  }

  capturePersonaImage() {
    this.captureService
      .getImage(this.screen.nativeElement, true)
      .pipe(
        tap((image) => console.log(image)),
        tap((image) => this.captureService.downloadImage(image))
      ).subscribe();
  }
}
