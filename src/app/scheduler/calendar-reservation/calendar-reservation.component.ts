import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { RoomDto } from 'src/app/model/roomdto';
import { DateAndWeek } from '../datemanager';
import { BookingDto } from 'src/app/model/bookingdto';
import { StatusbarArg } from '../changestatusbarargs';
import { ReservationArg } from '../reservationargs';
import { bindCallback } from 'rxjs';
import { Occupation } from 'src/app/model/Occupation1';
import { OccupationArg } from '../occupationArgs';

@Component({
  selector: 'app-reservation',
  templateUrl: './calendar-reservation.component.html',
  styleUrls: ['./calendar-reservation.component.css']
})
export class CalendarReservationComponent implements OnInit, OnChanges  {
  @Input() room: RoomDto;
  @Input() day: DateAndWeek;
  @Input() bookings: BookingDto[];
  @Input() occupations: Occupation[];
  @Output() changestatusbar = new EventEmitter<StatusbarArg>();
  @Output() reservation = new EventEmitter<ReservationArg>();
  @Output() Occ = new EventEmitter<OccupationArg>();

  isreserved = false;
  isreservedSx = false;
  isreservedCx = false;
  isreservedDx = false;
  isoccupied = false;
  isoccupiedDx = false;
  isoccupiedCx = false;
  isoccupiedSx = false;
  booking: BookingDto;
  occupation:Occupation;

  constructor( ) { }
  ngOnInit() {
    // console.log(this.occupations);

  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes.bookings||changes.occupations) {
      this.datasourceChanged();
    }
  }
  onMouseEnter(b: BookingDto) {
    const args = new StatusbarArg('enter', b);
    this.changestatusbar.emit(args);
  }
  onMouseLeave(b: BookingDto) {
    const args = new StatusbarArg('leave', b);
    this.changestatusbar.emit(args);
  }
  onDayReservation(mouse: MouseEvent) {
    const b = new BookingDto();
    if (this.booking) {
      b.bookingId = this.booking.bookingId;
      b.roomId = this.booking.roomId;
      b.roomType = this.booking.roomType;
      b.startDate = new Date(this.booking.startDate);
      b.endDate = new Date(this.booking.endDate);
      b.stayDay = this.booking.stayDay;
      b.name = this.booking.name;
    }
    const args = new ReservationArg(this.room.roomId, this.day.date, b);
    this.reservation.emit(args);
  }
  private datasourceChanged() {
    this.isreserved = false;
    this.isreservedDx = false;
    this.isreservedCx = false;
    this.isreservedSx = false;
    this.isoccupied = false;
    this.isoccupiedDx = false;
    this.isoccupiedCx = false;
    this.isoccupiedSx = false;
    this.booking = undefined;
    this.occupation=undefined;
    const list = this.bookings.filter(b => b.roomId === this.room.roomId);
    for (const b of list) {
      if (this.day.date >= b.startDate &&  this.day.date <= b.endDate) {
        this.isreserved = true;
        const d = this.day.date.getTime();
        if (d === b.startDate.getTime() && d !== b.endDate.getTime()) {
          this.booking = b;
          this.isreservedDx = true;
        }
        if (d !== b.startDate.getTime() && d !== b.endDate.getTime()) {
          this.booking = b;
          this.isreservedCx = true;
        }
        if (d !== b.startDate.getTime() && d === b.endDate.getTime()) {
          this.isreservedSx = true;
        }
      }
    }
    const occupationList = this.occupations.filter(o => o.roomId === this.room.roomId);
  for (const o of occupationList) {
    if (this.day.date >= o.startDate && this.day.date <= o.endDate) {
      this.isoccupied = true;
      const d = this.day.date.getTime();
      if (d === o.startDate.getTime() && d !== o.endDate.getTime()) {
        this.occupation=o;
        this.isoccupiedDx = true;
      }
      if (d !== o.startDate.getTime() && d !== o.endDate.getTime()) {
        this.occupation=o;
        this.isoccupiedCx = true;
      }
      if (d !== o.startDate.getTime() && d === o.endDate.getTime()) {
        this.isoccupiedSx = true;
      }
    }
  }
 }
}
