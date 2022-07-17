import { Component} from '@angular/core';
import { MenuService } from '../../menu.service';

@Component({
  selector: 'app-menu-mantenimiento',
  templateUrl: './menu-mantenimiento.component.html',
  styleUrls: ['./menu-mantenimiento.component.css']
})
export class MenuMantenimientoComponent {

  constructor(private service: MenuService) { }

  lineMenu(event: Event, menu: string) {
    this.service.lineMenu(event, menu);
  }


}
 