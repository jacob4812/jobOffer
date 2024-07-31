import { Component, ElementRef, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {
  isNavOpen = false;

  @ViewChild('navRef', { static: false }) navRef!: ElementRef;

  constructor(private router: Router) { }

  ngOnInit(): void {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  ngOnDestroy(): void {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  toggleNav(): void {
    this.isNavOpen = !this.isNavOpen;
    console.log('Toggle nav:', this.isNavOpen);
  }

  handleClickOutside = (event: MouseEvent): void => {
    console.log('Click outside:', event.target);
    if (this.navRef && !this.navRef.nativeElement.contains(event.target)) {
      this.isNavOpen = false;
    }
  }
}
