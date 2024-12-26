import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { HttpClientApiService } from '../services/http-client-api.service';
import { AuthInterceptor } from '../interceptors/auth.interceptor';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  providers: [
    HttpClientApiService,  // Provide the HTTP Client Service globally
    {
      provide: HTTP_INTERCEPTORS,  // Provide the AuthInterceptor globally
      useClass: AuthInterceptor,
      multi: true,  // Allow multiple interceptors
    },
    provideHttpClient(),  // Replace HttpClientModule with provideHttpClient in Angular 18
  ]
})
export class HttpCommonApiModule {}
