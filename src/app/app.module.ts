import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgxLoadingModule } from 'ngx-loading';
 
import { AppComponent } from './app.component';
import { SearchComponent } from './modules/search/components/search/search.component';
import { AppAuthGuard } from './app.authguard';
import { ShowChapterComponent } from './modules/search/components/showChapter/showChapter.component';
import { AddChapterComponent } from './modules/add/components/add-chapter/add-chapter.component';
import { HttpService } from './modules/services/http.service';
import { KeycloakService, KeycloakAngularModule } from 'keycloak-angular';
import { AppRoutingModule } from './app-routing.module';
import { initializer } from './app-init';
import { StartPageComponent } from './modules/start/start-page/start-page.component';

const keycloakService = new KeycloakService();

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    ShowChapterComponent,
    AddChapterComponent,
    StartPageComponent
  ],
  imports: [
    KeycloakAngularModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    NgxLoadingModule.forRoot({})
  ],
  providers: [HttpService, AppAuthGuard, KeycloakService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializer,
      multi: true,
      deps: [KeycloakService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
