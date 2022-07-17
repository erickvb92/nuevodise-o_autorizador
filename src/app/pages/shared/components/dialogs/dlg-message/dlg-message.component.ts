import { Component, OnInit, Inject } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
import { ProgressSpinnerMode}  from '@angular/material/progress-spinner';

@Component({
  selector: 'app-dlg-carga',
  templateUrl: './dlg-message.component.html',
  styleUrls: ['./dlg-message.component.css']
})
export class DlgMessageComponent implements OnInit {

  color: ThemePalette = 'warn';
  mode: ProgressSpinnerMode = 'indeterminate';

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {}
}
