import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import { Oferta } from './shared/oferta.model';
import { Injectable } from '@angular/core';
import { URL_API } from './app.api';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/retry';


@Injectable()
export class OfertasService {

  // private url_api = 'http://localhost:3000/ofertas';

  constructor(private http: Http) {}

  public getOfertas(): Promise<Oferta[]> {
    // efetuar uma requisição http
    return this.http.get(`${URL_API}/ofertas?destaque=true`) // <- retorna um Obervable (Reactive Programming)
      .toPromise() // Convertendo Observable em Promise
      .then((resposta: Response) => resposta.json());
    // retornar uma promise Oferta[]
  }

  public getOfertasPorCategoria(categoria: string): Promise<Oferta[]> {
    return this.http.get(`${URL_API}/ofertas?categoria=${categoria}`)
      .toPromise()
      .then((resposta: Response) => resposta.json());
  }

  public getOfertasPorId(id: number): Promise<Oferta> {
    return this.http.get(`${URL_API}/ofertas?id=${id}`)
    .toPromise()
    .then((resp: Response) => resp.json()[0]);
  }

  public getComoUsarOfertaPorId(id: number): Promise<string> {
    return this.http.get(`${URL_API}/como-usar?id=${id}`)
      .toPromise()
      .then((resp: Response) => resp.json()[0].descricao);
  }

  public getOndeFicaOfertaPorId(id: number): Promise<string> {
    return this.http.get(`${URL_API}/onde-fica?id=${id}`)
      .toPromise()
      .then((resp: Response) => resp.json()[0].descricao);
  }
                                                      // Json-server _like -> Faz uma busca por aproximação
  public pesquisaOfertas(termo: string): Observable<Oferta[]> {
    return this.http.get(`${URL_API}/ofertas?descricao_oferta_like=${termo}`)
        // tentativas de conexão
        .retry(10)
        // Transforma cada elemento da resposta do servidor. Já que ele retorna não um array de Oferta
        // mas um array do tipo response.
        .map((resp: any) => resp.json());
  }
}
