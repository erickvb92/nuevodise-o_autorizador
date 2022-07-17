import { Component, OnInit, Input, AfterViewInit, AfterViewChecked, OnChanges, SimpleChanges } from '@angular/core';

import { appConstantsMessages } from '../const.messages' 

@Component({
  selector: 'app-message',
  template: `{{_messageConst}}`,
  styles: []
})
export class MessageComponent implements OnInit, OnChanges {

  constructor() { }
  @Input() message:string 
  _messageConst : string
  
  ngOnInit(): void {
    this._messageConst = this.msg;
  }
  ngOnChanges(): void {
    this._messageConst = this.msg;
  }
  get msg(){
    return appConstantsMessages[this.message];
  }
}
