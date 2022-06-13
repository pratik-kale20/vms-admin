import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DatabaseService } from '../service/database.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  dataForm = new FormGroup (
    {
      compName: new FormControl('', Validators.compose([Validators.required])),
      email: new FormControl('',Validators.compose([Validators.required])),
      pno: new FormControl('',Validators.compose([Validators.required])),
      city: new FormControl('',Validators.compose([Validators.required])),
      pin: new FormControl('',Validators.compose([Validators.required])),
      address: new FormControl('',Validators.compose([Validators.required])),
      pname: new FormControl('',Validators.compose([Validators.required])),
      pemail: new FormControl('',Validators.compose([Validators.required])),
      ppno: new FormControl('',Validators.compose([Validators.required])),
      empDetails: new FormControl('',Validators.compose([Validators.required])),

    }
  )

  constructor(private db: DatabaseService) { }

  ngOnInit(): void {

  }

  doRegister(regForm:FormGroup){
    console.log(regForm)
    this.db.addData(regForm);
  }

  checkSize(args:any){
    console.log(args.fileData.size)
  }

}
