import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainMenu } from './components/unique/main-menu/main-menu';
import { Login } from './components/unique/login/login';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MainMenu, Login],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('frontend');
}
