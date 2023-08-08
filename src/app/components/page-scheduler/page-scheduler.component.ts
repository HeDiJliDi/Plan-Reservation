import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { Subscription } from 'rxjs';
import { FormReservationComponent } from '../form-reservation/form-reservation.component';
import { ReservationDto } from '../../model/reservationdto';
import { RoomDto } from '../../model/roomdto';
import { BookingDto } from '../../model/bookingdto';
import { ChangeReservationArg } from '../../scheduler/changereservationarg';
import { ReservationArg } from 'src/app/scheduler/reservationargs';
import { ReservationService } from '../../service/reservation-service';
import { Occupation } from 'src/app/model/Occupation1';
import { ChangeOccupationArg } from 'src/app/scheduler/changerOccupation';
import { OccupationDtoDt } from 'src/app/model/OccupationDtoDt';
@Component({
  selector: 'app-pagescheduler',
  templateUrl: './page-scheduler.component.html',
  styleUrls: ['./page-scheduler.component.css']
})
export class PageSchedulerComponent implements OnInit {
  year: number;
  month: number;
  day: number;
  currentsearch: ChangeReservationArg;
  sub: Subscription;
  rooms: RoomDto[];
  bookings: BookingDto[];
  occupations:Occupation[];
  constructor(private dialog: MatDialog, private service: ReservationService, private cd: ChangeDetectorRef) {
    const d = new Date();
    this.year = d.getFullYear();
    this.month = d.getMonth() + 1;
    this.day = d.getDate();
    this.rooms = [];
    this.bookings = [];
    this.occupations=[];
   }
  ngOnInit()
  {

  }

  onReservationChanged(args: ChangeReservationArg) {
    this.currentsearch = args;
    if (this.sub) {
      this.sub.unsubscribe();
      this.sub = undefined;
    }
    this.sub = this.service.getReservations(args).subscribe(result => {
      const r = result as ReservationDto;
      this.rooms = r.rooms;
      this.bookings = r.bookings;
      this.cd.detectChanges();
    });
  }
  onOccupationChanged(args: ChangeOccupationArg) {
    this.currentsearch = args;
    if (this.sub) {
      this.sub.unsubscribe();
      this.sub = undefined;
    }
    this.sub = this.service.getOccupations(args).subscribe(result => {
      const r = result as OccupationDtoDt;
      this.rooms = r.rooms;
      this.occupations= r.occupation;
      this.cd.detectChanges();
    });
  }

  onDayReservation(args: ReservationArg) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '800px';
    dialogConfig.height = '700px';
    const list = this.service.getRooms();
    dialogConfig.data = { roomid: args.roomid, date: args.date, booking: args.booking, rooms: list };
    const dialogRef = this.dialog.open(FormReservationComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(data => {
      if (data === 'ok') {
        this.onReservationChanged(this.currentsearch);
      }
      if (data === 'no') {
      }
    });
  }
  onDayOccupation(args: ReservationArg) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '800px';
    dialogConfig.height = '700px';
    const list = this.service.getRooms();
    dialogConfig.data = { roomid: args.roomid, date: args.date, booking: args.booking, rooms: list };
    const dialogRef = this.dialog.open(FormReservationComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(data => {
      if (data === 'ok') {
        this.onOccupationChanged(this.currentsearch);
      }
      if (data === 'no') {
      }
    });
  }

}
