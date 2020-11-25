import { Subject, Observable } from 'rxjs';

export class LoaderService {
  loaderSubject: Subject<any>;
  
  constructor() {
    this.loaderSubject = new Subject();
  }
  
  changeLoaderState(loaderOptions: any) {
    this.loaderSubject.next(loaderOptions);
  }

  loaderListener(): Observable<any> {
    return this.loaderSubject.asObservable();
  }
}

