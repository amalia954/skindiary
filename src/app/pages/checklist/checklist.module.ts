import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ChecklistPageRoutingModule } from './checklist-routing.module';
import { ChecklistPage } from './checklist.page'; // Import tetap ada

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChecklistPageRoutingModule,
    ChecklistPage // PINDAH KE SINI karena dia Standalone
  ]
  // Bagian declarations dikosongin aja atau hapus barisnya
})
export class ChecklistPageModule {}