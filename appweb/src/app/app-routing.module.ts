import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { LoginComponent } from './components/login/login.component';
import { EventsComponent } from './components/events/events.component';
import { SignUpComponent } from './components/signup/signup.component';
import { ProfileComponent } from './components/profile/profile.component';
import { PreferencesComponent } from './components/preferences/preferences.component';
import { CreateEventComponent } from './components/create-event/create-event.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'login', component: LoginComponent },
  { path: 'events/:id', component: EventsComponent },
  { path: 'preferences/:id', component: PreferencesComponent },  
  { path: 'create-event', component: CreateEventComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'profile', component: ProfileComponent } // FALTA EN EL MENU
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
