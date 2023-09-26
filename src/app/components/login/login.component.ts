import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: '',
      password: ''
    });
  }

  ValidateEmail = (email: any) => {
    const validRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return validRegex.test(email);
  }

  submit(){
    let user = this.form.getRawValue();
    if (user.email.trim() == "" || user.password.trim() == "") {
      Swal.fire("Error", "please fill the all fields", "error")
    } else if (!this.ValidateEmail(user.email)) {
      Swal.fire("Error", "please Enter a valid email", "error")
    } else {
      this.http.post("http://localhost:5000/api/login", user, {
        withCredentials: true
      })
        .subscribe(() => this.router.navigate(['/']), (err) => {
          Swal.fire("Error", err.error.message, "error")
        });
    }
  }
}
