import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(private http:HttpClient) { }

  postData(data:any){
    return this.http.post("http://localhost:3000/posts",data)
  }

  getData(){
    return this.http.get("http://localhost:3000/posts")
  }
  
  deleteData(id:any){
    return this.http.delete("http://localhost:3000/posts/"+id)
  }

  updateData(data:any, id:any){
    return this.http.put("http://localhost:3000/posts/"+id,data)
  }

}
