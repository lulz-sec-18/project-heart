import { PredictionService } from './../../services/prediction.service';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-prediction',
  templateUrl: './prediction.component.html',
})
export class PredictionComponent {
  constructor(
    public predictionService: PredictionService,
    private _snackBar: MatSnackBar
  ) {}

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {duration: 3000});
  }

  fallbackCopyTextToClipboard(text: string) {
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

  copyTextToClipboard(text: string) {
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

  copyCode(el: { childNodes: any[]; }) {
    let code = '';

    el.childNodes.forEach((node) => {
      if (node.innerText !== undefined) code += node.innerText + '\n';

    });
    this.copyTextToClipboard(code);
    this.openSnackBar('Copied to clipboard', 'Success!');
    console.log(code);
  }
}
