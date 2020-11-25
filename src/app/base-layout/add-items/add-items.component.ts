import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from 'src/app/modal/modal.component';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-add-items',
  templateUrl: './add-items.component.html',
  styleUrls: ['./add-items.component.scss']
})
export class AddItemsComponent implements OnInit {

  detailsForm: FormGroup;
  modalData = {
    width: "350px",
    data: {
      message: null,
      button: null
    }
  }

  constructor(private formBuilder: FormBuilder, private dialog: MatDialog, private utilityService: UtilityService) { }

  ngOnInit() {
    this.detailsForm = this.formBuilder.group({
      detailsField: this.formBuilder.array([
        this.formMulupulatingField()
      ])
    });
  }

  formMulupulatingField(): FormGroup {
    return this.formBuilder.group({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      contactNumber: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{10}$')]),
      city: new FormControl('', [Validators.required])
    });
  }

  addNewInputField(): void {
    let formArray = <FormArray>this.detailsForm.get('detailsField');
    formArray.push(this.formMulupulatingField());
  }

  removeAll(): void {
    let formArray = <FormArray>this.detailsForm.get('detailsField');
    if(formArray.length > 0){
      this.modalData.data.message = ["Are you sure want to delete all items??"]
      this.modalData.data.button = ["Ok", "Cancel"]
      this.dialog.open(ModalComponent, this.modalData).afterClosed().subscribe((res) => {
        if (res === 'Ok') {
          while (formArray.length !== 0) {
            formArray.removeAt(0)
          }
          this.utilityService.snackBarFunc("All fields are deleted successfull")
        }
      })  
    }
  }

  removeInputField(i: number): void {
    let formArray = <FormArray>this.detailsForm.get('detailsField');
    formArray.removeAt(i);
  }

  submitForm(): void {

    if (this.detailsForm.valid) {
      let formArray = <FormArray>this.detailsForm.get('detailsField');
      if (formArray.length == 0) {
        this.modalData.data.message = ["No Data Found To Submit"]
        this.modalData.data.button = ["Ok"]
        this.dialog.open(ModalComponent, this.modalData)
      } else {
        this.modalData.data.message = ["Are you sure want to submit??"]
        this.modalData.data.button = ["Ok", "Cancel"]
        this.dialog.open(ModalComponent, this.modalData).afterClosed().subscribe((res) => {
          if (res === 'Ok') {
            this.utilityService.setData(this.detailsForm.value)
            this.utilityService.snackBarFunc("Data has been successfully saved")
            this.detailsForm.reset()
          }
        })
      }
    } else {
      this.detailsForm.markAllAsTouched()
    }
  }

}

