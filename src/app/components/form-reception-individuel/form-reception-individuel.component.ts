import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef,MatCardModule } from '@angular/material';
import { Subscription } from 'rxjs';
import { BookingDto } from 'src/app/model/bookingdto';
import { Utility } from 'src/app/appcore/utility';
import { ReservationService } from 'src/app/service/reservation-service';
import { RoomDto } from 'src/app/model/roomdto';
import { PremierService } from 'src/app/model/PremierService';
import { SocieteDivers } from 'src/app/model/SocieteDivers';
import { ListeArriveeDto } from 'src/app/model/ListeArriveeDto';

@Component({
  selector: 'app-form-reception-individuel',
  templateUrl: './form-reception-individuel.component.html',
  styleUrls: ['./form-reception-individuel.component.css']
})
export class FormReceptionIndividuelComponent implements OnInit, OnDestroy  {
  title: string;
  sub: Subscription;
  roomid: number;
  startDate: Date;
  endDate: Date;
  booking: BookingDto;
  rooms = new Array<RoomDto>();
  resrvationDate:Date;
  premierService=new Array<PremierService>();
  NumeroReservation:string="";
  societeDivers=new Array<SocieteDivers>();
  listeArrivee=new Array<ListeArriveeDto>();
  NumeroArrivee:string="";

  constructor(private service: ReservationService, private dialogRef: MatDialogRef<FormReceptionIndividuelComponent>, @Inject(MAT_DIALOG_DATA) private data: any) {


  }

  ngOnInit() {
    this.service.NumeroReservationService().then((res:any)=>{
      console.log("res",res.numeroReservationEncours);

      this.NumeroReservation=res.numeroReservationEncours;

    });

    this.service.NumeroArriveeService().then((res:any)=>{
      console.log("res",res.numeroReservationEncours);

      this.NumeroArrivee=res.numeroReservationEncours;

    });
    this.listeArrivee= this.service.getListArrivee();


    let societeDivers:SocieteDivers;
    this.service.societeDiversService().then((res:any[])=>{
      for(let i=0;res.length;i++){
        societeDivers=new SocieteDivers();
        societeDivers.NumeroSociete=res[i].numeroSociete;
        societeDivers.AdresseSociete=res[i].adresseSociete;
        societeDivers.DesignationSociete=res[i].designationSociete;

        this.societeDivers.push(societeDivers);
      }
    });

    console.log("organisme",this.societeDivers);



    this.resrvationDate=new Date();
    this.title="Création";
    this.rooms=this.service.getAllRoom();
    this.startDate=new Date();
    this.endDate=new Date();
    this.premierService=this.service.getPremierService();
    console.log("nummoe",""+this.NumeroReservation+"")



  }

  onConfirm(form: NgForm) {
    if (form.invalid === true) {
      return;
    }
    const vm = new BookingDto();
    vm.bookingId = this.booking.bookingId;
    vm.roomId = Utility.toInteger(form.value.roomid);
    vm.startDate = Utility.toDate(form.value.startDate);
    vm.endDate = Utility.toDate(form.value.endDate);
    vm.name = Utility.toString(form.value.name);
    //
    if (vm.endDate < vm.startDate) {
      alert('Attention: startDate > endDate');
      return;
    }
    const index = this.rooms.findIndex(x => x.roomId === vm.roomId);
    vm.roomType = this.rooms[index].roomType;
    this.computeStayDay(vm.startDate, vm.endDate);
    //
    if (vm.bookingId === 0) {
      this.service.insertReservation(vm).subscribe(
        result => this.dialogRef.close(result),
        error => alert(error)
      );
    } else {
      this.service.updateReservation(vm).subscribe(
        result => this.dialogRef.close(result),
        error => alert(error)
      );
    }
  }

  onDelete() {
    const id = this.booking.bookingId;
    this.service.deleteReservation(id).subscribe(
      result => this.dialogRef.close(result),
      error => alert(error)
    );
  }

  onClose() {
    this.dialogRef.close('no');
  }

  private computeStayDay(startDate: Date, endDate: Date): number {
    const valret = 0;
    return valret;
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

}

