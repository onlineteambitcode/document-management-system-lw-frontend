import { Component } from '@angular/core';
import { NgOtpInputModule } from 'ng-otp-input';
@Component({
  selector: 'app-otp',
  standalone: true,
  imports: [NgOtpInputModule],
  templateUrl: './otp.component.html',
  styleUrl: './otp.component.scss'
})
export class OtpComponent {


  onOtpChange(event: any):void{
    console.log(event);
  }
}
