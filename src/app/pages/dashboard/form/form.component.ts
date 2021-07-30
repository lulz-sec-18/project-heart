import { AuthService } from './../../../services/auth.service';
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
    public router: Router,
    public authService:AuthService) { }

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

  formatFileInput(parent, input, label) {
    const reader = new FileReader();

    input.target.onmouseout = () => {
      if (!input.target.files[0] || input.target.files[0].type != "image/jpeg") {
        if (input.target.files[0]) {
          input.target.files = null;
          this.authService.openSnackbar('Invalid file type. Please upload a jpeg file.');
        }
        return;
      };

      const file = input.target.files[0];
      label.innerText = input.target.value.replace(
        /^.*[\\\/]/,
        ''
      );
      reader.readAsDataURL(file);
      console.log(file);


      reader.onload = () => {
        this.patientForm.patchValue({
        profileImage: reader.result as string,
        });
        console.log(reader.result as string);
      }
      
      parent.className += ' -chosen';
    }
  }
  removeMedicine(index: number) {
    this.medicine.removeAt(index);
  }

  ngOnInit(): void {
    
  }
  
}
