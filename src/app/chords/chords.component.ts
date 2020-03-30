import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogConfig, MatPaginator, MatTableDataSource} from '@angular/material';
import {Chord} from '../model/chord';
import {ChordsService} from '../services/chords.service';
import {ChordsAddComponent} from './chords-add/chords-add.component';
import {DialogService} from '../services/dialog.service';
import {NotificationService} from '../services/notification.service';
import {ArtistService} from '../services/artist.service';

@Component({
  selector: 'app-chords',
  templateUrl: './chords.component.html',
  styleUrls: ['./chords.component.scss']
})
export class ChordsComponent implements OnInit {
  displayedColumns: string[] = ['song', 'beat', 'key', 'singer', 'artistCode', 'language', 'createdDate', 'action'];
  dataSource = new MatTableDataSource<Chord>();
  searchKey: string;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private chordsService: ChordsService,
              private dialogService: DialogService,
              private artistService: ArtistService,
              private notificationService: NotificationService,
              private dialog: MatDialog) { }

  ngOnInit() {
    this.loadAllChords();
  }

  loadAllChords() {
    this.chordsService.loadAllChords().subscribe((res: any) => {
      this.dataSource.data = res;
    });
  }

  onAdd() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dialog.open(ChordsAddComponent, dialogConfig);
  }

  onEdit(row) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    dialogConfig.data = row;
    this.dialog.open(ChordsAddComponent, dialogConfig);
  }
  onDelete(id) {
    this.dialogService.openConfirmDialog('Are you sure to delete ?')
      .afterClosed().subscribe(res => {
      if (res) {
        this.chordsService.deleteChord(id);
        this.notificationService.warn('Successfully Deleted!');
      }
      this.ngOnInit();
    });
  }

  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }

  loadAllArtistsToLocal() {
    this.artistService.loadAllArtistsToLocal();
  }

  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }
}
