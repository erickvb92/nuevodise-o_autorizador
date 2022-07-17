import { Component } from '@angular/core';
import { MenuService } from '../../menu.service';

@Component({
  selector: 'app-menu-tratamiento',
  templateUrl: './menu-tratamiento.component.html',
  styleUrls: ['./menu-tratamiento.component.css']
})
export class MenuTratamientoComponent {

  constructor(private service: MenuService) { }

  lineMenu(event: Event, menu: string) {
    this.service.lineMenu(event,menu);
  }



}
