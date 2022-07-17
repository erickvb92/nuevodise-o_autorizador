
import { Injectable, Renderer2, RendererFactory2 } from "@angular/core";
import { Subject } from "rxjs";


@Injectable({
    providedIn: 'root'
})
export class MenuService {


    menuAnterior: any;
    subMenuAnterior: any;
    menuParam: boolean = false;
    menuCancelar: boolean = false;
    menuCreacion: boolean = false;
    menuCatalogos: boolean = false;
    lineSubmenu: string = 'line-submenu';
    private renderer: Renderer2;
    constructor(
        rendererFactory: RendererFactory2) {
        this.renderer = rendererFactory.createRenderer(null, null);
    }

    lineMenu(event: Event, menu: string) {
        let label = this.renderer.nextSibling(event.target);
        this.removeMenu();
        this.renderer.addClass(label, this.lineSubmenu);
        this.menuAnterior = label;
        this.removeSubmenu();
        this.cierraMenu();

        switch (menu) {
            case 'cancelar':
                this.menuCancelar = true;
                break;
            case 'creacion':
                this.menuCreacion = true;
                break;
            case 'param':
                this.menuParam = true;
                break;
            case 'catalogos': true;
                this.menuCatalogos = true;
                break;
            default:
                this.cierraMenu();
                break;
        }
    }

    lineSubMenu(event: Event) {
        let label = this.renderer.nextSibling(event.target);
        this.removeSubmenu();
        this.renderer.addClass(label, this.lineSubmenu);
        this.subMenuAnterior = label;
    }

    ngOnChanges() {
        this.cierraMenu();
        this.removeMenu();
        this.removeSubmenu();
    }

    cierraMenu() {
        this.menuCancelar = false;
        this.menuCreacion = false;
        this.menuParam = false;
        this.menuCatalogos = false;
    }

    removeMenu() {
        if (undefined != this.menuAnterior) {
            this.renderer.removeClass(this.menuAnterior, this.lineSubmenu);
        }
    }

    removeSubmenu() {
        if (undefined != this.subMenuAnterior) {
            this.renderer.removeClass(this.subMenuAnterior, this.lineSubmenu);
        }
    }
    private _darkTheme = new Subject<boolean>();

    isDarkTheme = this._darkTheme.asObservable();

    setDarkTheme(isDarkTheme: boolean): void {
        this._darkTheme.next(isDarkTheme);
    }
}
