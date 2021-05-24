import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(private router: Router) {}
  

  goTab2(){
    this.router.navigateByUrl(`/tabs/tab2`, { replaceUrl: true});

  }

}
