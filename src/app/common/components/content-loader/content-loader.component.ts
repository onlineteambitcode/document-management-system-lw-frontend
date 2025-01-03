import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-content-loader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './content-loader.component.html',
  styleUrl: './content-loader.component.scss'
})
export class ContentLoaderComponent {
  @Input() loaderType: string = 'default';
}
