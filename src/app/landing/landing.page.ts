import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router'; 

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule],
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage {

  constructor(private router: Router) {}

  goNext() {
    // Arahkan ke rute Tabs yang benar
    this.router.navigate(['/tabs/home']);
  }

}