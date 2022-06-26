import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { DatabaseService } from '../service/database.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  data: any;
  empDetails: any;
  display = 'none'

  constructor(public db: DatabaseService, public router: Router) { }

  async ngOnInit() {
      this.display = 'none'
      await this.db.getUsers()
      this.data = this.db.data
      console.log(this.data[0].empDetails)
  }

  showEmp(index: any){
    this.display = 'block'
    this.empDetails = this.data[index].empDetails
    console.log(this.empDetails)
  }

  editData(index:any){
    this.db.editData = this.data[index].id
    this.router.navigate(['edit']);
  }

}
