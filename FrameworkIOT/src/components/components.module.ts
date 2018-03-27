import { IonicModule } from 'ionic-angular';
import { NgModule } from '@angular/core';
import { CabecalhoCustomizadoComponent } from './cabecalho-customizado/cabecalho-customizado';
@NgModule({
	declarations: [CabecalhoCustomizadoComponent],
	imports: [IonicModule],
	exports: [CabecalhoCustomizadoComponent]
})
export class ComponentsModule { }
