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
        this.GetUserData(result.user).subscribe((resp)=>{
          const user = resp.data() as User;
          user.uid= resp.id;          
          if(user.type==2){
            localStorage.setItem('user',JSON.stringify(user));
            // console.log(user);
            this.ngZone.run(() => {
              this.router.navigate(['home']);
            });
          }          
        })        
        // console.log(result.user);        
      }).catch((error: any) => {
        window.alert(error.message)
      })
  }

  SignUp(newUser: User) {
    return this.afAuth.createUserWithEmailAndPassword(newUser.email, newUser.password)
      .then((result: any) => {
        /* Call the SendVerificaitonMail() function when new user sign 
        up and returns promise */  
        newUser.uid=result.user.uid;      
        this.SetUserData(newUser);
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
      // console.log(user);
      // return (user !== null && user.emailVerified !== false) ? true : false;
      return (user !== null ) ? true : false;
    }else{
      return false;
    } 
  }

   // Auth logic to run auth providers
   AuthLogin(provider: any) {
    return this.afAuth.signInWithPopup(provider)
    .then((result) => {
       this.ngZone.run(() => {
          this.router.navigate(['home']);
        })
      this.SetUserData(result.user);
    }).catch((error) => {
      window.alert(error)
    })
  }


  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);    
    return userRef.set(user, {
      merge: true
    })
  }

  GetUserData(user:any){
    // console.log(user);
    return this.afs.collection('users').doc(user.uid).get();
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
