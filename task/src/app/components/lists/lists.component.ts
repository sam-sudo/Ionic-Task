import { Component, Input, OnInit } from '@angular/core';
import { ToDoService } from '../../services/to-do.service';
import { List } from '../../models/list.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss'],
})
export class ListsComponent implements OnInit {

  @Input() ended = true;

  list: List[];

  constructor( public toDoService:ToDoService, private router:Router) { 
    this.list = this.toDoService.list;
  }

  listSelected(list: List){
    console.log(list);

    if(this.ended){

      this.router.navigateByUrl(`/tabs/tab2/add/${list.id}`);

    }else{

      this.router.navigateByUrl(`/tabs/tab1/add/${list.id}`);

    }
    
  }

  deleteList(list: List){
        
    this.toDoService.deleteList(list);

    if(list.shared){
      this.toDoService.deleteSharedList(list.id+'');
    }
  }






  ngOnInit() {}



}
