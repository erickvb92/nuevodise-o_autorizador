import { Component, Input} from '@angular/core';

@Component({
  selector: 'app-submenu',
  templateUrl: './submenu.component.html',
  styleUrls: ['./submenu.component.css']
})
export class SubmenuComponent {

  constructor() { }

  @Input() modulo: string = '';

  mapMenu = new Map();

  hidenMenu() {
    this.mapMenu.set('dsp', false);
    this.mapMenu.set('adm', false);
    this.mapMenu.set('dat', false);
    this.mapMenu.set('mon', false);
    this.mapMenu.set('sat', false);
    this.mapMenu.set('tto', false);
    this.mapMenu.set('mtto', false);
  }

  ngOnChanges() {
    this.hidenMenu();
    this.mapMenu.set(this.modulo, true);
  }

}
