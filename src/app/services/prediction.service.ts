import { Injectable } from '@angular/core';
import * as tf from '@tensorflow/tfjs';

@Injectable({
  providedIn: 'root',
})
export class PredictionService {
  model;
  dataLength = 13;

  constructor() {}

  async predictResult(data: number[]): Promise<number | number[]> {
    this.model = await tf.loadLayersModel('../assets/web/model.json');
    if (data.length === this.dataLength) {
      const prediction = this.model.predict(tf.tensor2d(data, [1, this.dataLength]))
      const values = prediction.dataSync();
      return Array.from(values);
    }
    else {
      return -1
    }
  }
}
