import { Component, Renderer2, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MenuService } from './menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private renderer: Renderer2,
    private service: MenuService) { }
  
  ngOnInit(): void {
    this.hidenMenu();
    this.isDarkTheme = this.service.isDarkTheme;
  }
  modulo: string = '';

  mapMenu = new Map();

  onNavigate(feature: string) {

  }

  isMenuOpen: boolean = true;
  contentMargin: number = 240;
  user: string = 'Arturo';
  notification: number = 5;

  onToolbarMenuToggle() {

    this.isMenuOpen = !this.isMenuOpen;

    if (!this.isMenuOpen) {
      this.contentMargin = 70;
      this.mapMenu.set('lbl-cerrar', false);
    } else {
      this.contentMargin = 240;
      this.mapMenu.set('lbl-cerrar', true);
    }

  }

  hidenMenu() {
    this.mapMenu.set('spn-dsp', false);
    this.mapMenu.set('img-dsp', true);
    this.mapMenu.set('spn-adm', false);
    this.mapMenu.set('img-adm', true);
    this.mapMenu.set('spn-dat', false);
    this.mapMenu.set('img-dat', true);
    this.mapMenu.set('spn-mon', false);
    this.mapMenu.set('img-mon', true);
    this.mapMenu.set('spn-sat', false);
    this.mapMenu.set('img-sat', true);
    this.mapMenu.set('spn-tto', false);
    this.mapMenu.set('img-tto', true);
    this.mapMenu.set('spn-mtto', false);
    this.mapMenu.set('img-mtto', true);
    this.mapMenu.set('lbl-cerrar', true);
  }

  changeImg(mod: string) {
    this.hidenMenu();
    this.mapMenu.set('spn-' + mod, true);
    this.mapMenu.set('img-' + mod, false);
    this.service.ngOnChanges();
    this.modulo = mod;
  }

  toggleDarkTheme(checked: boolean) {
    this.service.setDarkTheme(checked);
    this.renderer.setAttribute(document.body, 'class', checked ? 'sntdr-dark-theme' : 'sntdr-theme');
  }
  isDarkTheme: Observable<boolean>;
}
