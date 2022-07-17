import { Component, Input } from '@angular/core';
import { MenuService } from '../../menu.service';


@Component({
  selector: 'app-menu-adm',
  templateUrl: './menu-adm.component.html',
  styleUrls: ['./menu-adm.component.css']
})
export class MenuAdmComponent {

  constructor(private service: MenuService) { }
  @Input() cargainicial: string = '';
  menuParam: boolean = this.service.menuParam;
  menuCatalogos: boolean = this.service.menuCatalogos;

  lineMenu(event: Event, menu: string) {
    this.service.lineMenu(event, menu);
    this.menuParam = this.service.menuParam;
    this.menuCatalogos = this.service.menuCatalogos;
  }

  lineSubMenu(event: Event) {
    this.service.lineSubMenu(event);
  }

  ngOnChanges() {
    this.menuParam = this.service.menuParam;
    this.menuCatalogos = this.service.menuCatalogos;
  }

}
