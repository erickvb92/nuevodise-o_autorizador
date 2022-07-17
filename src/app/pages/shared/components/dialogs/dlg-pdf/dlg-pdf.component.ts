import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Constantes } from '../../../../../common/constantes';
import { Utilerias } from './../../../../../common/utilerias';
import { DocumentoPdf } from './../../../../../model/documento-pdf.model';
import * as fileSaver from 'file-saver';

@Component({
  selector: 'app-dlg-pdf',
  templateUrl: './dlg-pdf.component.html',
  styleUrls: ['./dlg-pdf.component.css']
})
export class DlgPdfComponent implements OnInit {

  pdfSelected: DocumentoPdf;

  constructor(
    private sanitizer: DomSanitizer,
    private utilerias: Utilerias,
    private dialogRef: MatDialogRef<DlgPdfComponent>,
    @Inject(MAT_DIALOG_DATA) public pdfs: DocumentoPdf[]) { 
      if(pdfs != null && pdfs.length > 0) {
        this.pdfSelected = pdfs[0];
      } else {
        this.pdfSelected = new DocumentoPdf();
      }
  }

  ngOnInit(): void {
  }

  safeSrcViewPdf(contenido: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl('data:application/pdf;base64,' + contenido + '#toolbar=0');
  }

  onSelectIndexTab(index: number) {
    this.pdfSelected = this.pdfs[index];
  }

  descargarPDF() {
    let archivoblob = this.utilerias.getBase64ToBlob(this.pdfSelected.contenido, Constantes.CONTENT_TYPE_PDF);
    fileSaver.saveAs(archivoblob, this.pdfSelected.nombreArchivo);
  }

  close(): void {
    this.dialogRef.close();
  }
}
