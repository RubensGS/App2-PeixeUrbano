import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OfertasService } from '../ofertas.service';
import { Oferta } from '../shared/oferta.model';

@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.component.html',
  styleUrls: ['./oferta.component.css'],
  providers: [ OfertasService ]
})
export class OfertaComponent implements OnInit {

  public oferta: Oferta;

  constructor(private route: ActivatedRoute,
              private ofertasService: OfertasService) { }

  ngOnInit() {
    // Pegando parametro da rota ativa usando snapshot
    this.ofertasService.getOfertasPorId(this.route.snapshot.params['id'])
      .then((oferta: Oferta) => this.oferta = oferta);

    /*
        fica "escutando" alterações na rota. Quando uma alteração é "escutada"
        podemos reagir a mudança (reactive programming)
    */
    // this.route.params.subscribe((parametro: any) => {
    //   console.log(parametro.id);
    // });
  }

}
