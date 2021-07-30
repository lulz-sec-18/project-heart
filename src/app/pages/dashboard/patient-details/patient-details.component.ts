import { Medicine } from './../../../models/medicines.model';
import { Patient } from './../../../models/patient.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmModalComponent } from 'src/app/components/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
})
export class PatientDetailsComponent implements OnInit {
  patient: Patient;
  dataSource: Medicine[];
  patientId!: string;
  loading: boolean = true;
  displayedColumns: string[] = ['position', 'medicineName', 'dose', 'remarks'];

  constructor(
    private route: ActivatedRoute,
    public authService: AuthService,
    private router: Router,
    public ngbModal: NgbModal
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.patientId = params['id'];
      console.log(this.patientId);
      // console.log('params Subscribed');
    });

    this.authService.patients.subscribe((patients) => {
      this.patient = patients.find((patient) => {
        return patient.id == this.patientId;
      });
      this.dataSource = this.patient.prescribedDose.filter((medicine) => {
        return medicine.medicineName != '' && medicine.dose != null;
      });
      console.log(this.dataSource.length);
      this.loading = false;
    });
  }
  onBackToList() {
    this.router.navigate(['/dashboard/patient-list']);
  }
  async onDelete() {
    await this.ngbModal.open(ConfirmModalComponent).result.then((result) => {
      if (result == 'delete') {
        this.authService.deletePatient(this.patient);
        this.router.navigate(['/dashboard/patient-list']);
      }
    });
  }
  onEdit() {
    this.router.navigate(['/dashboard/edit-patient', this.patientId]);
  }

  dateToString(timeStamp: number | string): string {
    return new Date(timeStamp).toDateString();
  }

  search(q: string): void {
    window.open('https://www.google.com/search?q=' + q);
  }
  getProfileImage() {
    if (this.patient.profileImage == null) {
      return '../../../../../../assets/images/dummy-user.png';
    }
    else{
      return this.patient.profileImage;
    }
  }
}
