import {Component, OnInit, Input, Output,EventEmitter} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  @Input() patientForm:FormGroup;
  @Output() onFormSubmit = new EventEmitter<FormGroup>();

  constructor(private fb: FormBuilder) { }

  get medicine(){
    return this.patientForm.get('medicine') as FormArray
  }
  addMedicine() {
    this.medicine.push(
      this.fb.group({
        medicineName: ['',],
        dose: ['', [Validators.min(1), Validators.max(10)]],
        remarks: ['']
      }))
  }
  onSubmit(){
    this.onFormSubmit.emit(this.patientForm);
  }

  ngOnInit(): void {
  }

}
