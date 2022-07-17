import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Utilerias } from '../../../../../common/utilerias';
import { appConstantsMessages } from '../../../../../common/const.messages';
import { ConstanciaRequestCfdi } from '../../../../../model/constancia-request-cfdi.model';
import { ExtraccionService } from '../../../../principal/services/extraccion.service';

@Component({
  selector: 'app-dlg-generarzip',
  templateUrl: './dlg-generarzip.component.html',
  styleUrls: ['./dlg-generarzip.component.scss']
})
export class DlgGenerarzipComponent implements OnInit {

  constructor(
    private utilerias: Utilerias,
    private extraccionService: ExtraccionService,
    private dialogRef: MatDialogRef<DlgGenerarzipComponent>,
    @Inject(MAT_DIALOG_DATA) private constanciasZip: ConstanciaRequestCfdi[]) { }

  ngOnInit(): void {
  }

  generaZip() {
    this.extraccionService.generarZip(this.constanciasZip)
      .subscribe({
        next: response => {       
          this.close();
          this.utilerias.showDialogSuccess(appConstantsMessages['extraccion.downloadZip.ok']);
        },
        error: error => {
          this.utilerias.showDialogError(error);
        }
    });
  }

  generaZipPdf() {
    this.extraccionService.generarZipPdf(this.constanciasZip)
      .subscribe({
        next: response => {       
          this.close();
          this.utilerias.showDialogSuccess(appConstantsMessages['extraccion.downloadZip.ok']);
        },
        error: error => {
          this.utilerias.showDialogError(error);
        }
    });
  }

  generaZipXml() {
    this.extraccionService.generarZipXml(this.constanciasZip)
      .subscribe({
        next: response => {       
          this.close();
          this.utilerias.showDialogSuccess(appConstantsMessages['extraccion.downloadZip.ok']);
        },
        error: error => {
          this.utilerias.showDialogError(error);
        }
    });
  }

  close(): void {
    this.dialogRef.close();
  }
}
