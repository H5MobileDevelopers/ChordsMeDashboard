import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ChordsService} from '../../services/chords.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NameCodePair} from '../../model/name-code-pair';
import {Chord} from '../../model/chord';
import {languagesArr} from '../../model/constants';
import {ArtistService} from '../../services/artist.service';
import {from, Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {NotificationService} from '../../services/notification.service';
import * as moment from 'moment';


@Component({
  selector: 'app-chords-add',
  templateUrl: './chords-add.component.html',
  styleUrls: ['./chords-add.component.scss']
})
export class ChordsAddComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) private chord: Chord,
              private chordService: ChordsService,
              public artistService: ArtistService,
              public notifyService: NotificationService,
              private dialogRef: MatDialogRef<ChordsAddComponent>) { }
  form: FormGroup;
  languages = languagesArr;
  artists: NameCodePair[];
  filteredArtists: Observable<NameCodePair[]>;

  ngOnInit() {
    this.form = new FormGroup({
      song: new FormControl('', Validators.required),
      beat: new FormControl('', Validators.required),
      key: new FormControl('', Validators.required),
      keywords: new FormControl('', Validators.required),
      chords: new FormControl('', Validators.required),
      artistCode: new FormControl('', Validators.required),
      language: new FormControl('', Validators.required),
      createdDate: new FormControl(''),
      singer: new FormControl('')
    });
    if (this.chord) {
      this.form.get('song').setValue(this.chord.song);
      this.form.get('beat').setValue(this.chord.beat);
      this.form.get('key').setValue(this.chord.key);
      this.form.get('keywords').setValue(this.chord.keywords);
      this.form.get('chords').setValue(this.chord.chords);
      this.form.get('artistCode').setValue(this.chord.artistCode);
      this.form.get('language').setValue(this.chord.language);
      this.form.get('singer').setValue(this.chord.singer);
    }
    this.artists = this.artistService._artists;

    if (this.artists) {
      if (this.artists.length > 0) {
        this.filteredArtists = this.form.get('artistCode').valueChanges.pipe(startWith(''), map(value => this.filterArtists(value)));
      }
    }
  }

  onClose() {
    this.dialogRef.close();
  }

  onSave() {
    if (this.form.valid) {
      this.form.get('createdDate').setValue(moment(new Date()).format('YYYY-MM-DD'));
      this.form.get('singer').setValue(this.findArtistByCode(this.form.value.artistCode));
      if (this.chord) {
        this.chordService.editChord(this.chord.id, this.form.value);
        this.notifyService.success('Successfully Updated.');
        this.onClose();
      } else {
        this.chordService.saveChord(this.form.value);
        this.notifyService.success('Successfully Added.');
        this.onClear();
      }
    }
  }
  onClear() {
    this.form.reset();
  }

  filterArtists(value) {
    let filterValue = '';
    if (value !== undefined && value !== null && value.constructor.name === 'String') {
      filterValue = value.toLowerCase();
      return this.artists.filter(option => (option.name.toLowerCase().includes(filterValue) ||
        option.code.toLowerCase().includes(filterValue)));
    }
    return value;
  }

  findArtistByCode(code) {
    let artistName = 'N/A';
    this.artists.forEach((artist: NameCodePair) => {
      if (artist.code === code) {
        artistName = artist.name;
      }
    });
    return artistName;
  }

  fillKeywords() {
    this.form.get('keywords').setValue((this.form.get('keywords').value != null ?
      this.form.get('keywords').value : '') + this.form.value.song.toLowerCase() + ',');
  }

  fillArtistToKeyword() {
    const artistName = this.findArtistByCode(this.form.value.artistCode) != null ? this.findArtistByCode(this.form.value.artistCode) : '';
    this.form.get('keywords').setValue((this.form.get('keywords').value != null ?
    this.form.get('keywords').value : '') + artistName.toLowerCase() + ',');
  }
}
