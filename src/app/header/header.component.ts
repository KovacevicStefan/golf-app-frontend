import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { SharedService } from '../shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  isScrolled = false;

  constructor(public sharedService: SharedService, private router: Router) {}

  ngOnInit() {
    if (typeof window !== "undefined") {
      const scrollPosition = window.scrollY || document.documentElement.scrollTop;
      scrollPosition ? this.isScrolled = true : this.isScrolled = false;
    }
  }

  isHome(route: string, routecon: string): boolean {
    return this.router.url === route || this.router.url === routecon;
  }

  showMenu() {
    console.log("gfaga");
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollPosition = window.scrollY || document.documentElement.scrollTop;
    this.isScrolled = scrollPosition > 100;
  }

}
