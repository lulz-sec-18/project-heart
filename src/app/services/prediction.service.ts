import { PatientAttributes } from './../models/patient-attributes.model';
import { Injectable } from '@angular/core';
import * as tf from '@tensorflow/tfjs';


@Injectable({
  providedIn: 'root',
})
export class PredictionService {
  model;
  dataLength = 13;
  constructor() {}

  async predictResult(patientData:PatientAttributes,callBack) {
    this.model = await tf.loadLayersModel('../assets/web/trial-models/model.json');
    let data = Object.values(patientData);
    const dataTensor = tf.tensor2d(data, [1, data.length])
    if (data.length === this.dataLength && !data.some(el=>el == null)){
      const prediction = this.model.predict(dataTensor);
      const values = prediction.dataSync();
      callBack(Array.from(values)[0]);
    } else {
      callBack(999);
    }
  }
}
