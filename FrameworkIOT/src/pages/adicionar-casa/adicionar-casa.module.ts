import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdicionarCasaPage } from './adicionar-casa';

@NgModule({
  declarations: [
    AdicionarCasaPage,
  ],
  imports: [
    IonicPageModule.forChild(AdicionarCasaPage),
  ],
})
export class AdicionarCasaPageModule {}
