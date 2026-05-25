import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ProgressPageRoutingModule } from './progress-routing.module';
import { ProgressPage } from './progress.page'; // Tetap biarkan import ini

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProgressPageRoutingModule,
    ProgressPage // KUNCI: Pindahkan ProgressPage ke array imports!
  ],
  declarations: [] // KUNCI: Kosongkan array declarations ini!
})
export class ProgressPageModule {}