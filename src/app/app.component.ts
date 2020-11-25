import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoaderService } from './services/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'viacom-problem-set';
  loaderSubscription: Subscription;
  state: any;
  location: any;
  
  constructor(private loaderService: LoaderService){
  }

  ngOnInit(): void {
    this.loaderSubscription = this.loaderService.loaderListener().subscribe((res) => {
      this.state = res.state
    })
  }

  ngOnDestroy(): void {
    this.loaderSubscription.unsubscribe()
  }

}
