import { Component, OnInit, ViewChild } from '@angular/core';
import { UsersService } from '../users.service';
import { FormGroup, NgForm } from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  @ViewChild('f', { static: false }) slForm: NgForm;
  userform: FormGroup;
  Users: any = [];
  _id: any;
  name: string;
  email: string;
  mobile: number;
  FetchUser: any = [];

  editMode = false


constructor(private usersService: UsersService) { 
  this.readUsers();
}

  addUser(){
    const newUser ={
      name: this.name,
      email: this.email,
      mobile: this.mobile
    }
    console.log(newUser)
    this.usersService.addUser(newUser).subscribe(user => {
      this.Users.push(user);
    })
    this.readUsers();
    this.name = '';
    this.email = '';
    this.mobile = null;
  }

  readUsers(){
    this.usersService.getUser().subscribe((data) => {
      this.Users = data
    })

  }

  getUser(id: any){
    this.editMode = true
    this.FetchUser.length = 0;
    this.usersService.fetchUser(id).subscribe((data) => {
      this.FetchUser = data
      console.log(this.FetchUser)
      this._id = id;
      this.name = this.FetchUser.name;
      this.email = this.FetchUser.email;
      this.mobile = this.FetchUser.mobile;
    })
  }

  deleteUser(id: any){
    var users = this.Users;
    this.usersService.deleteUser(id).subscribe(data => {
      if(data.n==1){
        for(var i=0 ; i<users.length; i++){
          if(users[i]._id == id){
            users.splice(i,1);
          }
        }
      }
      this.readUsers();
    })
  }

  editUser(user){
    console.log(this.FetchUser)

    const updatedUser ={
      _id: this._id,
      name: this.name,
      email: this.email,
      mobile: this.mobile
    }
    console.log(this._id)
    console.log(updatedUser)
    this.usersService.updateUser(updatedUser)
    this.readUsers();
  }

  ngOnInit() {
  }
}
