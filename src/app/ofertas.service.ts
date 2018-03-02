import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import { Oferta } from './shared/oferta.model';
import { Injectable } from '@angular/core';
import { URL_API } from './app.api';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';


@Injectable()
export class OfertasService {

  // private url_api = 'http://localhost:3000/ofertas';

  constructor(private http: Http) {}

  public getOfertas(): Promise<Oferta[]> {
    // efetuar uma requisição http
    return this.http.get(`${URL_API}/ofertas?destaque=true`) // <- retorna um Obervable (Reactive Programming)
      .toPromise() // Convertendo Observable em Promise
      .then((resposta: any) => resposta.json());
    // retornar uma promise Oferta[]
  }

  public getOfertasPorCategoria(categoria: string): Promise<Oferta[]> {
    return this.http.get(`${URL_API}/ofertas?categoria=${categoria}`)
      .toPromise()
      .then((resposta: any) => resposta.json());
  }

  public getOfertasPorId(id: number): Promise<Oferta> {
    return this.http.get(`${URL_API}/ofertas?id=${id}`)
    .toPromise()
    .then((resp: any) => resp.json()[0]);
  }

  public getComoUsarOfertaPorId(id: number): Promise<string> {
    return this.http.get(`${URL_API}/como-usar?id=${id}`)
      .toPromise()
      .then((resp: any) => resp.json()[0].descricao);
  }

  public getOndeFicaOfertaPorId(id: number): Promise<string> {
    return this.http.get(`${URL_API}/onde-fica?id=${id}`)
      .toPromise()
      .then((resp: any) => resp.json()[0].descricao);
  }

  public pesquisaOfertas(termo: string): Observable<Oferta[]> {
    return this.http.get(`${URL_API}/ofertas?descricao_oferta=${termo}`)
        // Transforma cada elemento da resposta do servidor. Já que ele retorna não um array de Oferta
        // mas um array do tipo response.
        .map((resp: any) => resp.json());
  }
}
