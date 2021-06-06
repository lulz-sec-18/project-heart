import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../auth/auth.service";
// import {Patient} from "../../auth/models/patient.model";
// import {User} from "../../auth/models/user.modal";
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.css']
})
export class AddPatientComponent implements OnInit {

  patientForm = new FormGroup({
    patientName: new FormControl(null),
    age : new FormControl(null,),
    gender : new FormControl(null),
    symptoms : new FormControl(null),
    disease :new FormControl(null),
    chestPainType : new FormControl(null),
    restingBp : new FormControl(null),
    cholesterol : new FormControl(null),
    fastingBp : new  FormControl(null),
    restingEcg : new FormControl(null),
    maxHeartRate : new FormControl(null),
    exerciseInducedAngina : new FormControl(null),
    exerciseInducedDepression : new FormControl(null),
    slopeOfStSegment : new FormControl(null),
    majorVessels : new FormControl(null),
    thalassemia : new FormControl(null),
    confirm : new FormControl(false)
  })
  constructor(public authService:AuthService) { }
  // patient: Patient;
  // user:User


  // name = new FormControl(null);
  // age = new FormControl(null);
  // gender = new FormControl(null);
  // symptoms = new FormControl(null)
  // disease = new FormControl(null);
  // chestPainType = new FormControl(null);
  // restingBp = new FormControl(null);
  // cholestrol = new FormControl(null);
  // fastingBp = new  FormControl(null)
  // restingEcg = new FormControl(null)
  // maxHeartRate = new FormControl(null)
  // exerciseInducedAngina = new FormControl(null)
  // exerciseInducedDepression = new FormControl(null)
  // slopeOfStSegment = new FormControl(null)
  // majorVessels = new FormControl(null)
  // thalassemia = new FormControl(null)





  ngOnInit(): void {
    // this.user =  JSON.parse(localStorage.getItem('user'));
    // this.patient = {
    //   doctor_uid:this.user.uid,
    //   admission_time:new Date(),
    //   name:this.user.displayName,
    //   id:null,
    //   disease:'heropanti',
    //   condition:true
    // }

    // this.authService.createPatient(this.patient)
  }
  onSubmit(){
    console.log(this.patientForm)
  }
}
