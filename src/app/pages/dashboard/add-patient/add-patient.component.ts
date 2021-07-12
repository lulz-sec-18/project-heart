import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Patient } from '../../../models/patient.model';
import { User } from '../../../models/user.model';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { PatientAttributes } from '../../../models/patient-attributes.model';
import { Router } from '@angular/router';
import { PredictionService } from 'src/app/services/prediction.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
})
export class AddPatientComponent implements OnInit {
  patientForm: FormGroup;
  patientAttributes: PatientAttributes;
  newPatient: Patient;
  currentUser: User;
  predictionResult: number;
  loading: boolean = false;

  constructor(
    public authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private predictionService: PredictionService,
    private _snackBar: MatSnackBar
  ) {}

  getMedicine(form: FormGroup) {
    return form.get('medicine') as FormArray;
  }

  patientFormValueToString(
    controlName: string | (string | number)[],
    form: FormGroup
  ) {
    return form.get(controlName).value !== null
      ? this.patientForm.get(controlName).value.toString()
      : null;
  }

  patientFormValueToInt(
    controlName: string | (string | number)[],
    form: FormGroup
  ) {
    return form.get(controlName).value !== null
      ? parseInt(this.patientForm.get(controlName).value)
      : null;
  }

//   getBase64(file) {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = () => resolve(reader.result);
//     reader.onerror = error => reject(error);
//   });
// }

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('user'));
    this.patientForm = new FormGroup({
      patientName: new FormControl(
        null,
        Validators.pattern(/^[a-z,',-]+(\s)[a-z,',-]+$/i)
      ),
      age: new FormControl(null, [Validators.min(0), Validators.max(120)]),
      gender: new FormControl(1),
      symptoms: new FormControl(null),
      disease: new FormControl(null),
      chestPainType: new FormControl(1),
      restingBp: new FormControl(null, [
        Validators.min(0),
        Validators.max(500),
      ]),
      cholesterol: new FormControl(null, [
        Validators.min(0),
        Validators.max(1000),
      ]),
      fastingBp: new FormControl(null, [
        Validators.min(0),
        Validators.max(500),
      ]),
      restingEcg: new FormControl(0),
      maxHeartRate: new FormControl(null, [
        Validators.min(0),
        Validators.max(500),
      ]),
      exerciseInducedAngina: new FormControl(0),
      exerciseInducedDepression: new FormControl(null, [
        Validators.min(0),
        Validators.max(500),
      ]),
      slopeOfStSegment: new FormControl(2),
      majorVessels: new FormControl(null),
      thalassemia: new FormControl(null, [
        Validators.min(0),
        Validators.max(10),
      ]),
      confirm: new FormControl(false),
      medicine: this.formBuilder.array([
        this.formBuilder.group({
          medicineName: [''],
          dose: ['', [Validators.min(1), Validators.max(10)]],
          remarks: [''],
        }),
      ]),
    });
  }

  async onSubmit(form: FormGroup) {
    this.loading = true;
    this.patientAttributes = {
      age: this.patientFormValueToInt('age', form),
      gender: this.patientFormValueToInt('gender', form),
      chestPainType: this.patientFormValueToInt('chestPainType', form),
      restingBp: this.patientFormValueToInt('restingBp', form),
      cholesterol: this.patientFormValueToInt('cholesterol', form),
      fastingBp: this.patientFormValueToInt('fastingBp', form),
      restingEcg: this.patientFormValueToInt('restingEcg', form),
      maxHeartRate: this.patientFormValueToInt('maxHeartRate', form),
      exerciseInducedAngina: this.patientFormValueToInt(
        'exerciseInducedAngina',
        form
      ),
      exerciseInducedDepression: this.patientFormValueToInt(
        'exerciseInducedDepression',
        form
      ),
      slopeOfStSegment: this.patientFormValueToInt('slopeOfStSegment', form),
      majorVessels: this.patientFormValueToInt('majorVessels', form),
      thalassemia: this.patientFormValueToInt('thalassemia', form),
    };

    await this.predictionService.predictResult(
      this.patientAttributes,
      (result) => { this.predictionResult = result }
    );

    this.newPatient =
      this.currentUser == null
        ? null
        : {
            doctor_uid: this.currentUser.uid,
            admission_time: Date.now(),
            name: this.patientFormValueToString('patientName', form),
            gender:
              this.patientFormValueToInt('gender', form) == 1
                ? 'male'
                : 'female',
            id: null,
            disease: this.patientFormValueToString('disease', form),
            symptoms: this.patientFormValueToString('symptoms', form),
            prescribedDose: this.getMedicine(form).value,
            attributes: this.patientAttributes,
            attributesArray: Object.values(this.patientAttributes),
            condition: this.predictionResult,
          };
    console.log(this.newPatient);
    this.authService.createPatient(this.newPatient).then((err) => {
      if (err) {
        console.log(err);
      } else {
        this._snackBar.open('Patient Added Successfully', 'Success', {
          duration: 2000,
        });
        this.loading = false;
        this.router.navigate(['/dashboard/patient-list']);
      }
    });
  }
}
