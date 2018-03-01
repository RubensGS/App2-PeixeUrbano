import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
    // tslint:disable-next-line:no-unused-expression
    this.ofertasService.getComoUsarOfertaPorId(this.route.parent.snapshot.params['id'])
      .then((resp: string) => this.comoUsar = resp);
  }

}
