import { PredictionService } from './../../services/prediction.service';
import { Component, OnInit, ElementRef } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-prediction',
  templateUrl: './prediction.component.html',
})
export class PredictionComponent implements OnInit {
  constructor(
    public predictionService: PredictionService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.predictionService
      .predictResult([44, 0, 2, 118, 242, 0, 1, 149, 0, 0.3, 1, 1, 2])
      .then((result) => console.log(result));
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {duration: 3000});
  }

  fallbackCopyTextToClipboard(text) {
    var textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.select();
    try {
      var successful = document.execCommand('copy');
      var msg = successful ? 'successful' : 'unsuccessful';
      console.log('Fallback: Copying code was ' + msg);
    } catch (err) {
      console.error('Fallback: Oops, unable to copy code', err);
    }

    document.body.removeChild(textArea);
  }

  copyTextToClipboard(text) {
    if (!navigator.clipboard) {
      this.fallbackCopyTextToClipboard(text);
      return;
    }
    navigator.clipboard.writeText(text).then(
      function () {
        console.log('Async: Copying code to clipboard was successful!');
      },
      function (err) {
        console.error('Async: Could not copy code: ', err);
      }
    );
  }

  copyCode(el) {
    let code = '';

    el.childNodes.forEach((node) => {
      if (node.innerText !== undefined) code += node.innerText + '\n';

    });
    this.copyTextToClipboard(code);
    this.openSnackBar('Copied to clipboard', 'Success!');
    console.log(code);
  }
}
