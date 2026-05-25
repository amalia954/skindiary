import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ToastController, AlertController, IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.page.html',
  styleUrls: ['./progress.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ProgressPage implements OnInit {
  progressPercent: number = 0;
  currentMonth: number = 1;
  history: any[] = [];
  notes: any[] = [];
  newNote: string = '';

  constructor(
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.ionViewWillEnter();
  }

  ionViewWillEnter() {
    // CEK SAKELAR DI BARIS PALING ATAS
    const paksaBersih = localStorage.getItem('clear_visual_now');
    
    if (paksaBersih === 'true') {
      this.history = [];
      this.notes = [];
      this.progressPercent = 0;
      this.currentMonth = 1;

      // Hapus sakelar karena tugas pembersihan selesai setelah Progress & Checklist membacanya
      localStorage.removeItem('clear_visual_now'); 
      
      this.cdr.detectChanges();
      return; // Potong kompas keluar, jangan baca data lama!
    }

    this.loadData();
    this.cdr.detectChanges();
  }

  loadData() {
    this.history = JSON.parse(localStorage.getItem('skin_history') || '[]');
    this.notes = JSON.parse(localStorage.getItem('skin_notes') || '[]');
    this.calculateProgress();
  }

  async presentToast(msg: string, isError: boolean = false) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000,
      position: 'top',
      mode: 'ios',
      cssClass: isError ? 'toast-error' : 'toast-success', 
    });
    toast.present();
  }

  async deleteSingleHistory(item: any) {
    if (item.isNote) {
      const alert = await this.alertCtrl.create({
        header: 'Hapus Catatan?',
        message: `Hapus catatan: "${item.message}"?`,
        buttons: [
          { text: 'BATAL', role: 'cancel' },
          { text: 'HAPUS', handler: () => { this.executeDeletion(item); } }
        ]
      });
      await alert.present();
      return;
    }

    const hasMorning = item.morning;
    const hasNight = item.night;

    if (hasMorning && !hasNight) {
      this.showSimpleDeleteAlert(item, 'Pagi');
    } else if (!hasMorning && hasNight) {
      this.showSimpleDeleteAlert(item, 'Malam');
    } else if (hasMorning && hasNight) {
      this.showSelectionDeleteAlert(item);
    }
  }

  async showSimpleDeleteAlert(item: any, session: string) {
    const alert = await this.alertCtrl.create({
      header: `Hapus Rutinitas ${session}?`,
      message: `Aktivitas ${session} tanggal ${item.date} akan dihapus.`,
      buttons: [
        { text: 'BATAL', role: 'cancel' },
        { text: 'YA, HAPUS', handler: () => this.processDeleteSession(item, session === 'Pagi' ? 'morning' : 'night') }
      ]
    });
    await alert.present();
  }

  async showSelectionDeleteAlert(item: any) {
    const alert = await this.alertCtrl.create({
      header: 'Pilih Sesi',
      message: `Hapus aktivitas tanggal ${item.date}`,
      buttons: [
        { text: 'BATAL', role: 'cancel' },
        { text: 'HAPUS PAGI', handler: () => this.processDeleteSession(item, 'morning') },
        { text: 'HAPUS MALAM', handler: () => this.processDeleteSession(item, 'night') },
        { text: 'SEMUA', handler: () => this.processDeleteSession(item, 'both') }
      ]
    });
    await alert.present();
  }

  processDeleteSession(item: any, type: string) {
    const index = this.history.indexOf(item);
    if (index > -1) {
      if (type === 'morning') {
        item.morning = false;
        item.morningSteps = [];
        this.resetCeklistSaja('Pagi'); 
      } else if (type === 'night') {
        item.night = false;
        item.nightSteps = [];
        this.resetCeklistSaja('Malam'); 
      } else {
        this.history.splice(index, 1);
        this.resetCeklistSaja('Pagi');
        this.resetCeklistSaja('Malam');
      }

      if (!item.morning && !item.night && !item.isNote) {
        this.history.splice(index, 1);
      }

      localStorage.setItem('skin_history', JSON.stringify(this.history));
      
      this.loadData();
      this.calculateProgress();
      this.cdr.detectChanges(); 
      
      this.presentToast('Berhasil diperbarui');
    }
  }

  resetCeklistSaja(sesi: string) {
    const key = sesi === 'Pagi' ? 'morning_data' : 'night_data';
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

  executeDeletion(item: any) {
    const index = this.history.indexOf(item);
    if (index > -1) {
      this.history.splice(index, 1);
      localStorage.setItem('skin_history', JSON.stringify(this.history));
      this.loadData();
      this.calculateProgress();
      this.cdr.detectChanges();
      this.presentToast('Catatan dihapus');
    }
  }

  addJourney() {
    const today = new Date().toLocaleDateString('id-ID', { 
      day: 'numeric', month: 'short', year: 'numeric' 
    });

    const morningData = JSON.parse(localStorage.getItem('morning_data') || '[]');
    const nightData = JSON.parse(localStorage.getItem('night_data') || '[]');

    const morningSteps = morningData.filter((s: any) => s.isDone).map((s: any) => s.title);
    const nightSteps = nightData.filter((s: any) => s.isDone).map((s: any) => s.title);

    if (morningSteps.length === 0 && nightSteps.length === 0) {
      this.presentToast('Ceklist skincare kamu dulu ya!', true);
      return;
    }

    let dayData = this.history.find(h => h.date === today && !h.isNote);

    if (!dayData) {
      dayData = { 
        date: today, morning: morningSteps.length > 0, night: nightSteps.length > 0,
        isNote: false, morningSteps: morningSteps, nightSteps: nightSteps
      };
      this.history.unshift(dayData);
      this.presentToast('Rutinitas berhasil dicatat!');
    } else {
      dayData.morning = morningSteps.length > 0;
      dayData.morningSteps = morningSteps;
      dayData.night = nightSteps.length > 0;
      dayData.nightSteps = nightSteps;
      this.presentToast('Catatan riwayat diperbarui!');
    }

    localStorage.setItem('skin_history', JSON.stringify(this.history));
    this.loadData();
    this.calculateProgress();
    this.cdr.detectChanges();
  }

  saveNote() {
    if (!this.newNote.trim()) return;
    const today = new Date().toLocaleDateString('id-ID', { 
      day: 'numeric', month: 'short', year: 'numeric' 
    });

    this.history.unshift({
      date: today, isNote: true, message: this.newNote, morning: false, night: false
    });
    
    localStorage.setItem('skin_history', JSON.stringify(this.history));
    this.newNote = '';
    this.loadData();
    this.calculateProgress();
    this.cdr.detectChanges();
    this.presentToast('Catatan disimpan!');
  }

  calculateProgress() {
    const targetPerMonth = 60; 
    let totalSessions = 0;
    this.history.forEach(h => {
      if(!h.isNote) {
        if(h.morning) totalSessions++;
        if(h.night) totalSessions++;
      }
    });
    this.currentMonth = Math.floor(totalSessions / targetPerMonth) + 1;
    const sessionsInCurrentMonth = totalSessions % targetPerMonth;
    let result = totalSessions > 0 && totalSessions % targetPerMonth === 0 ? 100 : Math.round((sessionsInCurrentMonth / targetPerMonth) * 100);
    this.progressPercent = isNaN(result) ? 0 : result;
  }
}