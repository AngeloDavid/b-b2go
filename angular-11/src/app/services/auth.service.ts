import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from "@angular/router";
import { User } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData:any;

  constructor(
    public afs: AngularFirestore,   // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,  
    public ngZone: NgZone // NgZone service to remove outside scope warning
  ) {

    this.afAuth.authState.subscribe(user=>{
      console.log("constructor", user);
      if(user){
        this.userData=user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user') as string);
      }else{
        localStorage.setItem('user', '');
        // console.log(JSON.parse(localStorage.getItem('user') as string));
      }
    });

   }

   SignIn(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then((result: any) => {
        this.ngZone.run(() => {
          this.router.navigate(['dashboard']);
        });
        console.log(result.user);        
      }).catch((error: any) => {
        window.alert(error.message)
      })
  }

  SignUp(email: string, password:string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((result: any) => {
        /* Call the SendVerificaitonMail() function when new user sign 
        up and returns promise */        
        this.SetUserData(result.user);
      }).catch((error) => {
        window.alert(error.message)
      })
  }

  SendVerificationMail() {
    return this.afAuth.currentUser
    .then(() => {
      this.router.navigate(['verify-email-address']);
    })
  }

  ForgotPassword(passwordResetEmail:string) {
    return this.afAuth.sendPasswordResetEmail(passwordResetEmail)
    .then(() => {
      window.alert('Password reset email sent, check your inbox.');
    }).catch((error) => {
      window.alert(error)
    })
  }

  get isLoggedIn(): boolean {
    if(localStorage.getItem('user')){
      const user = JSON.parse(localStorage.getItem('user')as string);
      return (user !== null && user.emailVerified !== false) ? true : false;
    }else{
      return false;
    } 
  }

   // Auth logic to run auth providers
   AuthLogin(provider: any) {
    return this.afAuth.signInWithPopup(provider)
    .then((result) => {
       this.ngZone.run(() => {
          this.router.navigate(['dashboard']);
        })
      this.SetUserData(result.user);
    }).catch((error) => {
      window.alert(error)
    })
  }


  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    }
    return userRef.set(userData, {
      merge: true
    })
  }

  GetUserData(user:any){
    return this.afs.collection('users').doc(user.uid).get();
  }

  getAllUsers(){
    return this.afs.collection('users', ref => ref.where('type','==',2)).snapshotChanges();
  }

  // Sign out 
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.ngZone.run(() => {
      this.router.navigate(['ingresar']);
      });
    })
  }



}
