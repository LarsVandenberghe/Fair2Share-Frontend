import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { ProfileDataService } from '../profile-data.service';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.css']
})
export class UploadImageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  @Output() notify: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild("fileInput") fileInput;

  onChanged() : void{
    let fi = this.fileInput.nativeElement;
    if (fi.files && fi.files[0]) {
      let fileToUpload = fi.files[0];
      this.notify.emit(fileToUpload);
    }
  }
}
