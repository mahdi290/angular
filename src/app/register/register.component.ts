import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AuthService } from '../AuthService';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(private afAuth: AngularFireAuth, private router: Router, private authService: AuthService) {}

  onSubmit() {
    if (this.password !== this.confirmPassword) {
      console.error('Passwords do not match');
      return;
    }

    this.afAuth.createUserWithEmailAndPassword(this.email, this.password)
      .then(userCredential => {
        console.log('User registered successfully:', userCredential.user);
        // Redirect to the home service
        this.router.navigate(['/homeservice']);
      })
      .catch(error => {
        console.error('Error registering user:', error);
        // Handle registration error
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
}