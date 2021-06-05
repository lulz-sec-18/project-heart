import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../auth/auth.service";
import {Patient} from "../../auth/models/patient.model";
import {User} from "../../auth/models/user.modal";

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.css']
})
export class AddPatientComponent implements OnInit {

  constructor(public authService:AuthService) { }
  patient: Patient;
  user:User
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

}
