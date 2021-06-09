import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../auth/auth.service";
import { Patient } from "../../auth/models/patient.model";
import { User } from "../../auth/models/user.modal";
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PatientAttributes } from '../../auth/models/patient-attributes.model';

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.css']
})
export class AddPatientComponent implements OnInit {
  patientForm: FormGroup;
  patientAttributes:PatientAttributes;
  newPatient: Patient;
  currentUser: User;

  constructor(public authService: AuthService, private fb: FormBuilder) {
  }

  get medicine() {
    return this.patientForm.get('medicine') as FormArray
  }
  get patientName() {
    return this.patientForm.get('patientName');
  }

  addMedicine() {
    this.medicine.push(
      this.fb.group({
        medicineName: ['',],
        dose: ['', [Validators.min(1), Validators.max(10)]],
        remarks: ['']
      }))
  }

  patientFormValueToString(controlName: string | (string | number)[]) {
    return this.patientForm.get(controlName).value !== null ? this.patientForm.get(controlName).value.toString():null;
  }

  patientFormValueToInt(controlName: string | (string | number)[]) {
    return this.patientForm.get(controlName).value !== null ? parseInt(this.patientForm.get(controlName).value) : null;
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
      medicine: this.fb.array([
        this.fb.group({
          medicineName: [''],
          dose: ['', [Validators.min(1), Validators.max(10)]],
          remarks: ['']
        })
      ])
    })

  }



  onSubmit() {
    this.patientAttributes={
      age: this.patientFormValueToInt('age'),
      gender: this.patientFormValueToInt('gender'),
      chestPainType: this.patientFormValueToInt('chestPainType'),
      restingBp: this.patientFormValueToInt('restingBp'),
      cholesterol: this.patientFormValueToInt('cholesterol'),
      fastingBp: this.patientFormValueToInt('fastingBp'),
      restingEcg: this.patientFormValueToInt('restingEcg'),
      maxHeartRate: this.patientFormValueToInt('maxHeartRate'),
      exerciseInducedAngina: this.patientFormValueToInt('exerciseInducedAngina'),
      exerciseInducedDepression: this.patientFormValueToInt('exerciseInducedDepression'),
      slopeOfStSegment: this.patientFormValueToInt('slopeOfStSegment'),
      majorVessels: this.patientFormValueToInt('majorVessels'),
      thalassemia: this.patientFormValueToInt('thalassemia')
    }

    console.log(this.medicine.value)
    this.newPatient = this.currentUser == null ? null : {
      doctor_uid: this.currentUser.uid,
      admission_time: Date.now(),
      name: this.patientFormValueToString('patientName'),
      gender: this.patientFormValueToInt('gender') == 1 ? "male" : "female",
      id: null,
      disease: this.patientFormValueToString('disease'),
      symptoms: this.patientFormValueToString('symptoms')?.split(",", 2),
      prescribedDose: this.medicine.value,
      attributes: this.patientAttributes,
      attributesArray:Object.values(this.patientAttributes),
    }
    console.log(this.newPatient)
    this.authService.createPatient(this.newPatient).then((err)=>console.log(err))
  }
}
