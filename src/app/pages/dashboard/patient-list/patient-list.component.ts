import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Patient } from '../../../models/patient.model';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
})
export class PatientListComponent implements OnInit {
  patients: Patient[];
  displayedColumns: string[] = ['position', 'name', 'admission_date'];
  dataSource: Patient[];
  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    this.authService.patients.subscribe((patients) => {
      this.patients = patients.map((patient: Patient) => {
        let date = new Date(patient.admission_time).toDateString();
        return { ...patient, admission_time: date };
      });
      // this.patients = patients
      this.dataSource = this.patients;
      console.log(patients);
    });
  }
}
