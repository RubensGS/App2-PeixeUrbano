import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { OfertasService } from '../../ofertas.service';

@Component({
  selector: 'app-onde-fica',
  templateUrl: './onde-fica.component.html',
  styleUrls: ['./onde-fica.component.css'],
  providers: [ OfertasService ]
})
export class OndeFicaComponent implements OnInit {

  // tslint:disable-next-line:no-inferrable-types
  public ondeFica: string = '';

  constructor(private route: ActivatedRoute, private ofertasService: OfertasService) { }

  ngOnInit() {
    this.route.parent.params.subscribe((params: Params) => {
      this.ofertasService.getOndeFicaOfertaPorId(params.id)
        .then((resp: string) => this.ondeFica = resp);
    });

  }
}
