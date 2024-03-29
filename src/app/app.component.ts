import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'The Question Answer App';
  user: any;

  constructor(public authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    if (!this.authService.currentLoggedInUser) {
      const userJson: any = localStorage.getItem(this.authService.userKey);
      try {
        const user = JSON.parse(userJson);
        this.authService.currentLoggedInUser = user;
      } catch (error) {
        localStorage.removeItem(this.authService.userKey);
      }
    }

    this.user = this.authService.currentLoggedInUser;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/'])
  }
}
