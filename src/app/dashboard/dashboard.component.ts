import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { PredictionService } from '../services/prediction.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(public predictor: PredictionService,public authService:AuthService) {}

  ngOnInit(): void {
     this.authService.firestoreInit()

    //testing purpose
    this.predictor
      .predictResult([44, 1, 2, 140, 235, 0, 0, 180, 0, 0, 2, 0, 2])
      .then((value) => console.log(value[0] > 0.5));
  }
}
