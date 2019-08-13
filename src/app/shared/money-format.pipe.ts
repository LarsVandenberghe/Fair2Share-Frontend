import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'moneyFormat'
})
export class MoneyFormatPipe implements PipeTransform {

  transform(value: number, valuta?: number): string {
    let valSymbol = '';
    if (valuta === 0){
      valSymbol =  `€`;
    } else if (valuta === 1){
      valSymbol = `$`;
    } else if (valuta === 2){
      valSymbol = `£`;
    }
    return valSymbol + ` ${Number(value).toFixed(2)}`;
  }

}
