import { Injectable } from '@angular/core';
import { HttpModule, Http, Headers } from '@angular/http';
import { map } from 'rxjs/operators' 
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  

  constructor(private http: Http) { }

  getUser(){
    return this.http.get('http://localhost:3000').pipe(
      map(res => res.json())
    )
  }

  addUser(newUser){
    console.log(newUser);
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/adduser', newUser, {headers: headers}).pipe(
      map(res => res.json())
    )
    
  }

  fetchUser(id){
    return this.http.get('http://localhost:3000/fetchuser/'+id).pipe(
      map(res => res.json())
    )
  }

  updateUser(updatedUser){
    console.log(updatedUser._id)
    console.log(updatedUser)
    return this.http.get('http://localhost:3000/edituser/'+updatedUser._id, updatedUser)
  }

  deleteUser(id){
    console.log(id);
    return this.http.delete('http://localhost:3000/delete/'+id).pipe(
      map(res => res.json())
    )
  } 
}
