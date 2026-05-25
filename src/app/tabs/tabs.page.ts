import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { IonTabs } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  standalone: false,
})
export class TabsPage {
  @ViewChild('myTabs', { static: false }) tabs!: IonTabs;

  constructor(private router: Router, private elRef: ElementRef) {}

  ionViewWillEnter() {
    this.resetTabHighlight();
  }

  async resetTabHighlight() {
    // Beri jeda sedikit agar URL & DOM selesai render
    await new Promise(resolve => setTimeout(resolve, 20));

    if (this.tabs) {
      const currentUrl = this.router.url; 
      const activeTab = currentUrl.split('/').pop(); // Mengambil nama tab (misal: 'home')

      if (activeTab) {
        // 1. Jalankan fungsi select bawaan Ionic
        this.tabs.select(activeTab);

        // 2. JURUS PAMUNGKAS: Paksa hapus class 'tab-selected' di HTML yang nyangkut
        const allTabButtons = this.elRef.nativeElement.querySelectorAll('ion-tab-button');
        allTabButtons.forEach((btn: any) => {
          // Jika atribut tab tidak sama dengan tab yang aktif sekarang, kita paksa matikan warnanya
          if (btn.getAttribute('tab') !== activeTab) {
            btn.classList.remove('tab-selected');
            btn.setAttribute('aria-selected', 'false');
          } else {
            // Pastikan tab yang benar-benar aktif yang dapet warna pink
            btn.classList.add('tab-selected');
            btn.setAttribute('aria-selected', 'true');
          }
        });
      }
    }
  }

  goToNotes() {
    this.router.navigate(['/tabs/progress']);
  }
}