import { Component, Input } from '@angular/core';

/**
 * Generated class for the CabecalhoCustomizadoComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'cabecalho-customizado',
  templateUrl: 'cabecalho-customizado.html'
})
export class CabecalhoCustomizadoComponent {

  @Input() titulo: string;

  constructor() { }

}
