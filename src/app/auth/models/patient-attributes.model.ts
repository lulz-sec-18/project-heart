export class PatientAttributes{
  age:number
  gender:number
  chestPain:number
  restingBp:number
  cholesterol:number
  fastingBp:number
  restingEcg:number
  maxHeartRate:number
  exerciseInducedAngina:number
  exerciseInducedDepression:number
  slopeOfStSegment:number
  majorVessels:number
  thalassemia:number
  constructor(age:number,
              gender:number,
              chestPain:number,
              restingBp:number,
              cholestrol:number,
              fastingBp:number,
              restingEcg:number,
              maxHeartRate:number,
              exerciseInducedAngina:number,
              exerciseInducedDepression:number,
              slopeOfStSegment:number,
              majorVessels:number,
              thalassemia:number
              ) {
    this.age = age;
    this.gender = gender;
    this.chestPain = chestPain;
    this.restingBp = restingBp;
    this.cholesterol = cholestrol;
    this.fastingBp = fastingBp;
    this.restingEcg = restingEcg;
    this.maxHeartRate = maxHeartRate;
    this.exerciseInducedAngina = exerciseInducedAngina;
    this.exerciseInducedDepression = exerciseInducedDepression;
    this.slopeOfStSegment = slopeOfStSegment;
    this.majorVessels = majorVessels;
    this.thalassemia = thalassemia;
  }
  get PatientDataArray(){
    return new Array([
      this.age,
      this.gender,
      this.chestPain,
      this.restingBp,
      this.cholesterol,
      this.fastingBp,
      this.restingEcg,
      this.maxHeartRate,
      this.exerciseInducedAngina,
      this.exerciseInducedDepression,
      this.slopeOfStSegment,
      this.majorVessels,
      this.thalassemia
    ])
  }
}
