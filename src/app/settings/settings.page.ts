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

  async confirmDeleteHistory() {
    const dataMentah = localStorage.getItem('skin_history');
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

    const alert = await this.alertController.create({
      header: 'Hapus Riwayat?',
      message: 'Yakin mau bersihkan semua riwayat? Ceklist skincare hari ini juga akan direset ya.',
      buttons: [
        { text: 'BATAL', role: 'cancel' },
        {
          text: 'YA, HAPUS',
          handler: () => { this.runDeleteAll(); }
        }
      ]
    });
    await alert.present();
  }

  runDeleteAll() {
    // Bersihkan memori dasar sampai bersih total ke akarnya
    localStorage.removeItem('skin_history');
    localStorage.removeItem('skin_notes');
    localStorage.removeItem('morning_data'); 
    localStorage.removeItem('night_data');
    localStorage.removeItem('last_reset_date');
    
    // Pasang penanda kalau data baru saja dihapus bersih
    localStorage.setItem('clear_visual_now', 'true');

    this.showSuccessToast();
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