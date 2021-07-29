import { Component, OnInit, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: 'form.component.html',
})
export class FormComponent implements OnInit {
  @Input() patientForm!: FormGroup;
  @Input() loading!: boolean;
  @Output() onFormSubmit = new EventEmitter<FormGroup>();
  childPatientForm!: FormGroup;
  
  constructor(
    private formBuilder: FormBuilder,
    public router: Router) { }

  get medicine(){
    return this.patientForm.get('medicine') as FormArray
  }

  addMedicine() {
    this.medicine.push(
      this.formBuilder.group({
        medicineName: ['',],
        dose: ['', [Validators.min(1), Validators.max(10)]],
        remarks: ['']
      }))
  }

  onSubmit() {
    this.childPatientForm = this.patientForm
    this.onFormSubmit.emit(this.childPatientForm);
    console.log(this.childPatientForm);
  }

  ngOnInit(): void {
   
  }
  formatFileInput(parent:ElementRef, input:ElementRef,label:ElementRef) {
    //handle onmouseout event on Input
    input.nativeElement.onmouseout = () => {
      if (!input.nativeElement.value) return;
      console.log(input.nativeElement.value);
      label.nativeElement.innerText = input.nativeElement.value.replace(
        /^.*[\\\/]/,
        ''
      );
      parent.nativeElement.innerText += ' -chosen';
    }
  }
}
