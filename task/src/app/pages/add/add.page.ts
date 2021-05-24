import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToDoService } from '../../services/to-do.service';
import { List } from '../../models/list.model';
import { ItemList } from '../../models/itemList.model';
import { Location } from '@angular/common'
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})

export class AddPage implements OnInit {

  list: List ;
  itemName = '';
  idList: string;
  isChecked: boolean ;


  constructor(private toDoService:ToDoService, private route:ActivatedRoute, private router:Router ,private _location: Location,private alert:AlertController) { 


    

    this.idList = this.route.snapshot.paramMap.get('id');
    
    this.list =  this.toDoService.getSharedList(this.idList);

    this.list = this.toDoService.getList(this.idList);

   toDoService.database.ref('sharedList/').on('value',  (snapshot) => {
      if (snapshot.exists()) {

          this.idList = this.route.snapshot.paramMap.get('id');
    
          this.list =  this.toDoService.getSharedList(this.idList);

          this.list = this.toDoService.getList(this.idList);
        
        

      }
        
    })


    this.isChecked = this.list.shared;
    console.log(this.list.shared);
    

    
  }

  async isShared(event){
    
      var isChecked = event.currentTarget.checked;

    if( isChecked && !this.list.shared){

      const alert = await this.alert.create({
        cssClass: 'my-custom-class',
        header: 'Do you want share this list?',
        
        
        buttons: [
          {
          text:'Cancel',
          role:'cancel',
          handler: () => {
            console.log('cancelar')
            this.isChecked = false;
            this.list.shared = false;

          }
          
          },
          {
            text:'Add',
            handler: (data) =>{
                this.list.shared = true;
                this.isChecked = true;
                this.toDoService.saveSharedFirebase(this.list,this.idList);
                
            } 
  
          }
      ]
      });

      alert.present();


    }

    if(!this.isChecked){
      this.list.shared = false;
      this.isChecked= false;
      this.toDoService.deleteSharedList(this.idList);
    }
    
  }
  


  addItem(){
    if(this.itemName.length === 0){
      return;
    }
  
    const newItem = new ItemList(this.itemName);
    this.list.items.push(newItem);

    this.itemName = '';
    

    if(!this.isChecked){
      console.log('storage');
      
      this.toDoService.saveStorage();
    }else{
      console.log('firebase');

      this.toDoService.saveSharedFirebase(this.list,this.idList);
    }

  }


  checkChange(item: ItemList){

  
    const notDone = this.list.items
                            .filter(itemData =>  !itemData.done)
                            .length;

    if(notDone === 0){
      this.list.done = true;
      this.list.ended = new Date();
    }  else{
      this.list.done = false;
      this.list.ended = null;
    }                          



    if(!this.isChecked){
      console.log('if');
      
      this.toDoService.saveStorage();
    }else{
      console.log('else');
      
       //this.toDoService.getSharedList(this.idList);
       this.toDoService.saveSharedFirebase(this.list,this.idList);
    }
    
    
    
  }

  delete(i : number){
    this.list.items.splice(i,1);

    if(!this.isChecked){
      
      this.toDoService.saveStorage();
    }else{
      //this.toDoService.deleteSharedList(this.idList);
      this.toDoService.saveSharedFirebase(this.list,this.idList);
    }
  }


  ngOnInit() {
    console.log('onionit');

  }

  

  

  

}
