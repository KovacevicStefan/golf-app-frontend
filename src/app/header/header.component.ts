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

  constructor(public sharedService: SharedService, private router: Router) {}

  isScrolled = false;

  ngOnInit() {
    if (typeof window !== "undefined") {
      const scrollPosition = window.scrollY || document.documentElement.scrollTop;
      scrollPosition ? this.isScrolled = true : this.isScrolled = false;
    }
  }

  isHome(route: string): boolean {
    return this.router.url === route;
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollPosition = window.scrollY || document.documentElement.scrollTop;
    this.isScrolled = scrollPosition > 100;
  }

}
