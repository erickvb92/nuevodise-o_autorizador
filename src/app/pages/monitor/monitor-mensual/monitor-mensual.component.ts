import { Component, OnInit } from '@angular/core';

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
  selector: 'app-monitor-mensual',
  templateUrl: './monitor-mensual.component.html',
  styleUrls: ['./monitor-mensual.component.css']
})
export class MonitorMensualComponent implements OnInit {

  totalesOferta:ViewTotalOferta[]=new Array();
  constructor() { }

  ngOnInit(): void {
    this.loadTotalOffer();
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

