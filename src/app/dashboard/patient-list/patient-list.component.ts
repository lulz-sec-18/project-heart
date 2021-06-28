import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Patient } from '../../auth/models/patient.model';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent implements OnInit {
  patients:Patient[]
  displayedColumns: string[] = ['position', 'name', 'disease', 'condition'];
  constructor( public authService:AuthService) { }

  ngOnInit(): void {
    this.authService.patients.subscribe(
      (patients)=>{
        this.patients = patients
      }
    )
  }
}
