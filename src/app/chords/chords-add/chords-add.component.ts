import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ChordsService} from '../../services/chords.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NameCodePair} from '../../model/name-code-pair';
import {Chord} from '../../model/chord';

@Component({
  selector: 'app-chords-add',
  templateUrl: './chords-add.component.html',
  styleUrls: ['./chords-add.component.scss']
})
export class ChordsAddComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) private chord: Chord,
              private chordService: ChordsService,
              private dialogRef: MatDialogRef<ChordsAddComponent>) { }
  form: FormGroup;
  artists: NameCodePair[];

  ngOnInit() {
    this.form = new FormGroup({
      song: new FormControl('', Validators.required),
      beat: new FormControl('', Validators.required),
      key: new FormControl('', Validators.required),
      keywords: new FormControl('', Validators.required),
      chords: new FormControl('', Validators.required),
      artistCode: new FormControl('', Validators.required)
    });
    if (this.chord) {
      this.form.get('song').setValue(this.chord.song);
      this.form.get('beat').setValue(this.chord.beat);
      this.form.get('key').setValue(this.chord.key);
      this.form.get('keywords').setValue(this.chord.keywords);
      this.form.get('chords').setValue(this.chord.chords);
      this.form.get('artistCode').setValue(this.chord.artistCode);
    }
  }

  onClose() {
    this.dialogRef.close();
  }

  onSave() {
    if (this.form.valid) {
      if (this.chord) {
        this.chordService.editChord(this.chord.id, this.form.value);
        this.onClose();
      } else {
        this.chordService.saveChord(this.form.value);
        this.onClose();
      }
    }
  }
}
