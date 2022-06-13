import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { formatCurrency } from '@angular/common';
import { AngularFireStorage } from '@angular/fire/compat/storage';
@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  db: AngularFirestore;
  private dataCollection: AngularFirestoreCollection<any>;
  userEmail: any;
  urlCsv: any;

  constructor(db: AngularFirestore,private afAuth: AngularFireAuth ,  public fireStorage: AngularFireStorage) { 
    this.db = db;
    this.dataCollection = db.collection<any>('users');
  }

  async addData(Form: any, filePath: any) {
    await this.addCsvFun(filePath, "/" + Form.value.compName + "_" + filePath.name)
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
      empDetails: this.urlCsv
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

  async addCsvFun(orgPath: any, filePath: any) {
    this.urlCsv = await (
      await this.fireStorage.upload(
          filePath,
        orgPath
      )
    ).ref.getDownloadURL();
    console.log(this.urlCsv)
  }
}
