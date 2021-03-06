import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ThemePalette } from '@angular/material/core';
import { AuthService } from 'src/app/services/auth.service';
import { Patient } from '../../../models/patient.model';
import { ConfirmModalComponent } from '../../../components/confirm-modal/confirm-modal.component';

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
  loading: boolean = false;

  constructor(public authService: AuthService, public ngbModal: NgbModal,private router:Router) {}

  ngOnInit(): void {
    this.loading = true;
    this.authService.patients.subscribe((patients) => {
      this.patients = patients.map((patient: Patient) => {
        let date = new Date(patient.admission_time).toDateString();
        return { ...patient, admission_time: date };
      });
      this.dataSource = this.patients;
      this.loading = false;
      console.log(this.patients);
    });
  }

  deletePatient(patient: Patient): void {
    this.ngbModal.open(ConfirmModalComponent).result.then((result) => {
      if (result == 'delete') {
        this.authService.deletePatient(patient);
      }
    });
  }

  openDetails(patient: Patient): void {
    this.router.navigate(['dashboard/patient-details', patient.id]);
  }

  convertToPercent(value: number): string {
    if(value > 1) return 'N/A'
    return (value * 100).toFixed(0) + '%';
  }
}
