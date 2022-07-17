import { Injectable } from '@angular/core';
import { ComponentType } from '@angular/cdk/portal';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material/dialog';
import { appConstantsMessages } from './const.messages';
import { DlgMessageComponent } from './../pages/shared/components/dialogs/dlg-message/dlg-message.component';
import { Constancia } from '../model/constancia.model';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
import * as moment from 'moment';

@Injectable()
export class Utilerias {

    constructor(public dialog: MatDialog) { }

    showLoading(): void {
        Swal.fire({
            width: '200px',
            heightAuto: true,
            allowEscapeKey: false,
            allowOutsideClick: false,
            text: 'Espere por favor...'
        });
        Swal.showLoading();
    }

    closeLoading() {
        Swal.close();
    }

    showDialog<T, Type>(component: ComponentType<T>, width: string, height: string, data: Type) {
        this.dialog.open(component, {
            width: width, height: height,
            data,
            autoFocus: false
        });
    }

    showDialogWithConfig<T>(component: ComponentType<T>, config: MatDialogConfig): MatDialogRef<T>  {
        return this.dialog.open(component, config);
    }

    showDialogError(mensaje: string) {
        let dialogConfig: MatDialogConfig = new MatDialogConfig();
        dialogConfig.data = { header : mensaje, isError: true };
        dialogConfig.autoFocus = false;
        dialogConfig.role = 'alertdialog';
        dialogConfig.width = '25%';
        this.dialog.open(DlgMessageComponent, dialogConfig);
    }

    showDialogSuccess(mensaje: string) {
        let dialogConfig: MatDialogConfig = new MatDialogConfig();
        dialogConfig.data = { header : mensaje, isError: false };
        dialogConfig.autoFocus = false;
        dialogConfig.role = 'alertdialog';
        dialogConfig.width = '25%';
        this.dialog.open(DlgMessageComponent, dialogConfig);
    }

    showDialogConfirm(mensaje: string) {
      let dialogConfig: MatDialogConfig = new MatDialogConfig();
      dialogConfig.data = { header : mensaje, isError: true, confirm: true };
      dialogConfig.autoFocus = false;
      dialogConfig.role = 'alertdialog';
      dialogConfig.width = 'auto';
      return this.dialog.open(DlgMessageComponent, dialogConfig);
    }

    getBase64ToBlob(cadenaBase64: string, contentType: string): Blob {
        const decodedBase64 = atob(cadenaBase64);
        const byteNumbers = new Array(decodedBase64.length);
        for (let i = 0; i < decodedBase64.length; i++) {
        byteNumbers[i] = decodedBase64.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        return new Blob([byteArray], {type: contentType})
    }

    exportData<T>(formatoDescarga: string, header: string[], nameSheet: string, data: Array<T>) {
        const formatosPermitidos = ["txt", "csv", "xlsx"];
        
        if(!formatosPermitidos.includes(formatoDescarga.toLocaleLowerCase())) {
            this.showDialogError(appConstantsMessages['table.selected.invalidFormat'])
            return;
        };

        if(data == null || (data != null && data.length === 0)) {
            this.showDialogError(appConstantsMessages['table.selected.zero']);
            return;
        }

        let nameFileExport = `cf_export_${moment().format('YYYYMMDD_HHmm')}.${formatoDescarga.toLocaleLowerCase()}`;
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.sheet_add_aoa(wb, [header]);
        const ws: XLSX.WorkSheet = XLSX.utils.sheet_add_json(wb, data, { origin: 'A2', skipHeader: true });
        const bt: XLSX.BookType = formatoDescarga.toLocaleLowerCase() as XLSX.BookType;
        const opts : XLSX.WritingOptions = { bookType: bt , bookSST: true, type: 'binary'};
        XLSX.utils.book_append_sheet(wb, ws, nameSheet);
        XLSX.writeFile(wb, nameFileExport, opts);
    }

    getRangeLabelTables(page: number, pageSize: number, length: number): string {
        if (length === 0 || pageSize === 0) {
            return `0 de ${length }`;
        }
        length = Math.max(length, 0);
        const startIndex = page * pageSize;
        // If the start index exceeds the list length, do not try and fix the end index to the end.
        const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
        return `${startIndex + 1} - ${endIndex} de ${length}`;
    }

    getNameDownloadPdf(constancia: Constancia, isDetalle: boolean): string {
        if(isDetalle) {
            return `${constancia.cod_cliente}${constancia.ejercicioFiscal}${constancia.folio}_detalle.pdf`;  
        }
        return `${constancia.cod_cliente}${constancia.ejercicioFiscal}${constancia.folio}.pdf`;
    }
}
