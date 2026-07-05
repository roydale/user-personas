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

  readonly levelBarColors = ['text-bg-danger', 'text-bg-warning', 'text-bg-success', 'text-bg-info'];

  capturePersonaImageHtml2Canvas(name: string | undefined) {
    const element: HTMLElement = this.screen.nativeElement;

    // The grid's 1fr rows stretch cards to fractional pixel sizes, which
    // html2canvas rounds inconsistently at scale > 1, leaving hairline gaps
    // between the border and the header. Snap to whole pixels while capturing.
    const rect = element.getBoundingClientRect();
    const previousStyle = {
      width: element.style.width,
      height: element.style.height,
      flex: element.style.flex
    };
    element.style.width = `${Math.round(rect.width)}px`;
    element.style.height = `${Math.round(rect.height)}px`;
    element.style.flex = 'none';
    const restore = () => {
      element.style.width = previousStyle.width;
      element.style.height = previousStyle.height;
      element.style.flex = previousStyle.flex;
    };

    html2canvas(element, {
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
        }).finally(restore);
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
