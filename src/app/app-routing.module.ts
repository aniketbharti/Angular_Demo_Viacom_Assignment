import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddItemsComponent } from './base-layout/add-items/add-items.component';
import { BaseLayoutComponent } from './base-layout/base-layout.component';
import { HomeComponent } from './base-layout/home/home.component';
import { ListItemsComponent } from './base-layout/list-items/list-items.component';


const routes: Routes = [
  {
    path: '', component: BaseLayoutComponent, children: [
      {
        path: '', redirectTo: 'home', pathMatch: 'full'
      },
      {
        path: 'home', component: HomeComponent, data : { pageTitle: 'Home' }
      },
      {
        path: 'add-list', component: AddItemsComponent, data : { pageTitle: 'Add Details' }
      },
      {
        path: 'view-list', component: ListItemsComponent,  data : { pageTitle: 'View Details' }
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
