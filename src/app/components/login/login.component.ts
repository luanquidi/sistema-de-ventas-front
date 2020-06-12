import { Component, OnInit } from '@angular/core';
import { User } from '../../models/User';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user;
  public token;
  public identity;
  public dataError;
  public error: boolean;

  constructor(
    private userService: UserService,
    private router: Router
  ) {
    this.user = new User('', '', '', '', '');
  }

  ngOnInit(): void {
  }

  closeAlert(){
    this.dataError = '';
    this.error = false;
  }

  login(form){
    if (form.valid){
      this.userService.login(this.user).subscribe(
        (res) => {
          this.token = res.token;
          localStorage.setItem('token', this.token);

          this.userService.login(this.user, true).subscribe(
            (response) => {
              localStorage.setItem('identity', JSON.stringify(response.usuario));
              this.router.navigate(['dashboard']);
            },
            (err) => {
            }
          );
        },
        (err) => {
          this.error = true;
          this.dataError = err.error.mensaje;
        }
      );
    }else{

    }
  }

}
