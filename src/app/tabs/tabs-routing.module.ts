import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '', // Biarkan kosong karena di AppRoutingModule sudah dipanggil sebagai 'tabs'
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'checklist',
        loadChildren: () => import('../pages/checklist/checklist.module').then(m => m.ChecklistPageModule)
      },
      {
        path: 'progress',
        loadChildren: () => import('../pages/progress/progress.module').then(m => m.ProgressPageModule)
      },
      {
        path: 'settings',
        loadChildren: () => import('../settings/settings.module').then(m => m.SettingsPageModule)
      },
      {
        path: '',
        redirectTo: 'home', // Redirect ke home jika hanya buka /tabs
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {} // Nama ini harus sama dengan yang di-import di tabs.module.ts