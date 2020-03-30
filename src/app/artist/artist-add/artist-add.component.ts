import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NameCodePair} from '../../model/name-code-pair';
import {ArtistService} from '../../services/artist.service';
import {NotificationService} from '../../services/notification.service';

@Component({
  selector: 'app-artist-add',
  templateUrl: './artist-add.component.html',
  styleUrls: ['./artist-add.component.scss']
})
export class ArtistAddComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) private artist: NameCodePair,
              private artistService: ArtistService,
              private notifyService: NotificationService,
              private dialogRef: MatDialogRef<ArtistAddComponent>) { }
  form: FormGroup;
  artists: NameCodePair[];

  ngOnInit() {
    this.form = new FormGroup({
      code: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required)
    });
    if (this.artist) {
      this.form.get('code').setValue(this.artist.code);
      this.form.get('name').setValue(this.artist.name);
    }
  }

  onClose() {
    this.dialogRef.close();
  }

  onSave() {
    if (this.form.valid) {
      if (this.artist) {
        this.artistService.editArtist(this.artist.id, this.form.value);
        this.notifyService.success('Successfully Updated.');
        this.onClose();
      } else {
        this.artistService.saveArtist(this.form.value);
        this.notifyService.success('Successfully Added.');
      }
    }
  }

}
