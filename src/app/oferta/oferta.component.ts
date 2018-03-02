import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OfertasService } from '../ofertas.service';
import { Oferta } from '../shared/oferta.model';
import { Observable } from 'rxjs/Observable';
// tslint:disable-next-line:import-blacklist
import 'rxjs/Rx';
import { Observer } from 'rxjs/Observer';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.component.html',
  styleUrls: ['./oferta.component.css'],
  providers: [ OfertasService ]
})
export class OfertaComponent implements OnInit, OnDestroy {

  public tempoObservableSubscription: Subscription;
  public meuObservableTesteSubscription: Subscription;

  public oferta: Oferta;

  constructor(private route: ActivatedRoute,
              private ofertasService: OfertasService) { }

  ngOnInit() {
    // Pegando parametro da rota ativa usando snapshot
    this.ofertasService.getOfertasPorId(this.route.snapshot.params['id'])
      .then((oferta: Oferta) => this.oferta = oferta);

    // this.route.params.subscribe((param: any) => console.log(param),
    //                             (erro: any) => console.log(erro),
    //                             () => console.log('Processamento classificado como concluído'));

    /*
        fica "escutando" alterações na rota. Quando uma alteração é "escutada"
        podemos reagir a mudança (reactive programming)
    */
    // this.route.params.subscribe((parametro: any) => {
    //   console.log(parametro.id);
    // });

    // tslint:disable-next-line:prefer-const
    let tempo = Observable.interval(2000);

    this.tempoObservableSubscription = tempo.subscribe((intervalo: number) => console.log(intervalo));

    // observable (observável)
    // tslint:disable-next-line:prefer-const
    let meuObservableteste = Observable.create((observer: Observer<number>) => {
      observer.next(1);
      observer.next(2);
      observer.complete();
      observer.error('Algum erro foi encontrado na stream de eventos');
    });

    // observable (observador)
    this.meuObservableTesteSubscription = meuObservableteste.subscribe(
      // tratar fluxo de dados
      (resp) => console.log(resp),
      // tratar erros
      (erro) => console.log(erro),
      // tratar finalização da stream
      () => console.log('Stream foi finalizada')
      );
  }

  ngOnDestroy() {
    this.meuObservableTesteSubscription.unsubscribe();
    this.tempoObservableSubscription.unsubscribe();
  }

}
