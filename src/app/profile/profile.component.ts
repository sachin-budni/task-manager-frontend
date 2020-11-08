import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(public auth: AuthService) { }

  ngOnInit(): void {
  }
  updatePic(event): void {
    const file = event.target.files[0];
    const uploadImageData = new FormData();
    uploadImageData.append('imageFile', file, file.name);
    this.auth.upload(uploadImageData);
  }
}
