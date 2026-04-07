import { Component, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MainMenu } from './components/unique/main-menu/main-menu';
import { Login } from './components/unique/login/login';
import { Apollo } from 'apollo-angular';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MainMenu, Login],
  providers: [Router, Apollo],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('frontend');
}
