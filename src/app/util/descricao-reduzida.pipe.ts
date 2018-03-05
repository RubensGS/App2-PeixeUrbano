import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'descricaoReduzida'
})
export class DescricaoReduzidaPipe implements PipeTransform {

  transform(texto: string, truncarEm: number): string {
      if (texto.length > 15) {
        return texto.substr(0, truncarEm) + '... ';
      }
      return texto;
  }

}
