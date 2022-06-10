import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { formatCurrency } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  db: AngularFirestore;
  private dataCollection: AngularFirestoreCollection<any>;
  userEmail: any;

  constructor(db: AngularFirestore,private afAuth: AngularFireAuth) { 
    this.db = db;
    this.dataCollection = db.collection<any>('users');
  }

  async addData(Form: any) {
    const totalUsersSnapshot = firstValueFrom(await this.db
      .collection<any>('users')
      .doc('totalUsers')
      .get());
    const totalUsers = (await totalUsersSnapshot).data().userId;
    const dataSend = {
      userEmail: Form.value.email,
      userId: 111111 + totalUsers + 1,
      userPassword: '123456',
      compName: Form.value.compName,
      pno: Form.value.pno,
      city: Form.value.city,
      pin: Form.value.pin,
      address: Form.value.address,
      pname: Form.value.pname,
      pemail: Form.value.pemail,
      ppno: Form.value.ppno,
      empDetails: Form.value.empDetails
    };
    const newUser = this.db
      .collection<any>('users')
      .doc((111111 + totalUsers + 1).toString())
      .set(dataSend);
    const snapshot = this.db
      .collection<any>('users')
      .doc('totalUsers')
      .set({ userId: totalUsers + 1 });
      this.afAuth.createUserWithEmailAndPassword(Form.value.email, '123456')
      .then((result) => {
        /* Call the SendVerificaitonMail() function when new user sign up and returns promise */
        // this.SendVerificationMail();
        // this.SetUserData(result.user);
      }).catch((error) => {
        console.log(error);
      });
  }
}
