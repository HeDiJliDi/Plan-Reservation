import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { BookingDto } from 'src/app/model/bookingdto';
import { DateManager, DateAndWeek } from '../datemanager';
import { HeaderDays, MonthsDay } from '../model/headerdays';
import { SelectReservationArg } from '../selectreservationarg';
import { ChangeDateArg } from '../changedatearg';
import { Utility } from 'src/app/appcore/utility';

import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ReservationService } from 'src/app/service/reservation-service';
import { FormReservationGroupeComponent } from 'src/app/components/form-reservation-groupe/form-reservation-groupe.component';
import { ReservationArg } from '../reservationargs';
import { FormReservationIndividuelComponent } from 'src/app/components/form-reservation-individuel/form-reservation-individuel.component';
import { FormReceptionIndividuelComponent } from 'src/app/components/form-reception-individuel/form-reception-individuel.component';
import { log } from 'util';
@Component({
  selector: 'app-calendarnavbar',
  templateUrl: './calendar-navbar.component.html',
  styleUrls: ['./calendar-navbar.component.css']
})
export class CalendarNavbarComponent implements OnInit {
  @Input() day: number;
  @Input() month: number;
  @Input() year: number;
  @Input() statusbar: BookingDto;
  @Input() manager: DateManager;
  @Output() changedays = new EventEmitter<ChangeDateArg>();
  currymd: Date;
  currvalues: DateAndWeek;
  datpicker: Date;
  cbrooms: any[];
  type: string;
  roomtype = '0';
  args:ReservationArg;
  prime:boolean=false;


  constructor(private service: ReservationService,private dialog: MatDialog )  {

  }

  ngOnInit() {
    this.type = 'month';
    const roomtype = +this.roomtype;
    this.currymd = new Date(this.year, this.month - 1, 1);
    this.currvalues = this.getCurrentValues();
    this.datpicker = new Date(this.currymd);
    const hd = this.createHeaderDays();
    const args = new ChangeDateArg(this.type, 'init', roomtype, hd);
    this.changedays.emit(args);
    this.onNext1Day();
    this.args.roomid=103;
    this.args.booking.bookingId=0;
    this.args.booking.startDate=new Date();
    this.args.booking.endDate=new Date();
    this.args.booking.roomId=103;
    this.args.booking.roomType=0;
    this.args.booking.stayDay=0;
    this.args.booking.name="";
    this.args.date=new Date();

  }

  onRoomChange(data) {
    this.roomtype = data.value;
    this.changeDays(this.type, 'refresh');
  }

  onPickerChange(e) {
    this.type = 'month';
    const date = Utility.toDate(e.value);
    date.setDate(1);
    this.currymd = new Date(date);
    this.changeDays(this.type, 'refresh');
  }

  onReservationSelected(args: SelectReservationArg) {
    this.type = 'month';
    const d = new Date(args.startDate);
    d.setDate(1);
    this.currymd = new Date(d);
    this.changeDays(this.type, 'refresh');
  }

  onPrev15Day() {
    this.type = '15day';
    const d = new Date(this.manager.getPrevMonth(this.currymd));
    d.setDate(15);
    this.currymd = new Date(d);
    this.changeDays(this.type, 'prev');
  }
  onPrev1Day() {
    this.type = '1day';
    const d = new Date(this.manager.getPrevMonth(this.currymd));
    d.setDate(1);
    this.currymd = new Date(d);
    this.changeDays(this.type, 'prev');
  }

  onNext15Day() {
    this.type = '15day';
    const d = new Date(this.manager.getNextMonth(this.currymd));
    d.setDate(15);
    this.currymd = new Date(d);
    this.changeDays(this.type, 'next');
  }
  onNext1Day() {
    this.type = '1day';
    const d = new Date(this.manager.getNextDay(this.currymd));
    d.setDate(1);
    this.currymd = new Date(d);
    this.changeDays(this.type, 'next');
  }


  onPrevMonth() {
    if (this.type === '15day') {
      const d = this.manager.getDaysInTheMonth(this.currymd);
      this.currymd = new Date(this.currymd.getFullYear(), this.currymd.getMonth(), 1);
    } else {
      this.currymd = new Date(this.manager.getPrevMonth(this.currymd));
    }
    this.type = 'month';
    this.changeDays(this.type, 'prev');
  }

  onNextMonth() {
    if (this.type === '15day') {
      const d = this.manager.getDaysInTheMonth(this.currymd);
      this.currymd = new Date(this.currymd.getFullYear(), this.currymd.getMonth(), d);
    } else {
      this.currymd = new Date(this.manager.getNextMonth(this.currymd));
    }
    this.type = 'month';
    this.changeDays(this.type, 'next');
  }

  private changeDays(type: string, operation: string) {
    const roomtype = +this.roomtype;
    this.datpicker = new Date(this.currymd);
    this.currvalues = this.getCurrentValues();
    const hd = this.createHeaderDays();
    const args = new ChangeDateArg(type, operation, roomtype, hd);
    this.changedays.emit(args);
  }

  private createHeaderDays(): HeaderDays {
    const h = new HeaderDays();
    let currdate = new Date(this.currymd);
    const dd = currdate.getDate();
    const days = (dd === 1) ? this.manager.getDaysInTheMonth(currdate) : 31;
    for (let i = 0; i < days; i++) {
      if (i > 0) {
        currdate = this.manager.getNextDay(currdate);
      }
      const dw = this.manager.getDateAndWeekValues(currdate);
      h.headDaysAll.push(dw);
    }
    h.startDate = h.headDaysAll[0].date;
    h.endDate = h.headDaysAll[h.headDaysAll.length - 1].date;
    const firstmonth = h.headDaysAll[0].date.getMonth();
    for (const dayhead of h.headDaysAll) {
      if (dayhead.date.getMonth() === firstmonth) {
        h.headDays1.push(dayhead);
      } else {
        h.headDays2.push(dayhead);
      }
    }
    if (h.headDays1.length > 0) {
      const monthName1 = h.headDays1[0].monthName;
      const m1 = new MonthsDay(monthName1, h.headDays1.length);
      h.months.push(m1);
    }
    if (h.headDays2.length > 0) {
      const monthName2 = h.headDays2[0].monthName;
      const m2 = new MonthsDay(monthName2, h.headDays2.length);
      h.months.push(m2);
    }
    return h;
  }

  private getCurrentValues(): DateAndWeek {
    return this.manager.getDateAndWeekValues(this.currymd);
  }


  // openReservationModal()
  // {
  //   const dialogConfig = new MatDialogConfig();
  //   dialogConfig.width = '800px';
  //   dialogConfig.height = '700px';
  //   const dialogRef = this.dialog.open(FormReservationGroupeComponent, dialogConfig);
  //   dialogRef.afterClosed().subscribe(data => {
  //     });



  // }
  // openReservationIndivModal(){
  //   const dialogConfig = new MatDialogConfig();
  //   dialogConfig.width = '800px';
  //   dialogConfig.height = '700px';
  //   const dialogRef = this.dialog.open(FormReservationIndividuelComponent, dialogConfig);
  //   dialogRef.afterClosed().subscribe(data => {
  //     });
  // }
  // openReceptionIndivModal(){
  //   const dialogConfig = new MatDialogConfig();
  //   dialogConfig.width = '800px';
  //   dialogConfig.height = '850px';
  //   const dialogRef = this.dialog.open(FormReceptionIndividuelComponent, dialogConfig);
  //   dialogRef.afterClosed().subscribe(data => {
  //     });
  // }
}
