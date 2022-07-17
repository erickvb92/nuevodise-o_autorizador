import { forkJoin } from 'rxjs';
import { FormCoacreditadoComponent } from './../../../shared/components/forms/form-coacreditado/form-coacreditado.component';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { MatPaginator } from '@angular/material/paginator';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatTableDataSource } from '@angular/material/table';
import { Utilerias } from 'src/app/common/utilerias';
import { TypeModalEnum } from 'src/app/enum/type-modal';
import { CoacreditadoFileModel, CoacreditadoModel, TipoCoacreditadoModel } from 'src/app/model/coacreditado.model';
import { Institucion } from 'src/app/model/institucion.model';
import { ValidatorService } from 'src/app/pages/principal/services/validator.service';
import { DlgFormComponent } from 'src/app/pages/shared/components/dialogs/dlg-form/dlg-form.component';
import { CatalogosService } from 'src/app/pages/shared/services/catalogos.service';
import { MyValidations } from '../../../../common/my-validations';
import { TypeFilesEnum } from '../../../../enum/type-files';
import { CoacreditadosService } from '../../services/coacreditados.service';
import { EditarPorcentajesComponent } from './editar-porcentajes/editar-porcentajes.component';
import { EjercicioFiscal } from 'src/app/model/ejercicio-fiscal.model';
@Component({
  selector: 'app-coacreditados',
  templateUrl: './coacreditados.component.html',
  styleUrls: ['./coacreditados.component.scss']
})
export class CoacreditadosComponent implements OnInit {

  form: FormGroup;
  @ViewChild('fileInput') myInputFile: ElementRef;
  color: ThemePalette = 'warn';
  mode: ProgressSpinnerMode = 'indeterminate';
  fileReady: boolean = false;
  totalRecords: number = 0;
  instituciones: Institucion[] = [];
  tipoCoacreditadosList: TipoCoacreditadoModel[] = [];
  tipoPorcentajesList: any[] = [];
  ejercicioFiscalList: EjercicioFiscal[] = [];
  coacreditadosDataSource: MatTableDataSource<CoacreditadoModel>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  totalCoacreditados: number = 0;
  displayedColumns = [
    'edit',
    'contrato',
    'subcontrato',
    'instruccion',
    'fecha',
    'solicitante',
    'porcentaje',
    'acciones',
  ];
  isDisabled: boolean = true;
  filtersActive: boolean = false;


  constructor(
    private _fb : FormBuilder,
    private _vs: ValidatorService,
    private _cs: CoacreditadosService,
    private shCatalogoService: CatalogosService,
    private utilerias: Utilerias
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.getAllRecords();
    this.getCatalogos();
    this.getDataCoacreditados();
  }

  ngAfterViewInit(): void {
    this.coacreditadosDataSource.paginator = this.paginator;
  }

  initForm(){
    this.form = this._fb.group({
      sourceFile: ['',[ Validators.required], MyValidations.fileValidations(this._vs, TypeFilesEnum.COACREDITADOS)]
    });
  }

  getCatalogos(): void{
    forkJoin([
      this._cs.getTipoCoacreditado(),
      this._cs.getCatalogoPorcentajes(),
      this.shCatalogoService.getInstituciones(),
      this.shCatalogoService.getEjerciciosFiscales()
    ]).subscribe({
      next: response => {
        this.tipoCoacreditadosList = response[0],
        this.tipoPorcentajesList = response[1],
        this.instituciones = response[2],
        this.ejercicioFiscalList = response[3]
      },
      error: error => console.warn(error)
    });
  }

  getAllRecords() {
    this._cs.getAllRecords().subscribe({
      next: response => this.totalRecords = response,
      error: error => console.warn(error),
      complete: () => console.info('registros obtenidos')
    });
  }

  get fileField(){
    return this.form.get('sourceFile');
  }

  campoNoValido(field: string) {
    return this.form.get(field)?.invalid && this.form.get(field)?.touched;
  }

  validatedFile(event: any) {
    let file = event.target.files[0];

    if(event.target.files.length > 0) {
      this.fileField?.patchValue(file);
    }

    if(this.fileField?.valid){
      this.fileReady = true;
    }
  }

  uploadFileDummy(): void {
    if(this.fileField?.value) {
      var reader = new FileReader();
      reader.readAsDataURL(this.fileField?.value);
      reader.onloadend = () => {
        const data: CoacreditadoFileModel = {
          id: this.totalRecords + 1,
          file: reader.result,
          fechaModificacion: new Date(),
          usuario: 'cmtorres'
        }
        this._cs.fileUploadDummy(data).subscribe({
          next: response =>  {
            console.log(response);
            this.deleteFile();
            this.getAllRecords();
            this.getDataCoacreditados();
          },
          error: error => console.warn(error)
        });
      };
      reader.onerror = function (error) {
        console.log('Error: ', error);
      };
    }
  }



  uploadNewFile(): void {
    // const data:LogotipoModel = {
    //   id: this.totalFiles + 1,
    //   idEmpresa: this.institucionSelected?.id,
    //   img: this.imgPreview,
    //   fechaModificacion: new Date(),
    //   institucion: this.institucionSelected?.descInstitucion,
    //   usuario: 'cmtorres'
    // };
    // this.uploadFilesService.fileUploadDummy(data)
    // .subscribe({
    //   next: response => {
    //     console.log(response);
    //     this.utilerias.showDialogSuccess(response.message);
    //     this.getRecord();
    //     this.deleteFile();
    //     this.getTotalRecords();
    //   },
    //   error: error => this.utilerias.showDialogError(error.error)
    // });
  }

  deleteFile() {
    this.fileField?.reset();
    this.myInputFile.nativeElement.value = '';
    this.fileReady =  false;
  }

  get fileErrorMsg(){
    const msg = this.fileField?.errors;
    if(msg?.['archivoVacio']){
        return "carga.masiva.error.vacio";
    }else if(msg?.['archivoNombre']){
        return "carga.masiva.error.nombre";
    }else if(msg?.['archivoExtension']){
        return "carga.masiva.error.extension";
    }else if(msg?.['archivoSize']){
        return "carga.masiva.error.tamanio";
    }
    return '';
  }

  formatBytes(bytes: number, decimals = 2) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  onValueFilters(data: any){
    this.filtersActive = true;
    this.getDataCoacreditados(data?.contrato, data?.subcontrato, data?.rfc);
  }

  onCleanFilter(result: boolean) {
    if(result) {
      this.getDataCoacreditados();
    }
  }

  getDataCoacreditados(noContrato: string = '', subContrato: string = '', rfc: string = '') {
    this._cs.getAllCoacreditados(noContrato, subContrato, rfc).subscribe({
      next: response => {
        this.coacreditadosDataSource = new MatTableDataSource<CoacreditadoModel>(response);
        this.coacreditadosDataSource.paginator = this.paginator;
        this.totalCoacreditados = response.length;
        console.log(response)
        if(this.totalCoacreditados === 0 && !this.filtersActive) {
          this.isDisabled = true;
        } else {
          this.isDisabled = false;
        }
        this.filtersActive = false;
      },
      error: error => this.utilerias.showDialogError(error.error)
    })
  }

  changedStatus(event: MatSlideToggleChange) {
    let alertmsg = '';
    if(event.checked) {
      alertmsg = 'Estás seguro que deseas activar este registro?';
    } else {
      alertmsg = 'Estás seguro que deseas desactivar este registro?';
    }

    this.utilerias.showDialogConfirm(alertmsg)
      .afterClosed().subscribe( result => {
        if(result) {
          console.log(result);
        }
      });
  }

  createCoacreditado() {
    const dialogRef  = this.utilerias.showDialogWithConfig(DlgFormComponent, {
      width: "80%", height: "unset",
      data: {
        component : FormCoacreditadoComponent,
        header : 'Agregar co-acreditado',
        catCoacreditados: this.tipoCoacreditadosList,
        catPorcentajes: this.tipoPorcentajesList,
        type_modal: TypeModalEnum.AGREGAR_COACREDITADO
      }
    });

    dialogRef.afterClosed().subscribe(
      response => {
        if(response) {
          // this.utilerias.showDialogSuccess('Registro agregado con éxito');
          this.getDataCoacreditados();
        }
      }
    )
  }

  updateCoacreditado(coa: CoacreditadoModel) {
    console.log(coa)
    const dialogRef  = this.utilerias.showDialogWithConfig(DlgFormComponent, {
      width: "80%", height: "unset",
      data: {
        component : FormCoacreditadoComponent,
        header : 'Modificar co-acreditado',
        catCoacreditados: this.tipoCoacreditadosList,
        catPorcentajes: this.tipoPorcentajesList,
        dataCoacreditado: coa,
        type_modal: TypeModalEnum.MODIFICAR_COACREDITADO
      }
    });

    dialogRef.afterClosed().subscribe(
      response => {
        if(response) {
          // this.utilerias.showDialogSuccess('Registro agregado con éxito');
          this.getDataCoacreditados();
        }
      }
    )
  }

  viewCoacretidado(contrato: string) {
    let coacreditados: CoacreditadoModel[] = [];
    this._cs.getCoacreditadoByContract(contrato).subscribe({
      next: response => coacreditados = response,
      error: error => console.error(error)
    });

    const dialogRef  = this.utilerias.showDialogWithConfig(DlgFormComponent, {
      width: "80%", height: "unset",
      data: {
        component : EditarPorcentajesComponent,
        header : 'Editar porcentajes',
        response: coacreditados,
        catPorcentajes: this.tipoPorcentajesList,
        type_modal: TypeModalEnum.VER_COACREDITADO,
        no_show_save: true
      }
    });

    dialogRef.afterClosed().subscribe(
      response => {
        console.log(response);
      }
    );
  }

  deleteCoacretidado(coacreditado: CoacreditadoModel) {
    const dialogRef = this.utilerias.showDialogConfirm('¿Estás seguro que deseas eliminar este regitro?');
    dialogRef.afterClosed().subscribe( response => {
      if(response) {
        this._cs.deleteCoacreditado(coacreditado).subscribe({
          next: result => {
            if(result?.status === '0') {
              this.utilerias.showDialogError(result?.message);
            } else {
              this.utilerias.showDialogSuccess(result?.message);
              this.getDataCoacreditados();
            }
          },
          error: error => console.warn(error)
        });
      }
    });
  }

  returnColor(value:string) {
    if(value == '0') return 'red';
    if(value == '50') return 'orange';
    return 'green';
  }

}
