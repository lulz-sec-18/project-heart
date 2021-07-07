import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from "src/app/services/auth.service";
import { Patient } from "../../../models/patient.model";
import { User } from "../../../models/user.model";
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PatientAttributes } from '../../../models/patient-attributes.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
})
export class AddPatientComponent implements OnInit {
  patientForm: FormGroup;
  patientAttributes:PatientAttributes;
  newPatient: Patient;
  currentUser: User;

  constructor(
    public authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router) {
  }

  getMedicine(form:FormGroup) {
    return form.get('medicine') as FormArray
  }

  patientFormValueToString(controlName: string | (string | number)[],form:FormGroup) {
    return form.get(controlName).value !== null ? this.patientForm.get(controlName).value.toString():null;
  }

  patientFormValueToInt(controlName: string | (string | number)[],form:FormGroup) {
    return form.get(controlName).value !== null ? parseInt(this.patientForm.get(controlName).value) : null;
  }

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('user'))
    this.patientForm = new FormGroup({
      patientName: new FormControl(null, Validators.pattern(/^[a-z,',-]+(\s)[a-z,',-]+$/i)),
      age: new FormControl(null,),
      gender: new FormControl(1),
      symptoms: new FormControl(null),
      disease: new FormControl(null),
      chestPainType: new FormControl(1),
      restingBp: new FormControl(null),
      cholesterol: new FormControl(null),
      fastingBp: new FormControl(null),
      restingEcg: new FormControl(0),
      maxHeartRate: new FormControl(null),
      exerciseInducedAngina: new FormControl(0),
      exerciseInducedDepression: new FormControl(null),
      slopeOfStSegment: new FormControl(2),
      majorVessels: new FormControl(null),
      thalassemia: new FormControl(null),
      confirm: new FormControl(false),
      medicine: this.formBuilder.array([
        this.formBuilder.group({
          medicineName: [''],
          dose: ['', [Validators.min(1), Validators.max(10)]],
          remarks: ['']
        })
      ])
    })

  }

  onSubmit(form:FormGroup) {
    this.patientAttributes={
      age: this.patientFormValueToInt('age',form),
      gender: this.patientFormValueToInt('gender',form),
      chestPainType: this.patientFormValueToInt('chestPainType',form),
      restingBp: this.patientFormValueToInt('restingBp',form),
      cholesterol: this.patientFormValueToInt('cholesterol',form),
      fastingBp: this.patientFormValueToInt('fastingBp',form),
      restingEcg: this.patientFormValueToInt('restingEcg',form),
      maxHeartRate: this.patientFormValueToInt('maxHeartRate',form),
      exerciseInducedAngina: this.patientFormValueToInt('exerciseInducedAngina',form),
      exerciseInducedDepression: this.patientFormValueToInt('exerciseInducedDepression',form),
      slopeOfStSegment: this.patientFormValueToInt('slopeOfStSegment',form),
      majorVessels: this.patientFormValueToInt('majorVessels',form),
      thalassemia: this.patientFormValueToInt('thalassemia',form)
    }

    console.log(this.getMedicine(form).value)
    this.newPatient = this.currentUser == null ? null : {
      doctor_uid: this.currentUser.uid,
      admission_time: Date.now(),
      name: this.patientFormValueToString('patientName',form),
      gender: this.patientFormValueToInt('gender',form) == 1 ? "male" : "female",
      id: null,
      disease: this.patientFormValueToString('disease',form),
      symptoms: this.patientFormValueToString('symptoms',form),//?.split(",", 2),
      prescribedDose: this.getMedicine(form).value,
      attributes: this.patientAttributes,
      attributesArray:Object.values(this.patientAttributes),
    }
    console.log(this.newPatient)
    this.authService.createPatient(this.newPatient).then((err)=>console.log(err));
    this.router.navigate(['/patient-list']);
  }
}
