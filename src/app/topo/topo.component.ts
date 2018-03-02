import { Component, OnInit } from '@angular/core';
import { OfertasService } from '../ofertas.service';


@Component({
  selector: 'app-topo',
  templateUrl: './topo.component.html',
  styleUrls: ['./topo.component.css'],
  providers: [ OfertasService ]
})
export class TopoComponent implements OnInit {

  constructor(private ofertasService: OfertasService) { }

  ngOnInit() {
  }

  // Usando o pesquisa($event) no HTML
  // public pesquisa(event: Event): void {
  //   console.log((<HTMLInputElement>event.target).value);
  // }

  // Usando variável de referência no HTML #termoDaPesquisa -> Aproach de atributo de referência
  public pesquisa(termoDaBusca: string): void {


  }

}
