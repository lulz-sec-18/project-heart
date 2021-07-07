import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Patient } from '../../../models/patient.model';
import { AuthService } from 'src/app/services/auth.service';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PatientAttributes } from '../../../models/patient-attributes.model';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-edit-patient',
  templateUrl: './edit-patient.component.html',
})
export class EditPatientComponent implements OnInit {
  editablePatientId!: string;
  patientForm!: FormGroup;
  patient!: Patient;
  loading: boolean = true;
  patientAttributes!: PatientAttributes;
  newPatient!: Patient;
  currentUser!: User;

  constructor(
    private route:ActivatedRoute,
    public authService:AuthService,
    private fb: FormBuilder
  ) { }

  getMedicine(form:FormGroup){
    return form.get('medicine') as FormArray
  }

  get medicine(){
    return this.patientForm.get('medicine') as FormArray;
  }

  patientFormValueToString(controlName: string | (string | number)[],form:FormGroup) {
    return form.get(controlName).value !== null ? this.patientForm.get(controlName).value.toString():null;
  }

  patientFormValueToInt(controlName: string | (string | number)[],form:FormGroup) {
    return form.get(controlName).value !== null ? parseInt(this.patientForm.get(controlName).value) : null;
  }

  ngOnInit(): void {
    this.route.params.subscribe(params =>{
         this.editablePatientId = params["id"];
         console.log(this.editablePatientId);
    })

    this.authService.patients.subscribe((patients) =>{
      this.patient = patients.find((patient)=>{
        return patient.id == this.editablePatientId
      })
      console.log(this.patient)
    })
    this.currentUser = JSON.parse(localStorage.getItem('user'));

    this.patientForm = new FormGroup({
      patientName: new FormControl(this.patient.name, Validators.pattern(/^[a-z,',-]+(\s)[a-z,',-]+$/i)),
      age: new FormControl(this.patient.attributes.age),
      gender: new FormControl(this.patient.gender=='male' ? 1 : 0),
      symptoms: new FormControl(this.patient.symptoms),
      disease: new FormControl(this.patient.disease),
      chestPainType: new FormControl(this.patient.attributes.chestPainType),
      restingBp: new FormControl(this.patient.attributes.restingBp),
      cholesterol: new FormControl(this.patient.attributes.cholesterol),
      fastingBp: new FormControl(this.patient.attributes.fastingBp),
      restingEcg: new FormControl(this.patient.attributes.restingEcg),
      maxHeartRate: new FormControl(this.patient.attributes.maxHeartRate),
      exerciseInducedAngina: new FormControl(this.patient.attributes.exerciseInducedAngina),
      exerciseInducedDepression: new FormControl(this.patient.attributes.exerciseInducedDepression),
      slopeOfStSegment: new FormControl(this.patient.attributes.slopeOfStSegment),
      majorVessels: new FormControl(this.patient.attributes.majorVessels),
      thalassemia: new FormControl(this.patient.attributes.thalassemia),
      confirm: new FormControl(false),
      medicine: this.fb.array([
        this.fb.group({
          medicineName: [''],
          dose: ['', [Validators.min(1), Validators.max(10)]],
          remarks: ['']
        })
      ])
    })

    this.patient.prescribedDose.forEach((med)=>{
         this.medicine.push(
           this.fb.group({
             medicineName: [med.medicineName],
             dose: [med.dose, [Validators.min(1), Validators.max(10)]],
             remarks: [med.remarks]
           })
         )
    })
  }

  onSubmit(form:FormGroup){
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
  }
}
