import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import firebase from 'firebase';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public chatUser:any = null;
  public msg:string = null;

  itemsRef: AngularFireList<any>;
  items: Observable<any[]>;

  constructor(public navCtrl: NavController, db: AngularFireDatabase) {
    firebase.auth().onAuthStateChanged( user=> {
      if(user) {
        this.chatUser = user;
      }
      else{
        this.chatUser = null;
      }
    });


    this.itemsRef = db.list('messages');
    // Use snapshotChanges().map() to store the key
    this.items = this.itemsRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
  }

  login():void{
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider).then( ()=> {
      firebase.auth().getRedirectResult().then( result => {
        var user = result.user;
      }).catch(function(error) {
        console.log(error);
      });
    });
  }

  logout():void {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signOut().then(function() {
      console.log("Logout successful");
    }, function(error) {
      console.log(error);
    });
  }

  addItem(newName: string) {
    this.itemsRef.push({ text: newName });
  }
  updateItem(key: string, newText: string) {
    this.itemsRef.update(key, { text: newText });
  }
  deleteItem(key: string) {    
    this.itemsRef.remove(key); 
  }
  deleteEverything() {
    this.itemsRef.remove();
  }

}
