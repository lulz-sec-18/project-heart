import { Component, OnInit } from '@angular/core';
import * as tfjs from '@tensorflow/tfjs';
import * as tfvis from '@tensorflow/tfjs-vis';


@Component({
  selector: 'train-online',
  templateUrl: 'train-online.component.html'
})
export class TrainOnlineComponent implements OnInit {
  normalisedLabel;
  trainingFeatureTensor: any;
  testingFeatureTensor: any;
  trainingLabelTensor: any;
  testingLabelTensor: any;
  normalisedFeature: any;
  predictedPoints: string[];
  model;
  min: any;
  storageID: string = 'kc-house-price-regression';
  outputValueRounded;
  houseSalesDataset: tfjs.data.CSVDataset;
  csvUrl = 'https://storage.googleapis.com/tfjs-examples/multivariate-linear-regression/data/boston-housing-train.csv';

  constructor() {}

  ngOnInit() {

  this.run().then(() => console.log('Done'));

  }


async run() {
  // We want to predict the column "medv", which represents a median value of a
  // home (in $1000s), so we mark it as a label.
  const csvDataset = tfjs.data.csv(
    this.csvUrl, {
      columnConfigs: {
        medv: {
          isLabel: true
        }
      }
    });
  // Number of features is the number of column names minus one for the label
  // column.
  const numOfFeatures = (await csvDataset.columnNames()).length - 1;
    console.log(numOfFeatures);
  // Prepare the Dataset for training.
  const flattenedDataset =
    csvDataset
    .map((val: any) => {
      const {xs, ys} = val // can cast xs and ys to appropriate type
      // for instance it can be const {xs, ys} = val as {xs: Object, ys: Object}
      console.log(val);
       return {xs:Object.keys(xs), ys:Object.keys(ys)};
    })
    .batch(10);
  console.log(flattenedDataset);
  // Define the model.
  const model = tfjs.sequential();
  model.add(tfjs.layers.dense({
    inputShape: [4,4],
    units: 1
  }));
  model.compile({
    optimizer: tfjs.train.sgd(0.000001),
    loss: 'meanSquaredError'
  });
  console.log('dfhj');
  // Fit the model using the prepared Dataset
  return model.fitDataset(flattenedDataset, {
    epochs: 10,
    callbacks: {
      onEpochEnd: async (epoch, logs) => {
        console.log(epoch, logs.loss);
      }
    }
  });
}


  async someFunction() {
    const houseSalesDataset = tfjs.data.csv('http://127.0.0.1:8080/kc_house_data.csv');
    const sampleDataSet = houseSalesDataset.take(10);
    console.log('hdbfhjgd');
    const dataArray = await sampleDataSet.toArray();
    console.log(dataArray);
  }

  async plot(pointsArray, featureName, predictedPointsArray?: string[] | null) {
    const values = [pointsArray.slice(0, 1000)];
    const series = ["original"];
    if (Array.isArray(predictedPointsArray)) {
      values.push(predictedPointsArray);
      series.push("predicted");
    }

    tfvis.render.scatterplot(
      { name: `${featureName} vs House Price` },
      { values, series },
      {
        xLabel: featureName,
        yLabel: "Price",
        height: 300,
      }
    )
  }

  async plotPredictionLine() {
    const [xs, ys] = tfjs.tidy(() => {
      const normalisedXs = tfjs.linspace(0, 1, 100);
      const normalisedYs = this.model.predict(normalisedXs.reshape([100, 1]));

      const xs = this.denormalise(normalisedXs, this.normalisedFeature.min, this.max);
      const ys = this.denormalise(normalisedYs, this.normalisedLabel.min, this.normalisedLabel.max);

      return [ xs.dataSync(), ys.dataSync() ];
    });

    const predictedPoints = Array.from(xs).map((val, index) => {
      return { x: val, y: ys[index] };
    });

    // await this.plot(this.points, "Square feet", predictedPoints);
  }

  max(normalisedXs: tfjs.Tensor1D, min: any, max: any) {
    throw new Error('Method not implemented.');
  }

  normalise(tensor, previousMin = null, previousMax = null) {
    const min = previousMin || tensor.min();
    const max = previousMax || tensor.max();
    const normalisedTensor = tensor.sub(min).div(max.sub(min));
    return {
      tensor: normalisedTensor,
      min,
      max
    };
  }

  denormalise(tensor, min, max) {
    const denormalisedTensor = tensor.mul(max.sub(min)).add(min);
    return denormalisedTensor;
  }

  createModel() {
    this.model = tfjs.sequential();

    this.model.add(tfjs.layers.dense({
      units: 1,
      useBias: true,
      activation: 'linear',
      inputDim: 1,
    }));

    const optimizer = tfjs.train.sgd(0.1);
    this.model.compile({
      loss: 'meanSquaredError',
      optimizer,
    });

    return this.model;
  }

  trainModel (model, trainingFeatureTensor, trainingLabelTensor) {

    const { onBatchEnd, onEpochEnd } = tfvis.show.fitCallbacks(
      { name: "Training Performance" },
      ['loss']
    )

    return model.fit(trainingFeatureTensor, trainingLabelTensor, {
      batchSize: 32,
      epochs: 20,
      validationSplit: 0.2,
      callbacks: {
        onEpochEnd,
        onEpochBegin: async function () {
          await this.plotPredictionLine();
          const layer = model.getLayer(undefined, 0);
          tfvis.show.layer({ name: "Layer 1" }, layer);
        }
      }
    });
  }

  async predict() {
    const predictionInput = parseInt(document.querySelector<HTMLInputElement>('prediction-input').value);
    if (isNaN(predictionInput)) {
      alert("Please enter a valid number");
    }
    else if (predictionInput < 200) {
      alert("Please enter a value above 200 sqft");
    }
    else {
      tfjs.tidy(() => {
        const inputTensor = tfjs.tensor1d([predictionInput]);
        const normalisedInput = this.normalise(inputTensor, this.min, this.max);
        const normalisedOutputTensor = this.model.predict(normalisedInput.tensor);
        const outputTensor = this.denormalise(normalisedOutputTensor, this.normalisedLabel.min, this.normalisedLabel.max);
        const outputValue = outputTensor.dataSync()[0];
        const stubVar = (outputValue/1000);
        const stubVar2 = stubVar.toFixed(0);
        this.outputValueRounded = +(stubVar2)*1000;
        document.getElementById("prediction-output").innerHTML = `The predicted house price is <br>`
          + `<span style="font-size: 2em">\$${this.outputValueRounded}</span>`;
      });
    }
  }

  async save () {
    const saveResults = await this.model.save(`localstorage://${this.storageID}`);
    document.getElementById("model-status").innerHTML = `Trained (saved ${saveResults.modelArtifactsInfo.dateSaved})`;
  }

  async load() {
    const storageKey = `localstorage://${this.storageID}`;
    const models = await tfjs.io.listModels();
    const modelInfo = models[storageKey];
    if (modelInfo) {
      this.model = await tfjs.loadLayersModel(storageKey);

      tfvis.show.modelSummary({ name: "Model summary" }, this.model);
      const layer = this.model.getLayer(undefined, 0);
      tfvis.show.layer({ name: "Layer 1" }, layer);

      await this.plotPredictionLine();

      document.getElementById("model-status").innerHTML = `Trained (saved ${modelInfo.dateSaved})`;
      document.getElementById("predict-button").removeAttribute("disabled");
    }
    else {
      alert("Could not load: no saved model found");
    }
  }

  async test () {
    const lossTensor = this.model.evaluate(this.testingFeatureTensor, this.testingLabelTensor);
    const loss = (await lossTensor.dataSync())[0];
    console.log(`Testing set loss: ${loss}`);

    document.getElementById("testing-status").innerHTML = `Testing set loss: ${loss.toPrecision(5)}`;
  }

  async train () {
    // Disable all buttons and update status
    ["train", "test", "load", "predict", "save"].forEach(id => {
      document.getElementById(`${id}-button`).setAttribute("disabled", "disabled");
    });
    document.getElementById("model-status").innerHTML = "Training...";

    const model = this.createModel();
    tfvis.show.modelSummary({ name: "Model summary" }, model);
    const layer = model.getLayer(undefined, 0);
    tfvis.show.layer({ name: "Layer 1" }, layer);
    await this.plotPredictionLine();

    const result = await this.trainModel(model, this.trainingFeatureTensor, this.trainingLabelTensor);
    console.log(result);
    const trainingLoss = result.history.loss.pop();
    console.log(`Training set loss: ${trainingLoss}`);
    const validationLoss = result.history.val_loss.pop();
    console.log(`Validation set loss: ${validationLoss}`);

    document.getElementById("model-status").innerHTML = "Trained (unsaved)\n"
      + `Loss: ${trainingLoss.toPrecision(5)}\n`
      + `Validation loss: ${validationLoss.toPrecision(5)}`;
    document.getElementById("test-button").removeAttribute("disabled");
    document.getElementById("save-button").removeAttribute("disabled");
    document.getElementById("predict-button").removeAttribute("disabled");
  }

  async plotParams(weight, bias) {
    this.model.getLayer(null, 0).setWeights([
      tfjs.tensor2d([[weight]]), // Kernel (input multiplier)
      tfjs.tensor1d([bias]), // Bias
    ])
    await this.plotPredictionLine();
    const layer = this.model.getLayer(undefined, 0);
    tfvis.show.layer({ name: "Layer 1" }, layer);
  }

  async toggleVisor () {
    tfvis.visor().toggle();
  }

  // async run () {
  //   // Import from CSV
  //   this.houseSalesDataset = tfjs.data.csv('../kc_house_data.csv');
  //   // Extract x and y values to plot
  //   const pointsDataset = this.houseSalesDataset.map((record) => {
  //     x: record.sqft_living;
  //     y: record.price;
  //   });
  //   let points = await pointsDataset.toArray();
  //   if(points.length % 2 !== 0) { // If odd number of elements
  //     points.pop(); // remove one element
  //   }
  //   tfjs.util.shuffle(points);
  //   this.plot(points, "Square feet");

  //   // Extract Features (inputs)
  //   const featureValues = points.map(p => p.x);
  //   const featureTensor = tfjs.tensor2d(featureValues, [featureValues.length, 1]);

  //   // Extract Labels (outputs)
  //   const labelValues = points.map(p => p.y);
  //   const labelTensor = tfjs.tensor2d(labelValues, [labelValues.length, 1]);

  //   // Normalise features and labels
  //   this.normalisedFeature = this.normalise(featureTensor);
  //   this.normalisedLabel = this.normalise(labelTensor);
  //   featureTensor.dispose();
  //   labelTensor.dispose();

  //   [this.trainingFeatureTensor, this.testingFeatureTensor] = tfjs.split(this.normalisedFeature.tensor, 2);
  //   [this.trainingLabelTensor, this.testingLabelTensor] = tfjs.split(this.normalisedLabel.tensor, 2);

  //   // Update status and enable train button
  //   document.getElementById("model-status").innerHTML = "No model trained";
  //   document.getElementById("train-button").removeAttribute("disabled");
  //   document.getElementById("load-button").removeAttribute("disabled");
  // }
}
