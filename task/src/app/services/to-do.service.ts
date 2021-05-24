import { Injectable, OnInit } from '@angular/core';
import { List } from '../models/list.model';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import  firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyCRXcuqKNIRDv1w9iYvQMaFP1TTxvSCw0c",
  authDomain: "task-43c68.firebaseapp.com",
  databaseURL: "https://task-43c68-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "task-43c68",
  storageBucket: "task-43c68.appspot.com",
  messagingSenderId: "404837656900",
  appId: "1:404837656900:web:808c0aca22cab6aa45cf11",
  measurementId: "G-1ZN9M7XD4J"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();


@Injectable({
  providedIn: 'root'
})
export class ToDoService {

  list: List[] = [];
  database: any;
  idUser: Date ;

  constructor(private nativeStorage: NativeStorage) {
    console.log('Service started');

    this.database = firebase.database();

    // this.nativeStorage.getItem('userId').then(res => {
    //   console.log('idUser' + res);

    //   if(res != null && res != 'undefined'){
          
    //       this.idUser = res;
    //   }else{
    //     console.log('creado');
    //     this.idUser= new Date()
    //     this.nativeStorage.setItem('userId',this.idUser);
    //   }

    // })

    
    
    

    this.loadStorage();
    
  }

  

  
  //NATIVE STORAGE
  createList(title:string){
      const newList = new List(title);
      this.list.push(newList);
      
      this.saveStorage();
      
      return newList.id;
    }

    //FIRESTORE REALTIME
    createSharedList(idList: string){
      this.getSharedList(idList);
      
      
    }

    //NATIVE STORAGE
    getList(id:string | number){
      id = Number(id);
  
      return this.list.find(dataList =>  dataList.id === id);
     
    }

    
    //FIRESTORE REALTIME
    getSharedList(idList:string ):List{
      var data: List;
    
      var starCountRef = firebase.database().ref('sharedList/' + idList );
      starCountRef.get().then((snapshot) => {


        data = snapshot.val();

        if(data.items == null){
          data.items = [];
        }
        console.log(data);
        console.log(this.list);

        if(this.list.findIndex(x => x.id === data.id) === -1){
          this.list.push(data);
        }else{
          console.log('camio');
          
          this.list.findIndex(x => {
            if(x.id === data.id){
              console.log('adri2');
              
              x.title = data.title || ''
              x.created != null ? data.created : new Date()
              if(x.ended != null) x.ended = data.ended
              x.done = data.done
              //x.createdBy = data.createdBy
              x.shared = data.shared
              x.items = data.items


              console.log(x);
              console.log(data);
              
              //this.list.push();
            }
          })
        }

        
        
      
        
        this.saveSharedFirebase(data,data.id+'');
        this.saveStorage();


      })
      return data;

    }



    //NATIVE STORAGE
    deleteList(list: List){

      this.list = this.list.filter( l => l.id !== list.id );
  
      this.saveStorage();
    }


    //FIRESTORE REALTIME
    deleteSharedList(idList: string){
      
      //this.database.ref('sharedList/' + idList).remove();
    }



    //NATIVE STORAGE
    saveStorage(){
      console.log('SAVING...');
      
      //To save data with nativeStoragge
      this.nativeStorage.setItem('list',this.list);
    }


    //FIRESTORE REALTIME
    saveSharedFirebase(list: List, idList: string){
      this.database.ref('sharedList/' + idList).set({...list});
    }



    //NATIVE STORAGE
    loadStorage(){
      console.log('loading...');

      //To get data with nativeStoragge
      this.nativeStorage.getItem('list').then((list) => {
        console.log('Your age is', JSON.stringify(list));
        console.log('done');
        this.list = list;
      });
      
    }


    




    
 




  //----------------------------------WITH LOCAL STORAGE----------------------------------

  // constructor() {
  //   console.log('Service started');

  //   // const list0 = new List('prueba 0 ');
  //   // const list1 = new List('prueba 1 ');
    
    
  //   // this.list.push(list0,list1);

  //   this.loadStorage();
    
  // }

  // createList(title:string){
  //   const newList = new List(title);
  //   this.list.push(newList);
  //   this.saveStorage();
    
  //   return newList.id;
  // }

  // deleteList(list: List){

  //   this.list = this.list.filter( l => l.id !== list.id );

  //   this.saveStorage();
  // }

  // getList(id:string | number){
  //   // id = Number(id);

  //   // return this.list.find(dataList =>  dataList.id === id);
   
  // }

  // saveStorage(){
  //   localStorage.setItem('data',JSON.stringify(this.list));
  // }

  // loadStorage(){
  //   if(localStorage.getItem('data')){
  //     this.list = JSON.parse(localStorage.getItem('data'));
  //   }else{
  //     this.list = [];
  //   }
  // }




  

}
