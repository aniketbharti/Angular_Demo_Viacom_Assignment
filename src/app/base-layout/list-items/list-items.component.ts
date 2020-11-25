import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-list-items',
  templateUrl: './list-items.component.html',
  styleUrls: ['./list-items.component.scss']
})
export class ListItemsComponent implements OnInit, OnDestroy {

  columnDefs1 = [
    { headerName: 'First Name', field: 'firstName', sortable: true, filter: true, resizable: true },
    { headerName: 'Last Name', field: 'lastName', sortable: true, filter: true, resizable: true },
    { headerName: 'Contact Number', field: 'contactNumber', sortable: true, filter: true, resizable: true, width: 340 },
    { headerName: 'City', field: 'city', sortable: true, filter: true, resizable: true, width: 240 },
  ];
  dataArray = []
  paginationPageSize = 20
  clearSubs: Subscription;

  constructor(private utilityService: UtilityService) { }
  
  ngOnDestroy(): void {
    this.clearSubs.unsubscribe()
  }

  ngOnInit() {
    this.clearSubs = this.utilityService.getClearDataObserable().subscribe((res) => {
      if (res) {
        this.getData()
      }
    })
    this.getData()
  }
  
  getData(){
    let data = this.utilityService.getData();
    if (data) {
      this.dataArray = data['detailsField']
    }else{
      this.dataArray = []
    }
  }

}
