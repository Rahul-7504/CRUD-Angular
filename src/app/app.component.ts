import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ServicesService } from './services.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'practice';
  alldata:any
  ids:any
  loginForm: FormGroup
  update:any
  buttonValueChange : Boolean = false;

  constructor(private fb: FormBuilder,private toastr: ToastrService,private http:HttpClient,private services:ServicesService) {
    this.loginForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
    }
    )
    this.getData();
 
  }

  get name() {
    return this.loginForm.get('name');
  }
  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }
  get confirmPassword() {
    return this.loginForm.get('confirmPassword');
  }

  
  submit() {
   
     if(this.buttonValueChange == false){
      if(this.loginForm.invalid){
        this.toastr.info("please fill up all the fields!")
      }else{
        this.services.postData(this.loginForm.value).subscribe((data)=>{
          console.log(data);
          this.toastr.success("save successfully")
          this.getData();
          
        })
      }
     }else{
      this.services.updateData(this.loginForm.value, this.update).subscribe((data)=>{
        console.log(data);
        this.toastr.success("update successfully");
        this.getData();
        
      })
     }
  }

getData(){
  this.services.getData().subscribe((data)=>{
   this.alldata=data
    
  })
}
deleteData(id:any){
  this.services.deleteData(this.ids=id).subscribe((data)=>{
  alert("delete")
  this.getData()
  console.log(data);
  
  })
}

updateData(id:any){
 this.update=id;
 this.buttonValueChange = true
 return this.http.get("http://localhost:3000/posts/"+id).subscribe((data:any)=>{
 console.log(data);
 this.loginForm.patchValue({
  name:data?.name,
  email:data?.email,
  password:data?.password,
  confirmPassword:data?.confirmPassword

 })
 })
}

 
}
