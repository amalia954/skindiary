import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    localStorage.setItem('active_tab', 'Pagi'); 
    // KUNCI BEBAS KEDIP: Kita tidak panggil loadDataDirectly() di sini lagi!
  }

  ionViewWillEnter() {
    // 1. CEK SAKELAR PALING ATAS
    const paksaBersih = localStorage.getItem('clear_visual_now');
    
    if (paksaBersih === 'true') {
      this.morningChecklist.forEach(item => item.isDone = false);
      this.nightChecklist.forEach(item => item.isDone = false);
      
      localStorage.setItem('morning_data', JSON.stringify(this.morningChecklist));
      localStorage.setItem('night_data', JSON.stringify(this.nightChecklist));
      
      this.cdr.detectChanges();
      return; 
    }

    // 2. JALUR BACA DATA NORMAL
    const savedMorning = localStorage.getItem('morning_data');
    const savedNight = localStorage.getItem('night_data');
    
    if (savedMorning) {
      const parsedMorning = JSON.parse(savedMorning);
      this.morningChecklist.forEach((item, index) => {
        if (parsedMorning[index]) item.isDone = parsedMorning[index].isDone;
      });
    } else {
      this.morningChecklist.forEach(item => item.isDone = false);
    }

    if (savedNight) {
      const parsedNight = JSON.parse(savedNight);
      this.nightChecklist.forEach((item, index) => {
        if (parsedNight[index]) item.isDone = parsedNight[index].isDone;
      });
    } else {
      this.nightChecklist.forEach(item => item.isDone = false);
    }

    // 3. RESET HARIAN OTOMATIS
    const lastResetDate = localStorage.getItem('last_reset_date');
    const today = new Date().toLocaleDateString('en-CA'); 
    if (lastResetDate !== today) {
      this.morningChecklist.forEach(item => item.isDone = false);
      this.nightChecklist.forEach(item => item.isDone = false);
      localStorage.setItem('last_reset_date', today);
      this.saveToStorage(); 
    }

    this.cdr.detectChanges();
  }

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