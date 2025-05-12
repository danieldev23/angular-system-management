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
    const { email, password } = this.loginForm.getRawValue();

    // Hardcoded login check
    if (email === 'huy@gmail.com' && password === 'huy123') {
      this.showMsgSuccess('Đăng nhập thành công!');
      this.userService.saveUserObj(
        {
          id: 1,
          name: 'Huy',
          email: email,
          rememberToken: 'fake-token-123'
        },
        'fake-token-123'
      );
      this.redirectService.redirectNetworkHome();
      console.log('✅ Đăng nhập thành công (hardcoded)');
    } else {
      this.showMsgFailure('Tài khoản và mật khẩu không tồn tại!');
      console.log('❌ Sai thông tin đăng nhập (hardcoded)');
      this.redirectService.redirectLogin();
    }
  }
}

}
