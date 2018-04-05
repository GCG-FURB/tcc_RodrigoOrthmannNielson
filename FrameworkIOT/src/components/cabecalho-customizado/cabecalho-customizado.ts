import { Component, Input } from '@angular/core';

@Component({
  selector: 'cabecalho-customizado',
  templateUrl: 'cabecalho-customizado.html'
})
export class CabecalhoCustomizadoComponent {

  @Input() titulo: string;

  constructor() {}

}
