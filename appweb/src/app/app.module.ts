import { CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider'
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatePipe, registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
registerLocaleData(localeEs, 'es');
import { Pipe } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MainComponent } from './components/main/main.component';
import { TopbarComponent } from './components/topbar/topbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { EventsComponent } from './components/events/events.component';
import { SignUpComponent } from './components/signup/signup.component';
import { ProfileComponent } from './components/profile/profile.component';
import { EventsService } from './services/events.service';
import { UsersService } from './services/users.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PreferencesComponent } from './components/preferences/preferences.component';
import { CreateEventComponent } from './components/create-event/create-event.component';

//HttpClientModule para peticiones al servidor con GET,POST, PUT, DELETE
@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    TopbarComponent,
    FooterComponent,
    LoginComponent,
    EventsComponent,
    SignUpComponent,
    ProfileComponent,
    PreferencesComponent,
    CreateEventComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatSliderModule,
    MatTableModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule 
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'es' },
    Pipe,
    DatePipe,
    TopbarComponent,
    FooterComponent,
    EventsService,
    UsersService
  ],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})
export class AppModule { }
