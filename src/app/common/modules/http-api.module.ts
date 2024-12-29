import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpClientApiService } from '../services/http-client-api.service';
import { authInterceptor } from '../interceptors/auth.interceptor';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  providers: [
    HttpClientApiService,  // Provide the HTTP Client Service globally
    provideHttpClient(withInterceptors([authInterceptor])  ),  // Replace HttpClientModule with provideHttpClient in Angular 18
  ]
})
export class HttpCommonApiModule {}
