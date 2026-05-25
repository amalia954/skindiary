import { Component, ViewChild } from '@angular/core';
import { Platform, IonRouterOutlet, ToastController, NavController } from '@ionic/angular';
import { App } from '@capacitor/app';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  @ViewChild(IonRouterOutlet, { static: true }) routerOutlet?: IonRouterOutlet;
  
  private lastBackPress = 0;
  private timePeriodToExit = 2000;
  
  // Mencatat riwayat perpindahan tab secara manual
  private tabHistory: string[] = [];

  constructor(
    private platform: Platform,
    private toastController: ToastController,
    private router: Router,
    private navCtrl: NavController // Inject NavController untuk mundur aman
  ) {
    this.initializeApp();
    this.trackTabNavigation();
  }

  // Fungsi mendeteksi dan mencatat setiap kamu klik tab baru
  trackTabNavigation() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      let url = event.urlAfterRedirects || event.url;
      
      // JURUS KUNCI: Bersihkan rute transisi yang kosong belakangnya
      if (url === '/tabs' || url === '/tabs/') {
        url = '/tabs/home';
      }

      // Kita HANYA catat jika rutenya lengkap berisi nama tab tujuan
      if (url.startsWith('/tabs/')) {
        if (this.tabHistory.length === 0 || this.tabHistory[this.tabHistory.length - 1] !== url) {
          this.tabHistory.push(url);
          console.log('Riwayat Tab Tersimpan:', this.tabHistory); // Untuk memantau di log terminal
        }
      }
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      console.log('Platform ready!');

      const target = navigator as any;
      if (target && target.splashscreen) {
        target.splashscreen.hide();
      }

      // Handle Back Button Hardware
      this.platform.backButton.subscribeWithPriority(10, async () => {
        const currentUrl = this.router.url;

        // Kondisi jika berada di halaman awal mutlak
        const isAbsoluteRoot = currentUrl === '/landing' || currentUrl === '/' || currentUrl === '/tabs/home';

        // Keluar aplikasi jika di halaman utama DAN riwayat klik tab lain sudah habis
        if (isAbsoluteRoot && this.tabHistory.length <= 1) {
          const currentTime = new Date().getTime();
          if (currentTime - this.lastBackPress < this.timePeriodToExit) {
            App.exitApp();
          } else {
            this.lastBackPress = currentTime;
            await this.showExitToast();
          }
        } else {
          // JIKA USER PERNAH KLIK TAB LAIN SEBELUMNYA:
          if (this.tabHistory.length > 1) {
            this.tabHistory.pop(); // Hapus tab yang sedang aktif dari catatan
            const previousTab = this.tabHistory[this.tabHistory.length - 1]; // Ambil tab sebelumnya
            
            // Mundur secara resmi lewat Ionic. Ini yang bikin pink dobelnya HILANG!
            this.navCtrl.navigateBack(previousTab);
          } else {
            // Jika pencetan back dari sub-halaman fitur biasa (bukan menu tab)
            this.navCtrl.navigateBack('/tabs/home');
          }
        }
      });
    });
  }

  async showExitToast() {
    const toast = await this.toastController.create({
      message: 'Tekan sekali lagi untuk keluar',
      duration: 2000,
      position: 'bottom',
      color: 'dark'
    });
    await toast.present();
  }
}