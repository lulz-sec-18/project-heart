import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Patient } from '../../../models/patient.model';
import { AuthService } from 'src/app/services/auth.service';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { PatientAttributes } from '../../../models/patient-attributes.model';
import { User } from '../../../models/user.model';
import { PredictionService } from 'src/app/services/prediction.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  editablePatient!: Patient;
  currentUser!: User;
  predictionResult: number;

  constructor(
    private route: ActivatedRoute,
    public authService: AuthService,
    public predictionService: PredictionService,
    private fb: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  getMedicine(form: FormGroup) {
    return form.get('medicine') as FormArray;
  }

  get medicine() {
    return this.patientForm.get('medicine') as FormArray;
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

  addMedicine() {
    this.medicine.push(
      this.fb.group({
        medicineName: [''],
        dose: ['', [Validators.min(1), Validators.max(10)]],
        remarks: [''],
      })
    );
  }

  ngOnInit(): void {
    (async () => {
      this.currentUser = JSON.parse(localStorage.getItem('user'));
      this.route.params.subscribe((params) => {
        this.editablePatientId = params['id'];
        console.log(this.editablePatientId);
        console.log('params Subscribed');
      });

      this.authService.patients.subscribe(async (patients) => {
        this.patient = patients.find((patient) => {
          return patient.id == this.editablePatientId;
        });
        console.log(this.patient);
        console.log('patient Subscribed');
        this.patientForm = await new FormGroup({
          patientName: new FormControl(
            this.patient.name,
            Validators.pattern(/^[a-z,',-]+(\s)[a-z,',-]+$/i)
          ),
          age: new FormControl(this.patient.attributes.age),
          gender: new FormControl(this.patient.gender == 'male' ? 1 : 0),
          symptoms: new FormControl(this.patient.symptoms),
          disease: new FormControl(this.patient.disease),
          chestPainType: new FormControl(this.patient.attributes.chestPainType),
          restingBp: new FormControl(this.patient.attributes.restingBp),
          cholesterol: new FormControl(this.patient.attributes.cholesterol),
          fastingBp: new FormControl(this.patient.attributes.fastingBp),
          restingEcg: new FormControl(this.patient.attributes.restingEcg),
          maxHeartRate: new FormControl(this.patient.attributes.maxHeartRate),
          exerciseInducedAngina: new FormControl(
            this.patient.attributes.exerciseInducedAngina
          ),
          exerciseInducedDepression: new FormControl(
            this.patient.attributes.exerciseInducedDepression
          ),
          slopeOfStSegment: new FormControl(
            this.patient.attributes.slopeOfStSegment
          ),
          majorVessels: new FormControl(this.patient.attributes.majorVessels),
          thalassemia: new FormControl(this.patient.attributes.thalassemia),
          confirm: new FormControl(false),
          medicine: this.fb.array([]),
        });

        this.patient.prescribedDose.forEach((med) => {
          this.medicine.push(
            this.fb.group({
              medicineName: [med.medicineName],
              dose: [med.dose, [Validators.min(1), Validators.max(10)]],
              remarks: [med.remarks],
            })
          );
        });
        console.log(this.patientForm.value);
      });
    })();
  }

  async onSubmit() {
    this.patientAttributes = {
      age: this.patientFormValueToInt('age', this.patientForm),
      gender: this.patientFormValueToInt('gender', this.patientForm),
      chestPainType: this.patientFormValueToInt(
        'chestPainType',
        this.patientForm
      ),
      restingBp: this.patientFormValueToInt('restingBp', this.patientForm),
      cholesterol: this.patientFormValueToInt('cholesterol', this.patientForm),
      fastingBp: this.patientFormValueToInt('fastingBp', this.patientForm),
      restingEcg: this.patientFormValueToInt('restingEcg', this.patientForm),
      maxHeartRate: this.patientFormValueToInt(
        'maxHeartRate',
        this.patientForm
      ),
      exerciseInducedAngina: this.patientFormValueToInt(
        'exerciseInducedAngina',
        this.patientForm
      ),
      exerciseInducedDepression: this.patientFormValueToInt(
        'exerciseInducedDepression',
        this.patientForm
      ),
      slopeOfStSegment: this.patientFormValueToInt(
        'slopeOfStSegment',
        this.patientForm
      ),
      majorVessels: this.patientFormValueToInt(
        'majorVessels',
        this.patientForm
      ),
      thalassemia: this.patientFormValueToInt('thalassemia', this.patientForm),
    };

    await this.predictionService.predictResult(
      this.patientAttributes,
      (result) => (this.predictionResult = result[0])
    );

    console.log(this.getMedicine(this.patientForm).value);
    this.editablePatient =
      this.currentUser == null
        ? null
        : {
            doctor_uid: this.currentUser.uid,
            admission_time: Date.now(),
            name: this.patientFormValueToString(
              'patientName',
              this.patientForm
            ),
            gender:
              this.patientFormValueToInt('gender', this.patientForm) == 1
                ? 'male'
                : 'female',
            id: this.patient.id,
            condition: this.predictionResult,
            disease: this.patientFormValueToString('disease', this.patientForm),
            symptoms: this.patientFormValueToString(
              'symptoms',
              this.patientForm
            ), //?.split(",", 2),
            prescribedDose: this.getMedicine(this.patientForm).value,
            attributes: this.patientAttributes,
            attributesArray: Object.values(this.patientAttributes),
          };
    this.authService.updatePatient(this.editablePatient).then((err) => {
      if (err) {
        console.log(err);
      } else {
        this._snackBar.open('Patient Updated Successfully', 'Success', {
          duration: 2000,
        });
        this.router.navigate(['/dashboard/patient-list']);
      }
    });
  }
}
