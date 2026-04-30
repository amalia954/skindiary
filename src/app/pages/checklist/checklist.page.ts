import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-checklist',
  templateUrl: './checklist.page.html',
  styleUrls: ['./checklist.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ChecklistPage implements OnInit {
  currentTab: string = 'Pagi'; 

  morningChecklist = [
    { title: 'Face Wash', isDone: false },
    { title: 'Toner', isDone: false },
    { title: 'Serum', isDone: false },
    { title: 'Moisturizer', isDone: false },
    { title: 'Sunscreen', isDone: false },
    { title: 'Lip Balm SPF', isDone: false }
  ];

  nightChecklist = [
    { title: 'Double Cleansing', isDone: false },
    { title: 'Face Wash', isDone: false },
    { title: 'Toner', isDone: false },
    { title: 'Exfoliating', isDone: false },
    { title: 'Face Mask', isDone: false },
    { title: 'Moisturizer', isDone: false },
    { title: 'Lip Sleeping Mask', isDone: false },
    { title: 'Eye Cream', isDone: false }
  ];

  constructor() {}

  ngOnInit() {
    this.loadData();
    localStorage.setItem('active_tab', 'Pagi'); 
  }

  // FUNGSI SAKTI: Supaya centang otomatis update pas pindah tab
  ionViewWillEnter() {
    this.loadData();
  }

  loadData() {
  const savedMorning = localStorage.getItem('morning_data');
  const savedNight = localStorage.getItem('night_data');
  const lastResetDate = localStorage.getItem('last_reset_date');
  
  // Ambil tanggal hari ini (contoh: "2026-04-29")
  const today = new Date().toLocaleDateString('en-CA'); 

  // 1. Cek apakah ini hari baru?
  if (lastResetDate !== today) {
    // RESET SEMUA: Balikin isDone ke false karena ganti hari
    this.morningChecklist.forEach(item => item.isDone = false);
    this.nightChecklist.forEach(item => item.isDone = false);
    
    // Simpan tanggal hari ini sebagai tanda sudah direset
    localStorage.setItem('last_reset_date', today);
    this.saveToStorage(); 
  } else {
    // 2. Kalau hari yang sama, baru muat data yang tersimpan
    if (savedMorning) this.morningChecklist = JSON.parse(savedMorning);
    if (savedNight) this.nightChecklist = JSON.parse(savedNight);
  }
}
  // Dipanggil saat user klik centang di HTML
  updateStorage(sesi: string) {
    this.currentTab = sesi;
    localStorage.setItem('active_tab', sesi); 
    this.saveToStorage();
  }

  saveToStorage() {
    localStorage.setItem('morning_data', JSON.stringify(this.morningChecklist));
    localStorage.setItem('night_data', JSON.stringify(this.nightChecklist));
  }
}