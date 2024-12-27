import { Component } from '@angular/core';
import { NgxLoadingModule } from 'ngx-loading';
import { FullPageLoaderService } from 'src/app/common/services/full-page-loader.service';

@Component({
  selector: 'app-full-page-loader',
  standalone: true,
  imports: [NgxLoadingModule],
  templateUrl: './full-page-loader.component.html',
  styleUrl: './full-page-loader.component.scss'
})
export class FullPageLoaderComponent {
  loading: boolean = false;
  ngxLoadingConfig: any = {};
  constructor(private loaderService: FullPageLoaderService) {
    // Subscribe to the service's loading status
    this.ngxLoadingConfig = loaderService.ngxLoadingConfig;
    this.loaderService.loadingStatus.subscribe((status) => {
      if(status != null){
        this.loading = status;
      }
    });
  }
}
