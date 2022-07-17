import { Component, ElementRef, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ContentCartComponent } from './../content-cart/content-cart.component';
import { Utilerias } from '../../../../common/utilerias';
import { ProcessCartService } from './../../../principal/services/process-cart.service';
import { Constancia } from '../../../../model/constancia.model';

type TypeAction = 'modificada' | 'cancelada';

@Component({
  selector: 'app-process-cart',
  templateUrl: './process-cart.component.html',
  styleUrls: ['./process-cart.component.css']
})

export class ProcessCartComponent implements OnInit {
  @ViewChild('drawer', {static: false}) public appDrawer!: ElementRef;
  currentConst: Constancia[] = [];
  totalCurrentConst: Constancia[] = [];
  action: TypeAction;
  totalConstancies: number;
  @ViewChild('contentCart')
  private content: ContentCartComponent;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
  );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private processCartService: ProcessCartService,
    private utilerias: Utilerias,
    private cdRef:ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.watchData();
  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

  showData(current: string) {
    this.currentConst = [];
    this.action = current === 'constancias-modificadas' ? 'modificada' : 'cancelada';
    const storage = this.processCartService.getSessionActive(current);
    this.currentConst = storage ? JSON.parse(storage) : [];
  }

  onDeleteItemStorage(data: any) {
    const dialogRef = this.utilerias.showDialogConfirm('¿Estás seguro que deseas eliminar de la lista?');
    dialogRef.afterClosed().subscribe( response =>  {
      if(response) {
        this.content.searchField.setValue('');
        let session = data?.nameSession === 'modificada' ? 'constancias-modificadas' : 'constancias-canceladas'
        this.processCartService.deleteConstancia(data?.id, session);
        this.showData(session);
      }
    });
  }

  onRemoveSession(session: string){
    const dialogRef = this.utilerias.showDialogConfirm('¿Estás seguro que deseas vaciar la lista?');
    dialogRef.afterClosed().subscribe( response =>  {
      if(response) {
        this.content.searchField.setValue('');
        let sessionName = session === 'modificada' ? 'constancias-modificadas' : 'constancias-canceladas'
        this.processCartService.removeSessionActive(sessionName);
        this.showData(sessionName);
      }
    });
  }

  // Método para procesar una constancia
  onProcessItemStorage(data: any) {
    const {session, constancia, index} = data[0];
    let sessionName = session === 'modificada' ? 'constancias-modificadas' : 'constancias-canceladas'
    const dialogRef = this.utilerias.showDialogConfirm(`¿Estás seguro que deseas procesar la constancia de folio ${constancia?.folio}?`);
    dialogRef.afterClosed().subscribe( response =>  {
      if(response) {
        // SERVICIO QUE PROCESE CONSTANCIA
        this.processCartService.processConstancy(index, constancia, sessionName).subscribe(
          result => {
            this.content.searchField.setValue('');
            this.utilerias.showDialogSuccess(result.message);
            this.showData(sessionName);
          }
        )
      }
    });
  }

  onProcessList(sessionName: string) {
    const dialogRef = this.utilerias.showDialogConfirm('¿Estás seguro que deseas procesar lista de constancias?');
    dialogRef.afterClosed().subscribe( response =>  {
      if(response) {
        let session = sessionName === 'modificada' ? 'constancias-modificadas' : 'constancias-canceladas'
        // AQUÏ VA SERVICIO PARA PROCESAR LISTA DE CONSTANCIAS DEL CARRITO
        this.processCartService.processAllConstancies(session).subscribe(
          result => {
            this.content.searchField.setValue('');
            this.utilerias.showDialogSuccess(result.message);
            this.showData(session);
          }
        );
      }
    });
  }

  watchData() {
    this.processCartService.currentConstancy$.subscribe(
      constancies => this.totalConstancies = constancies.length
    );
  }

  onSearchConstancies(search: string) {
    const session = this.action === 'modificada' ? 'constancias-modificadas' : 'constancias-canceladas';
    if(search) {
      this.processCartService.getConstanciasSearch(session, search)?.subscribe(
        response => {
        this.currentConst = response ? response : []
        }
      );
    } else {
      this.showData(session);
    }
  }

}
