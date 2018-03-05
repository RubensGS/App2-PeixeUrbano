import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { OfertasService } from '../../ofertas.service';

@Component({
  selector: 'app-como-usar',
  templateUrl: './como-usar.component.html',
  styleUrls: ['./como-usar.component.css'],
  providers: [ OfertasService ]
})
export class ComoUsarComponent implements OnInit {

  // tslint:disable-next-line:no-inferrable-types
  public comoUsar: string = '';

  constructor(private route: ActivatedRoute, private ofertasService: OfertasService) { }

  ngOnInit() {
    this.route.parent.params.subscribe((params: Params ) => {
      // tslint:disable-next-line:no-unused-expression
      this.ofertasService.getComoUsarOfertaPorId(params.id)
        .then((resp: string) => this.comoUsar = resp);
    });
  }

}
