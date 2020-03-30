import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogConfig, MatPaginator, MatTableDataSource} from '@angular/material';
import {DialogService} from '../services/dialog.service';
import {NotificationService} from '../services/notification.service';
import {NameCodePair} from '../model/name-code-pair';
import {ArtistService} from '../services/artist.service';
import {ArtistAddComponent} from './artist-add/artist-add.component';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.scss']
})
export class ArtistComponent implements OnInit {

  displayedColumns: string[] = ['id', 'code', 'name', 'action'];
  dataSource = new MatTableDataSource<NameCodePair>();
  searchKey: string;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private artistsService: ArtistService,
              private dialogService: DialogService,
              private notificationService: NotificationService,
              private dialog: MatDialog) { }

  ngOnInit() {
    this.loadAllArtist();
  }

  loadAllArtist() {
    this.artistsService.loadAllArtists().subscribe((res: any) => {
      this.dataSource.data = res;
    });
  }

  onAdd() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '40%';
    this.dialog.open(ArtistAddComponent, dialogConfig);
  }

  onEdit(row) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '40%';
    dialogConfig.data = row;
    this.dialog.open(ArtistAddComponent, dialogConfig);
  }
  onDelete(id) {
    this.dialogService.openConfirmDialog('Are you sure to delete ?')
      .afterClosed().subscribe(res => {
      if (res) {
        this.artistsService.deleteArtist(id);
        this.notificationService.warn('Successfully Deleted!');
      }
      this.ngOnInit();
    });
  }

  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }

  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }

}
