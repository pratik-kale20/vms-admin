import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { formatCurrency } from '@angular/common';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  db: AngularFirestore;
  private dataCollection: AngularFirestoreCollection<any>;
  userEmail: any;
  urlCsv: any;
  Ids: any;
  user: any;
  data: any;
  editData: any;

  constructor(db: AngularFirestore,private afAuth: AngularFireAuth ,  public fireStorage: AngularFireStorage) { 
    this.db = db;
    this.dataCollection = db.collection<any>('users');
  }

  async addData(Form: any, filePath: any) {
    //await this.addCsvFun(filePath, "/" + Form.value.compName + "_" + filePath.name)
    const totalUsersSnapshot = firstValueFrom(await this.db
      .collection<any>('users')
      .doc('totalUsers')
      .get());
    const totalUsers = (await totalUsersSnapshot).data().userId;
    const dataSend = {
      userEmail: Form.value.email,
      userId: 111111 + totalUsers + 1,
      compName: Form.value.compName,
      pno: Form.value.pno,
      city: Form.value.city,
      pin: Form.value.pin,
      address: Form.value.address,
      pname: Form.value.pname,
      pemail: Form.value.pemail,
      ppno: Form.value.ppno,
      empDetails: [],
      visitors: [],
      checkIns: 0,
      checkOuts: 0,
      DailyVisitors: 0
    };
    const newUser = this.db
      .collection<any>('users')
      .doc((111111 + totalUsers + 1).toString())
      .set(dataSend);
    for(let i =0 ;i<Form.value.empDetails.length - 1;i++) {
      await this.addEmployee(Form.value.empDetails[i],111111 + totalUsers + 1)
    } 
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
    
    return (111111 + totalUsers + 1).toString()
  }

  async addEmployee(data: any,id: any) {
    this.db
      .collection<any>('users')
      .doc(id.toString())
      .update({
        empDetails: firebase.firestore.FieldValue.arrayUnion(data),
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

  async getUsers(){
    this.data = []
    const totalUsersSnapshot = firstValueFrom(await this.db
      .collection<any>('users')
      .get());
    await (await totalUsersSnapshot).docs.forEach((doc) =>    
      this.data[Number(doc.id) - 111112] = { 
        "id" : doc.id ,
        "cName" : doc.data().compName,
        "cEmail": doc.data().userEmail, 
        "cNo" : doc.data().pno , 
        "pName" : doc.data().pname , 
        "pEmail" : doc.data().pemail ,
        "empDetails" : doc.data().empDetails
      }
    )
    return "done"
  }
}
