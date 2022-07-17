import { Component } from '@angular/core';
import { MenuService } from '../../menu.service';

@Component({
  selector: 'app-menu-monitor',
  templateUrl: './menu-monitor.component.html',
  styleUrls: ['./menu-monitor.component.css']
})
export class MenuMonitorComponent {

  constructor(private service: MenuService) { }

  lineMenu(event: Event, menu: string) {
    this.service.lineMenu(event, menu);
  }

}
