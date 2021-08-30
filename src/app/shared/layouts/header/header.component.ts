import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  isNavbarCollapsed: boolean = true;
  @Input('selectedPage') selectedPage: string = 'home';

  pages = [
    {
      name: "home",
      path: "/home",
    },
    {
      name: "about",
      path: "/about",
    },
    {
      name: "courses",
      path: "/courses",
    },
    {
      name: "result",
      path: "/result",
    },
    {
      name: "legal notice",
      path: "/legal-notice",
    },
    {
      name: "contact",
      path: "/contact",
    }
  ]

  constructor(private router: Router) { }

  goTo(page) {
    this.router.navigate([page.path]);
  }

  isPageSelected(page) {
    return this.selectedPage === page;
  }

}
