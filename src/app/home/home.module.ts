import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms'; // WAJIB ADA
import { HomePage } from './home.page';
import { HomePageRoutingModule } from './home-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePage, // PINDAHKAN HomePage ke sini (bagian imports)
    HomePageRoutingModule
  ],
  declarations: [] // KOSONGKAN bagian ini
})
export class HomePageModule {}