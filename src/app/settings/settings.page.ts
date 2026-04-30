import { Component } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: false
})
export class SettingsPage {

  constructor(
    private alertController: AlertController,
    private toastController: ToastController
  ) { }

  // FUNGSI INI YANG DIPANGGIL DI HTML
  async confirmDeleteHistory() {
    const dataMentah = localStorage.getItem('skin_history');
    
    // Cek kalau memang sudah kosong
    if (!dataMentah || dataMentah === '[]') {
      const toast = await this.toastController.create({
        message: 'Riwayat aktivitas kamu sudah kosong! ✨',
        duration: 2000,
        color: 'light',
        position: 'bottom'
      });
      await toast.present();
      return; 
    }

    // SI SATPAM (Konfirmasi)
    const alert = await this.alertController.create({
      header: 'Hapus Riwayat?',
      message: 'Yakin mau bersihkan semua riwayat? Ceklist skincare hari ini juga akan direset ya.',
      buttons: [
        {
          text: 'BATAL',
          role: 'cancel'
        },
        {
          text: 'YA, HAPUS',
          handler: () => {
            this.runDeleteAll(); // Jalankan fungsi hapus total
          }
        }
      ]
    });
    await alert.present();
  }

  // FUNGSI EKSEKUSI HAPUS TOTAL
  runDeleteAll() {
    // 1. Hapus Riwayat
    localStorage.removeItem('skin_history');

    // 2. Reset Centang Pagi & Malam (Biar Sinkron!)
    this.resetCeklistSaja('morning_data');
    this.resetCeklistSaja('night_data');

    // 3. Kasih tau user
    this.showSuccessToast();
  }

  resetCeklistSaja(key: string) {
    const dataRaw = localStorage.getItem(key);
    if (dataRaw) {
      const data = JSON.parse(dataRaw);
      const resetData = data.map((item: any) => ({
        ...item,
        isDone: false
      }));
      localStorage.setItem(key, JSON.stringify(resetData));
    }
  }

  async showSuccessToast() {
    const toast = await this.toastController.create({
      message: 'Semua data berhasil dibersihkan!',
      duration: 2000,
      color: 'dark',
      position: 'bottom'
    });
    await toast.present();
  }
}