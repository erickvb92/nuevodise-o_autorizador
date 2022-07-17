import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MyValidations } from '../../../../common/my-validations';
import { TypeFilesEnum } from '../../../../enum/type-files';
import { ValidatorService } from './../../../principal/services/validator.service';
import { UploadFilesService } from './../../services/upload-files.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Institucion } from '../../../../model/institucion.model';
import { LogotipoModel } from '../../../../model/logotipo.model';
import { Utilerias } from '../../../../common/utilerias';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { CatalogosService } from '../../../shared/services/catalogos.service';

const DATA_DUMMY = [
  {
    id: 1,
    imagen: 'assets/iconos/logosantander.png',
    fecha_carga: '10/08/2015',
    nombre: 'Santander',
    usuario: 'cmtorres'
  },
]

@Component({
  selector: 'app-cat-logotipos',
  templateUrl: './cat-logotipos.component.html',
  styleUrls: ['./cat-logotipos.component.scss']
})
export class CatLogotiposComponent implements OnInit {

  form: FormGroup;
  searchField = new FormControl('', Validators.required);
  instituciones: Institucion[] = [];
  institucionSelected: Institucion;
  imgPreview: string | ArrayBuffer | null = null;
  percentCompleted: number | undefined;
  isUploaded: boolean = false;
  bitacoraDataSource: MatTableDataSource<LogotipoModel>;
  recordInstitution: LogotipoModel[] = [];
  totalFiles: number;
  color: ThemePalette = 'warn';
  mode: ProgressSpinnerMode = 'indeterminate';
  @ViewChild('fileInput') myInputFile: ElementRef;
  displayedColumns = [
    'logo',
    'fecha',
    'institucion',
    'usuario_update'
  ];

  constructor(
    private shCatalogoService: CatalogosService,
    private _vs: ValidatorService,
    private _fb: FormBuilder,
    private uploadFilesService: UploadFilesService,
    private utilerias: Utilerias,
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.getCatalogos();
    this.getTotalRecords();
    this.bitacoraDataSource = new MatTableDataSource<LogotipoModel>();
    this.searchInstitution();
  }

  initForm(){
    this.form = this._fb.group({
      sourceFile: ['',[ Validators.required], MyValidations.fileValidations(this._vs, TypeFilesEnum.LOGOTIPO)]
    });
  }

  get fileField(){
    return this.form.get('sourceFile');
  }

  getCatalogos(): void{
    this.shCatalogoService.getInstituciones().subscribe({
        next: response => this.instituciones = response,
        error: error => console.error(error)
    });
  }

  getTotalRecords() {
    this.uploadFilesService.getAllLogotipos().subscribe({
      next: response => this.totalFiles = response,
      error: error => console.log(error)
    });
  }

  searchInstitution() {
    this.searchField.valueChanges.subscribe( response => {
      this.institucionSelected = response;
      this.getRecord();
      this.deleteFile();
    })
  }

  getRecord() {
    this.uploadFilesService.getRecord(this.institucionSelected?.id).subscribe({
      next: response => {
        this.recordInstitution = response;
        this.bitacoraDataSource = new MatTableDataSource<LogotipoModel>(response);
      },
      error: error => console.error(error)
    })
  }

  campoNoValido(field: string) {
    return this.form.get(field)?.invalid && this.form.get(field)?.touched;
  }

  validatedFile(event: any) {
    let image = event.target.files[0];

    if(event.target.files.length > 0) {
      this.fileField?.patchValue(image);
    }

    if(this.fileField?.valid){
      this.previewImage();
    }
  }

  uploadFile() {
    this.uploadFilesService.fileUpload(this.fileField?.value).subscribe(
      event => {
        if(event.type === HttpEventType.UploadProgress) {
          this.percentCompleted = Math.round(100 * event.loaded / event.total);
        } else if( event instanceof HttpResponse) {
          this.isUploaded = true;
        }
      },
      error => console.log(error)
    )
  }

  uploadFileDummy(): void {
    if(this.recordInstitution.length === 0) {
      this.uploadNewFile();
    } else {
      this.updateFile();
    }
  }

  uploadNewFile(): void {
    const data:LogotipoModel = {
      id: this.totalFiles + 1,
      idEmpresa: this.institucionSelected?.id,
      img: this.imgPreview,
      fechaModificacion: new Date(),
      institucion: this.institucionSelected?.descInstitucion,
      usuario: 'cmtorres'
    };
    this.uploadFilesService.fileUploadDummy(data)
    .subscribe({
      next: response => {
        console.log(response);
        this.utilerias.showDialogSuccess(response.message);
        this.getRecord();
        this.deleteFile();
        this.getTotalRecords();
      },
      error: error => this.utilerias.showDialogError(error.error)
    });
  }

  updateFile(): void {
    const dialogRef = this.utilerias.showDialogConfirm('Ya existe un registro para esta institución, ¿estás seguro que deseas reemplazarlo?');
    dialogRef.afterClosed().subscribe( response =>  {
      if(response) {
        const data: Partial<LogotipoModel> = {
          img: this.imgPreview,
          fechaModificacion: new Date(),
          usuario: 'cmtorres2'
        }

        this.uploadFilesService.updateFile(this.recordInstitution[0].id, data).subscribe({
          next: response => {
            this.utilerias.showDialogSuccess(response.message);
            this.getRecord();
            this.deleteFile();
          },
          error: error => this.utilerias.showDialogError(error.error)
        })
      }
    });
  }

  deleteFile() {
    this.fileField?.reset();
    this.myInputFile.nativeElement.value = '';
    this.imgPreview = '';
  }

  previewImage() {
    const reader = new FileReader();

    reader.readAsDataURL(this.fileField?.value);
    reader.onloadend = () => {
      this.imgPreview = reader.result;
    }
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

}
