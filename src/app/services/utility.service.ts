import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';

@Injectable()
export class UtilityService {

  clearDataObs = new Subject<any>();

  constructor(private _snackBar: MatSnackBar) { }
  setData(data) {
    let savedData = JSON.parse(localStorage.getItem("savedData"));
    if(savedData){
      savedData.detailsField = savedData.detailsField.concat(data.detailsField)
    }else{
      savedData = data
    }
    localStorage.setItem("savedData", JSON.stringify(savedData))
  }

  getData() {
    return JSON.parse(localStorage.getItem("savedData"));
  }

  clearData() {
    localStorage.clear()
    this.clearDataObs.next(true)
  }

  getClearDataObserable(){
    return this.clearDataObs.asObservable()
  }

  snackBarFunc(message) {
    this._snackBar.open(message, '', {
      duration: 3000,
    });
  }
}
