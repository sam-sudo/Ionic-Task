import { ItemList } from '../models/itemList.model';


export class List {

    id: number;
    title: string;
    created: Date;
    ended: Date;
    done:boolean;
    items: ItemList[];
    shared: boolean;
    createdBy :Date ;


    constructor(title: string) {
        this.title = title;
        this.created = new Date();
        this.done = false;
        this.items = [];
        this.shared= false;
        this.createdBy = new Date();

        this.id = new Date().getTime();
    }
}