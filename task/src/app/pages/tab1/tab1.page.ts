import { Component } from '@angular/core';
import { ToDoService } from '../../services/to-do.service';
import { List } from '../../models/list.model';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  list:List[];
  idUser :Date;

  constructor(public toDoService:ToDoService, private router:Router, private alert:AlertController) {
    this.list = toDoService.list;
    
    
  }


  async addList(){
    //this.router.navigateByUrl('/tabs/tab1/add');
    const alert = await this.alert.create({
      cssClass: 'my-custom-class',
      header: 'New list',
      inputs:[{
        name:'title',
        type:'text',
        placeholder:'name of list'
      }
      ],
      
      buttons: [
        {
        text:'Cancel',
        role:'cancel',
        handler: () => console.log('cancelar')
        
        },
        {
          text:'Add',
          handler: (data) =>{

            if(data.title.length > 0){

              console.log('done');
              const idList = this.toDoService.createList(data.title);
              this.router.navigateByUrl(`/tabs/tab1/add/${idList}`);

            }

          } 

        }
    ]
    });
    

    alert.present();
  }



  async addShareList(){
    const alert = await this.alert.create({
      cssClass: 'my-custom-class',
      header: 'Connect with shared list',
      inputs:[{
        name:'id',
        type:'text',
        placeholder:'id list'
      }
      ],
      
      buttons: [
        {
        text:'Cancel',
        role:'cancel',
        handler: () => console.log('cancelar')
        
        },
        {
          text:'Add',
          handler: (data) =>{

            if(data.id.length > 0){

              console.log('done');
              const idList = this.toDoService.createSharedList(data.id);
              

            }

          } 

        }
    ]
    });
    

    alert.present();
  }

  



}
