import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../app.services/user/user.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  isScrolled = false;
  authenticatedUser?: any;

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit() {
    const scrollPosition = window.scrollY || document.documentElement.scrollTop;
    scrollPosition ? this.isScrolled = true : this.isScrolled = false;
    this.getProfileData();
  }

  isHome(route: string, routecon: string): boolean {
    return this.router.url === route || this.router.url === routecon;
  }

  showMenu() {
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollPosition = window.scrollY || document.documentElement.scrollTop;
    this.isScrolled = scrollPosition > 100;
  }

  public getProfileData() {
    return this.userService.getProfileData().subscribe(data => {
      this.authenticatedUser = data;
    })
  }

}
