import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { IPicture } from "./Picture";

@Injectable({
    providedIn:'root'
})


export class PictureService{
    private pictures:IPicture[]=[];
    private picturesUpdates=new Subject<IPicture[]>();

    url='http://localhost:3000/api/pictures'
    constructor(private http:HttpClient){}
  
    addPicture(title:string,content:string,image:File){
        // console.log("Add picture called")
        const postData=new FormData();
        postData.append("title",title)
        postData.append("content",content)
        postData.append("image",image,title)
        this.http
        .post<{message:string, pic:IPicture}>(
            'http://localhost:3000/api/pictures',
            postData)
        .subscribe(responseData=>{
            const pic:IPicture={
                id:responseData.pic.id,
                title:title,
                content:content,
                imagePath:responseData.pic.imagePath
            };
            console.log("Response Data: Id Obtained",pic['id']);
            this.pictures.push(pic);
            this.picturesUpdates.next([...this.pictures]);
        })

    }
}