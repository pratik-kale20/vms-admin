import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DatabaseService } from '../service/database.service';

@Component({
  selector: 'app-edit-data',
  templateUrl: './edit-data.component.html',
  styleUrls: ['./edit-data.component.css']
})
export class EditDataComponent implements OnInit {
  filePath: any;
  csvData: any;
  userId: any;
  dataForm = new FormGroup (
    {
      compName: new FormControl('', Validators.compose([Validators.required])),
      email: new FormControl('',Validators.compose([Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")])),
      pno: new FormControl('',Validators.compose([Validators.required,Validators.minLength(10),Validators.pattern('^[0-9]*$')])),
      city: new FormControl('',Validators.compose([Validators.required])),
      pin: new FormControl('',Validators.compose([Validators.required,Validators.minLength(6),Validators.maxLength(6),Validators.pattern('^[0-9]*$')])),
      address: new FormControl('',Validators.compose([Validators.required])),
      pname: new FormControl('',Validators.compose([Validators.required])),
      pemail: new FormControl('',Validators.compose([Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")])),
      ppno: new FormControl('',Validators.compose([Validators.required,Validators.minLength(10),Validators.maxLength(10),Validators.pattern('^[0-9]*$')])),
      empDetails: new FormControl([{}]),
    }
  )



  constructor(private db: DatabaseService) {

  }

  ngOnInit(): void {
    this.dataForm.controls['compName'].setValue('UsmartAI')
    console.log(this.db.editData)
  }


 async doRegister(regForm:FormGroup){
    console.log(regForm)
    if(regForm.valid){
      this.userId = await this.db.addData(regForm,this.filePath); 
    }
    else{
      console.log("Invalid Data")
    }
  }

  async checkSize(event: any){
    let size = event.target.files[0].size * (10 ** (-6))
    if(size < 10 && size > 0 && event.target.files[0].type == "text/csv"){
          this.filePath = event.target.files[0];
          let reader = new FileReader();
          reader.readAsText(event.target.files[0]);

          reader.onload = () => {
            this.csvData = reader.result;
            let csvRecordsArray = (this.csvData).split("\r") ;
            let csvCompleteData = []
            for (let i=1;i<csvRecordsArray.length;i++){
                let data = csvRecordsArray[i].split(',');
                let newData = { name: data[0], desig: data[1] , phone : data[2]}
                csvCompleteData[i-1] = newData;
            }
            this.dataForm.value.empDetails = csvCompleteData;
            console.log(csvCompleteData)

            //let headersRow = this.getHeaderArray(csvRecordsArray);

            // this.records = this.getDataRecordsArrayFromCSVFile(csvRecordsArray, headersRow.length);
          };

          reader.onerror = function () {
            console.log('error is occured while reading file!');
          };
      // await this.db.addCsvFun(event.target.files[0].name,this.filePath)
      console.log(event.target.files[0])
    }
    else{
      console.log("not a CSv file or out of range")
    }
  }
}
