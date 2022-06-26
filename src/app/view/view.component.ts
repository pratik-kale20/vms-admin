import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { DatabaseService } from '../service/database.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  data: any;

  constructor(public db: DatabaseService) { }

  async ngOnInit() {
      await this.db.getUsers()
      this.data = this.db.data
      console.log(this.data)
  }

}
