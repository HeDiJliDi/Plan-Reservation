import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Subscription } from 'rxjs';
import { BookingDto } from 'src/app/model/bookingdto';
import { Utility } from 'src/app/appcore/utility';
import { ReservationService } from 'src/app/service/reservation-service';
import { RoomDto } from 'src/app/model/roomdto';
import { PremierService } from 'src/app/model/PremierService';
import { SocieteDivers } from 'src/app/model/SocieteDivers';
import { Categorie } from 'src/app/model/Categorie';
import { Arrangement } from 'src/app/model/Arrangement';
import { TypeMoyenReservation } from 'src/app/model/TypeMoyenReservation';
import { ReservationDto } from 'src/app/model/reservationdto';

@Component({
  selector: 'app-form-reservation-individuel',
  templateUrl: './form-reservation-individuel.component.html',
  styleUrls: ['./form-reservation-individuel.component.css']
})
export class FormReservationIndividuelComponent implements OnInit, OnDestroy  {
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
  categorie=new Array<Categorie>();
  arrangement=new Array<Arrangement>();
  moyenReservation=new Array<TypeMoyenReservation>();
  reservation=new ReservationDto();

  constructor(private service: ReservationService, private dialogRef: MatDialogRef<FormReservationIndividuelComponent>, @Inject(MAT_DIALOG_DATA) private data: any) {


  }

  ngOnInit() {
    this.service.NumeroReservationService().then((res:any)=>{
      console.log("res",res.numeroReservationEncours);

      this.NumeroReservation=res.numeroReservationEncours;

    });
    // this.societeDivers=this.service.getAllSocieteDivers();
    this.moyenReservation=this.service.getListeMoyenReservation();

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
    this.arrangement=this.service.getListeArrangement();
    this.categorie=this.service.getListeCategorie();
    console.log(this.arrangement);
    console.log(this.categorie);



    this.resrvationDate=new Date();
    this.title="Création";
    this.rooms=this.service.getAllRoom();
    this.startDate=new Date();
    this.endDate=new Date();
    this.premierService=this.service.getPremierService();
    console.log("nummoe",""+this.NumeroReservation+"")

  }

  onConfirm(form: NgForm) {
    // Créer un objet JSON vide pour stocker les données du formulaire
    const formData = {};

    // Récupérer les valeurs des champs du formulaire
    formData['NumeroReservation'] = this.NumeroReservation;
    formData['startDate'] = Utility.toDate(form.value.startDate);
    formData['endDate'] =  Utility.toDate(form.value.endDate);
    formData['nbPersonne'] = form.value.nbPersonne;
    formData['PremierService'] = form.value.PremierService;
    formData['bookingName'] = form.value.bookingName;
    formData['reserveur'] = form.value.reserveur;
    formData['telephone'] = form.value.telephone;
    formData['resrvationDate'] = Utility.toDate(form.value.resrvationDate);
    formData['moyenReservation'] = form.value.moyenReservation;
    formData['Observation'] = form.value.Observation;
    formData['categorie'] = form.value.categorie;
    formData['nbrChambre'] = form.value.nbrChambre;
    formData['arrangement'] = form.value.CodeTypeReservation;
    formData['nbrNuite'] = Utility.toInteger(form.value.nbrNuite);

    const jsonData = [formData];

    console.log(jsonData);
    


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


