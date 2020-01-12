import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router'
 
import { AppComponent } from './app.component';
import { SearchComponent } from './components/search/search.component';
import { TextComponent } from './text/text.component';
import { from } from 'rxjs';
import { HttpServiceService } from './http-service.service';

const routes: Routes = [
  {path: '', component: AppComponent},
  {path: 'search', component: SearchComponent},
  {path: 'text/:id', component: TextComponent} 
]

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    TextComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [HttpServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
