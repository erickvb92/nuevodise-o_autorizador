import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../menu.service';

@Component({
  selector: 'app-menu-dat',
  templateUrl: './menu-dat.component.html',
  styleUrls: ['./menu-dat.component.css']
})
export class MenuDatComponent implements OnInit {

  ngOnInit(): void { }

  constructor(private service: MenuService) { }

  lineMenu(event: Event, menu: string) {
    this.service.lineMenu(event, menu);
  }


}
