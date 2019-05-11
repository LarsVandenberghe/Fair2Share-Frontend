import { Component, OnInit, ViewChild } from '@angular/core';
import { ProfileDataService } from '../profile-data.service';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.css']
})
export class UploadImageComponent implements OnInit {

  constructor(private dataService : ProfileDataService) { }

  ngOnInit() {
  }

  @ViewChild("fileInput") fileInput;

addFile(): void {
    let fi = this.fileInput.nativeElement;
    if (fi.files && fi.files[0]) {
        let fileToUpload = fi.files[0];
        this.dataService
            .uploadImage$(fileToUpload)
            .subscribe(res => {
                console.log(res);
            });
    }
}
}
