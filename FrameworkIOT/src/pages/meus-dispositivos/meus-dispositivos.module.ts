import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MeusDispositivosPage } from './meus-dispositivos';

@NgModule({
  declarations: [
    MeusDispositivosPage,
  ],
  imports: [
    IonicPageModule.forChild(MeusDispositivosPage),
  ],
})
export class MeusDispositivosPageModule {}
