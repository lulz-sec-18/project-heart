import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Patient } from '../../../models/patient.model';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
})
export class PatientListComponent implements OnInit {
  patients: Patient[];
  displayedColumns: string[] = [
    'position',
    'name',
    'admission-date',
    'prediction',
    'edit-patient',
    'delete-patient'
  ];
  dataSource: Patient[];

  constructor(
    public authService: AuthService,
    private router: Router) {}

  ngOnInit(): void {
    this.authService.patients.subscribe((patients) => {
      this.patients = patients.map((patient: Patient) => {
        let date = new Date(patient.admission_time).toDateString();
        return { ...patient, admission_time: date };
      });
      // this.patients = patients
      this.dataSource = this.patients;
      console.log(this.patients);
    });
  }

  deletePatient(patient: Patient): void {
    this.authService.deletePatient(patient);
  }

  editPatient(patient: Patient): void {
    this.router.navigate(['/dashboard/edit-patient']);
  }

  openDetails(patient: Patient): void {
    console.log('fuck off');
  }
}
