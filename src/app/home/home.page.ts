import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class HomePage {

  // DATA RUTINITAS PAGI (Morning Routine)
  morningSteps = [
    { step: '1', title: 'Face Wash', desc: 'Membersikan sisa minyak dan kotoran setelah bangun tidur.' },
    { step: '2', title: 'Toner', desc: 'Hidrasi kulit dan siapkan kulit untuk tahap berikutnya.' },
    { step: '3', title: 'Serum', desc: 'Nutrisi tambahan untuk mencerahkan atau mengatasi masalah kulit.' },
    { step: '4', title: 'Moisturizer', desc: 'Menjaga kelembapan wajah agar kulit tidak kering.' },
    { step: '5', title: 'Sunscreen', desc: 'WAJIB! Untuk melindungi kulit dari sinar matahari.' },
    { step: '6', title: 'Lip Balm SPF', desc: 'Melembapkan sekaligus melindungi bibir dari sinar matahari.' }
  ];

  // DATA RUTINITAS MALAM (Night Routine)
  nightSteps = [
    { step: '1', title: 'Double Cleansing', desc: 'Membersihkan makeup serta debu di wajah.' },
    { step: '2', title: 'Face Wash', desc: 'Membersihkan wajah secara mendalam.' },
    { step: '3', title: 'Toner', desc: 'Menenangkan kulit setelah seharian beraktivitas.' },
    { step: '4', title: 'Exfoliating', desc: 'Angkat sel kulit mati agar wajah tidak kusam (Gunakan 2-3x seminggu).' },
    { step: '5', title: 'Face Mask', desc: 'Nutrisi ekstra untuk relaksasi dan memperbaiki tekstur kulit.' },
    { step: '6', title: 'Moisturizer', desc: 'Mengunci kelembapan agar proses regenerasi kulit maksimal saat tidur.' },
    { step: '7', title: 'Lip Sleeping Mask', desc: 'Merawat bibir agar tetap terasa lembut dan plumpy.' },
    { step: '8', title: 'Eye Cream', desc: 'Cegah kerutan dan mata panda.' }
  ];

  constructor() {}
}