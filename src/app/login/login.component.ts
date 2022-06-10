import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import firebase from 'firebase/compat/app';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private afAuth: AngularFireAuth, private router: Router ) { }

  ngOnInit(): void {
  }

  tryGoogleLogin(){
    let provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      this.afAuth.signInWithPopup(provider)
      .then(res => {
        console.log(res);
        this.router.navigate(['home']);
      }, err => {
        console.log(err);
      })
  }

}
