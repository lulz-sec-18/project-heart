import { Injectable } from '@angular/core';
import * as tf from '@tensorflow/tfjs';

@Injectable({
  providedIn: 'root',
})
export class PredictionService {
  model;
  dataLength = 13;
  constructor() {}

  async predictResult(data: number[]) {
    this.model = await tf.loadLayersModel('../assets/web/trial-models/model.json');
    const dataTensor = tf.tensor2d(data, [1, data.length])
    if (data.length === this.dataLength) {
      const prediction = this.model.predict(dataTensor);
      const values = prediction.dataSync();
      console.log(this.model);
      return Array.from(values);
    } else {
      return -1;
    }
  }
}
