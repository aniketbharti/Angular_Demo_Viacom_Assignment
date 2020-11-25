import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ModalComponent } from '../modal/modal.component';
import { HttpService } from '../services/http.service';
import { UtilityService } from '../services/utility.service';

@Component({
  selector: 'app-base-layout',
  templateUrl: './base-layout.component.html',
  styleUrls: ['./base-layout.component.scss'],
  host: {
    '(window:resize)': 'onResize($event)'
  }
})
export class BaseLayoutComponent implements OnInit {

  currentPageTitle: string;
  isHandset$: Observable<boolean>
  mobileview: boolean = false;
  matcher: MediaQueryList;
  openNavigation: boolean = false;
  textMsg: any;
  imageUrl: any;
  isSomeThingWentWrong: boolean;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private httpService: HttpService, 
    private dialog: MatDialog, private utilityService: UtilityService) {
  }

  onResize(event: any) {
    if (event.target.innerWidth < 599) {
      this.mobileview = true
    } else {
      this.mobileview = false
    }
  }

  ngOnInit() {
    this.currentPageTitle = this.activatedRoute.snapshot.firstChild.data['pageTitle']
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentPageTitle = this.activatedRoute.snapshot.firstChild.data['pageTitle']
        console.log('title-', this.activatedRoute.snapshot.firstChild.data['pageTitle']);
      }
    });
    this.mobileview = window.innerWidth < 599 ? true : false
    this.httpService.getMethod(environment.getDetails).subscribe((res: any) => {
      if (res.isSuccessful) {
        this.imageUrl = res.data.url;
        this.textMsg = res.data.description;
      }else{
        this.isSomeThingWentWrong = true;
      }
    }, err => {
      this.isSomeThingWentWrong = true
    })
  }

  clearData(){
    this.dialog.open(ModalComponent, { width: "350px", data: {
        message: ["Are you sure want to clear data?"],
        button: ["Ok", "Cancel"]
      }
    }).afterClosed().subscribe((res) => {
      if (res === 'Ok') {
        this.utilityService.clearData()
        this.utilityService.snackBarFunc("Data cleaned successfully")
      }
    })

  }

}
