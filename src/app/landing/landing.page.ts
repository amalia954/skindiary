import { Component } from '@angular/core';
import { IonicModule, NavController } from '@ionic/angular';
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
  // replaceUrl: true akan menggantikan posisi 'landing' dengan 'tabs/home' di history stack
  this.router.navigate(['/tabs/home'], { replaceUrl: true });
  }

}