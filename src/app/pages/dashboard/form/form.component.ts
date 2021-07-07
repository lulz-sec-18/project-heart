import {Component, OnInit, Input, Output,EventEmitter} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: 'form.component.html',
})
export class FormComponent implements OnInit {
  @Input() patientForm!: FormGroup;
  @Output() onFormSubmit = new EventEmitter<FormGroup>();
  routeAddPatient: boolean = false;
  routeEditPatient: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router) { }

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

  onSubmit(){
    this.onFormSubmit.emit(this.patientForm);
  }

  ngOnInit(): void {
    if (this.router.url.search('add-patient') > 0) {
      this.routeAddPatient = true;
      this.routeEditPatient = false;
    }
    else {
      this.routeAddPatient = false;
      this.routeEditPatient = true;
    }
  }
}
