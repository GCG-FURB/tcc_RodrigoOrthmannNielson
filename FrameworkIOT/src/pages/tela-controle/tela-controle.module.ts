import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TelaControlePage } from './tela-controle';

@NgModule({
  declarations: [
    TelaControlePage,
  ],
  imports: [
    IonicPageModule.forChild(TelaControlePage),
  ],
})
export class TelaControlePageModule {}
