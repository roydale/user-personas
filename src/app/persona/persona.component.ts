import {Component, input} from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {Persona} from './model/persona.model';

@Component({
  selector: 'app-persona',
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './persona.component.html',
  styleUrl: './persona.component.css'
})
export class PersonaComponent {
  persona = input<Persona>();
}
