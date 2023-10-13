import { Component } from '@angular/core';

@Component({
  selector: 'app-password-strength',
  templateUrl: './password-strength.component.html',
  styleUrls: ['./password-strength.component.scss']
})
export class PasswordStrengthComponent {
  password: string = '';
  colors: string[] = [];
  hide = true;

  private criteria = {
    minLength: 8,
    containsLetters: /[a-zA-Z]/,
    containsNumbers: /\d/,
    containsSymbols: /[^a-zA-Z\d]/,
  };

  private colorCodes: { [key: string]: string[] } = {
    empty:  ['gray'  , 'gray'  , 'gray'],
    short:  ['red'   , 'red'   , 'red'],
    easy:   ['red'   , 'gray'  , 'gray'],
    medium: ['yellow', 'yellow', 'gray'],
    strong: ['green' , 'green' , 'green'],
  };

  onInput() {
    const strength = this.calculate();
    this.colors = this.colorCodes[strength];
  }

  private calculate() {
    const { minLength, containsLetters, containsNumbers, containsSymbols } = this.criteria;

    if (this.password.length === 0) {
      return 'empty';
    }
    if (this.password.length < minLength) {
      return 'short';
    }

    const hasLetters = containsLetters.test(this.password);
    const hasNumbers = containsNumbers.test(this.password);
    const hasSymbols = containsSymbols.test(this.password);

    if (hasLetters && hasNumbers && hasSymbols) {
      return 'strong';
    }

    if ((hasLetters && hasNumbers) || (hasLetters && hasSymbols) || (hasNumbers && hasSymbols)) {
      return 'medium';
    }

    return 'easy';
  }
}

