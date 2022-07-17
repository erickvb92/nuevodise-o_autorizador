import { Component, Input, OnInit } from '@angular/core';
import { threadId } from 'worker_threads';
import { MenuService } from '../../menu.service';

export interface ViewTotalOferta{
  total:number;
dias:number;
  titulo:String;
icono:String;
color:String;
fechaInicial:String;
fechaFinal:String;
cantidadInicial:number;
cantidadfinal:number;
id:number;
selected:boolean;
}

@Component({
  selector: 'app-menu-dsp',
  templateUrl: './menu-dsp.component.html',
  styleUrls: ['./menu-dsp.component.css']
})
export class MenuDspComponent implements OnInit {
  totalesOferta:ViewTotalOferta[]=new Array();
 
  constructor(private service: MenuService) { }

  ngOnInit(): void {
    this.loadTotalOffer();
   }

  menuCancelar: boolean = false;
  menuCreacion: boolean = false;
  @Input() cargainicial: string = '';

  lineMenu(event: Event, menu: string) {
   this.service.lineMenu(event, menu);
   this.menuCancelar = this.service.menuCancelar;
   this.menuCreacion = this.service.menuCreacion;   
  }

  lineSubMenu(event: Event) {
    this.service.lineSubMenu(event);
  }

  ngOnChanges() {
    this.service.ngOnChanges();
    this.menuCreacion = this.service.menuCreacion;
  }

  redirectOferta(opcionSelected:number){
   // this.router.navigate([`/catalog/detofertacounter/${opcionSelected}`]);
  };

  loadTotalOffer(){
    
   
    this.totalesOferta.push({id:1,cantidadInicial:5,cantidadfinal:7,color:"#ffffff",
    fechaFinal:"2022-01-01",fechaInicial:"2022-01-01",dias:5,total:1000,selected:false,titulo:"Total Operacion guardadas",icono:"settings_backup_restore"});
    
    this.totalesOferta.push({id:1,cantidadInicial:5,cantidadfinal:7,color:"#ffffff",
    fechaFinal:"2022-01-01",fechaInicial:"2022-01-01",dias:5,total:1000,selected:false,titulo:"Total Operacion Pendientes",icono:"settings_backup_restore"});

    this.totalesOferta.push({id:1,cantidadInicial:5,cantidadfinal:7,color:"#ffffff",
    fechaFinal:"2022-01-01",fechaInicial:"2022-01-01",dias:5,total:1000,selected:false,titulo:"Total Operacion Aceptadas",icono:"settings_backup_restore"});

    this.totalesOferta.push({id:1,cantidadInicial:5,cantidadfinal:7,color:"#ffffff",
    fechaFinal:"2022-01-01",fechaInicial:"2022-01-01",dias:5,total:1000,selected:false,titulo:"Total Operacion Rechazadas",icono:"settings_backup_restore"});

   
  }
}
