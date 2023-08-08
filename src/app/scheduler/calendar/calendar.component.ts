import { Component, Input, Output, EventEmitter, ViewChild, OnInit } from '@angular/core';
import { CalendarNavbarComponent } from '../calendar-navbar/calendar-navbar.component';
import { DateManager, DateAndWeek, StepHours } from '../datemanager';
import { ChangeReservationArg } from '../changereservationarg';
import { ChangeDateArg } from '../changedatearg';
import { RoomDto } from 'src/app/model/roomdto';
import { BookingDto } from 'src/app/model/bookingdto';
import { HeaderDays } from '../model/headerdays';
import { StatusbarArg } from '../changestatusbarargs';
import { ReservationArg } from '../reservationargs';
import { ReservationService } from 'src/app/service/reservation-service';
import { Occupation } from 'src/app/model/Occupation1';
import { ChangeOccupationArg } from '../changerOccupation';
import { OccupationArg } from '../occupationArgs';
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  @Input() year: number;
  @Input() month: number;
  @Input() day: number;
  @Input() rooms: RoomDto[];
  @Input() occupations: Occupation[];
  @Input() bookings: BookingDto[];
  @Output() changereservation = new EventEmitter<ChangeReservationArg>();
  @Output() changeoccupation = new EventEmitter<ChangeOccupationArg>();
  @Output() reservation = new EventEmitter<ReservationArg>();
  @Output() Occ = new EventEmitter<OccupationArg>();
  @ViewChild(CalendarNavbarComponent) navbar;
  stepdays: DateAndWeek[] = [];
  stephours: StepHours[] = [];
  headerdays: HeaderDays;
  vm:BookingDto;
  statusbar: BookingDto;
  manager: DateManager;
  constructor(private service:ReservationService) {
    this.manager = new DateManager();
    this.rooms = [];
    this.bookings = [];
    this.occupations=[];
  }

  get currentYMD(): Date {
    if (this.navbar) {
      return this.navbar.currymd;
    } else {
      return undefined;
    }
  }

  ngOnInit() {
    this.service.insertReservation(this.vm);
  }
  onDaysChanged(data: ChangeDateArg) {
    this.headerdays = data.days;
    const startDate = data.days.startDate;
    const endDate = data.days.endDate;
    const roomtype = data.roomtype;
    const args = new ChangeReservationArg(data.type, data.operation, roomtype, startDate, endDate);
    this.changereservation.emit(args);
  }
  onDaysOccChanged(data: ChangeDateArg) {
    this.headerdays = data.days;
    const startDate = data.days.startDate;
    const endDate = data.days.endDate;
    const roomtype = data.roomtype;
    const args = new ChangeOccupationArg(data.type, data.operation, roomtype, startDate, endDate);
    this.changeoccupation.emit(args);
  }
  onStatusbarChanged(args: StatusbarArg) {
    if (args.type === 'enter') {
      this.statusbar = args.booking;
    } else { 
      this.statusbar = undefined;
    }
  }
  onDayReservation(args: ReservationArg) {
    this.reservation.emit(args);
  }
  onDayOccupation(args: OccupationArg) {
    this.Occ.emit(args);
  }
}
