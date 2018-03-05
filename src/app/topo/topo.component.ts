import { Oferta } from '../shared/oferta.model';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import { OfertasService } from '../ofertas.service';
import { Subject } from 'rxjs/Subject';

import '../util/rxjs-extensions';

@Component({
  selector: 'app-topo',
  templateUrl: './topo.component.html',
  styleUrls: ['./topo.component.css'],
  providers: [ OfertasService ]
})
export class TopoComponent implements OnInit {

  public ofertas: Observable<Oferta[]>;
  private subjectPesquisa: Subject<string> = new Subject<string>();

  constructor(private ofertasService: OfertasService) { }

  ngOnInit() {
    // controlando o disparo dos Observables com outro Observable
    this.ofertas = this.subjectPesquisa
      .debounceTime(1000) // executa a ação do switchMap após 1 segundo
      .distinctUntilChanged() // não faz requisição por termos repetidos
      .switchMap((termo: string) => {
          if  (termo.trim() === '') {
            // retornar um obervable de array de ofertas vazio
            return Observable.of<Oferta[]>([]); // Tipando Observable
          }
          return this.ofertasService.pesquisaOfertas(termo);
      })
      .catch((erro: any) => {
        console.log(erro);
        return Observable.of<Oferta[]>([]);
      });
  }

  // Usando o pesquisa($event) no HTML
  // public pesquisa(event: Event): void {
  //   console.log((<HTMLInputElement>event.target).value);
  // }

  // Usando variável de referência no HTML #termoDaPesquisa -> Aproach de atributo de referência
  public pesquisa(termoDaBusca: string): void {
    this.subjectPesquisa.next(termoDaBusca);
  }

  public limpaPesquisa(): void {
    this.subjectPesquisa.next('');
  }

}
