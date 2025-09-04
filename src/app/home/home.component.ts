import { Component, inject } from '@angular/core';
import { PersonaComponent } from '../persona/persona.component';
import { HttpClient } from '@angular/common/http';
import { Persona } from '../persona/model/persona.model';
import { take } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-home',
  imports: [
    PersonaComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  private httpClient = inject(HttpClient);

  personas = toSignal(
    this.httpClient.get<Persona[]>('/assets/data/personas.json').pipe(take(1)),
    { initialValue: [] }
  );

  /*
  personas = signal<Persona[]>([]);
  getPersonas() {
    this.httpClient
      .get<Persona[]>('/assets/data/personas.json')
      .pipe(take(1))
      .subscribe((data: Persona[]) => this.personas.set(data));
  }
  */
}
