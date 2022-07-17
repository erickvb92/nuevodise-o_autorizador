import { Component, ElementRef, ViewChild } from '@angular/core';
import { MenuService } from '../../menu.service';

@Component({
  selector: 'app-menu-sat',
  templateUrl: './menu-sat.component.html',
  styleUrls: ['./menu-sat.component.css']
})
export class MenuSatComponent {

  constructor(private service: MenuService) { }

  @ViewChild('cargaCatalogos') cargacatalogos!: ElementRef<HTMLElement>;

  lineMenu(event: Event, menu: string) {

    console.log(this.cargacatalogos.nativeElement.getAttribute('activa'));
    this.service.lineMenu(event,menu);
  }

}
