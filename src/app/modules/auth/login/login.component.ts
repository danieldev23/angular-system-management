import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auto_api/backend';
import { FormLoginModel } from 'src/app/models/form.login.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MyBaseComponent } from '../../my-base.component';
import { AuthLoginRequest } from '../../../core/auto_api/backend/model/authLoginRequest';
import { UserService } from 'src/app/core/services/user.service';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginAuthComponent extends MyBaseComponent {
  loginForm: FormGroup<FormLoginModel>;
  constructor(private authService: AuthService) {
    super();
    this.loginForm = new FormGroup<FormLoginModel>({
      emailOrNumberPhone: new FormControl<string | null>('', {
        validators: [Validators.required],
      }),
      password: new FormControl<string | null>('', {
        validators: [Validators.required, Validators.minLength(8)],
      }),
    });
  }
  onLogin() {
    if (!this.loginForm?.invalid) {
      console.log(this.loginForm.getRawValue());
      
      this.authService
        .apiAuthLoginPost(this.loginForm.getRawValue() as AuthLoginRequest)
        .subscribe((response) => {
          if (response.success) {
            this.showMsgSuccess('Đăng nhập thành công!');
            this.userService.saveUserObj(
              response.data!,
              response.data!.rememberToken!
            );
            this.redirectService.redirectNetworkHome();
            console.log('Login successful!');
          } else {
            this.showMsgFailure('Tài khoản và mật khẩu không tồn tại!');
            console.log('Login failed!');
            this.redirectService.redirectLogin();
          }
        });
    }
  }
}
