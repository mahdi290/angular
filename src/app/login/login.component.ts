import { Component, OnInit } from '@angular/core';
import { AuthService } from '../AuthService';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: firebase.User | null = null;
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.getUserClaims().then(user => {
      this.user = user;
    }).catch((error) => {
      console.error('Error fetching user claims', error);
    });
  }

  onSubmit() {
    this.authService.signInWithEmailAndPassword(this.email, this.password)
      .then((user) => {
        // Redirect to the desired page after successful login
        this.router.navigate(['/homeservice']);
      })
      .catch((error) => {
        console.log('Login error:', error);
        // Handle login error
      });
  }
  

  async doGoogleLogin() {
    try {
      await this.authService.doGoogleLogin();
      this.router.navigate(['/homeservice']);
    } catch (error) {
      console.error('Login failed', error);
    }
  }

  async logout() {
    try {
      await this.authService.doLogout();
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Logout failed', error);
    }
  }
}