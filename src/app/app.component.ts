import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FullPageLoaderComponent } from './components/full-page-loader/full-page-loader.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FullPageLoaderComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'Modernize Angular Admin Tempplate';
}
