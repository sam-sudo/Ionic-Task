import { Component } from '@angular/core';
import { ToDoService } from '../../services/to-do.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(public todoService:ToDoService) {
    console.log('eey');
    
  }

}
