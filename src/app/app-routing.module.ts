import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Routes } from '@angular/router';
import { AppAuthGuard } from './app.authguard';
import { AppComponent } from './app.component';
import { AddChapterComponent } from './modules/add/components/add-chapter/add-chapter.component';
import { SearchComponent } from './modules/search/components/search/search.component';
import { ShowChapterComponent } from './modules/search/components/showChapter/showChapter.component';
import { StartPageComponent } from './modules/start/start-page/start-page.component';

const routes: Routes = [
  {path: '', component: StartPageComponent},
  {
    path: 'add', 
    component: AddChapterComponent,
    canActivate: [AppAuthGuard],
    data: { roles: ['admin'] }
  },
  //{path: 'add', component: AddChapterComponent},
  //{path: 'search', component: SearchComponent},
  { 
    path: 'search', 
    //loadChildren: () => SearchComponent ,
    component: SearchComponent,
    canActivate: [AppAuthGuard],
    data: { roles: ['user', 'admin'] }
  },
  {path: 'text/:id', component: ShowChapterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AppAuthGuard]
})
export class AppRoutingModule {}