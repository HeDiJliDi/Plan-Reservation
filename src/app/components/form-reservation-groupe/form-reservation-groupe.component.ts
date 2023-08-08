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
import { Categorie } from 'src/app/model/Categorie';
import { Arrangement } from 'src/app/model/Arrangement';
import { TypeMoyenReservation } from 'src/app/model/TypeMoyenReservation';
import { Reservation } from 'src/app/model/Reservation';
@Component({
  selector: 'app-form-reservation-groupe',
  templateUrl: './form-reservation-groupe.component.html',
  styleUrls: ['./form-reservation-groupe.component.css']
})
export class FormReservationGroupeComponent implements OnInit, OnDestroy  {
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
  reservation=new Reservation();
  newDialog:boolean=false;
  lignes: any[] = [{ categorie: null, nbrChambre: null, CodeTypeReservation: null, nbrNuite: null }];
  constructor(private service: ReservationService, private dialogRef: MatDialogRef<FormReservationGroupeComponent>, @Inject(MAT_DIALOG_DATA) private data: any) {


  }

  ngOnInit() {
    this.service.NumeroReservationService().then((res:any)=>{
      console.log("res",res.numeroReservationEncours);

      this.NumeroReservation=res.numeroReservationEncours;

    });
    // this.societeDivers=this.service.getAllSocieteDivers();

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
    this.moyenReservation=this.service.getListeMoyenReservation();

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

  // onConfirm(form: NgForm) {
  //   if (form.invalid === true) {
  //     return;
  //   }
  //   const vm = new BookingDto();
  //   vm.bookingId = this.booking.bookingId;
  //   vm.roomId = Utility.toInteger(form.value.roomid);
  //   vm.startDate = Utility.toDate(form.value.startDate);
  //   vm.endDate = Utility.toDate(form.value.endDate);
  //   vm.name = Utility.toString(form.value.name);
  //   //
  //   if (vm.endDate < vm.startDate) {
  //     alert('Attention: startDate > endDate');
  //     return;
  //   }
  //   const index = this.rooms.findIndex(x => x.roomId === vm.roomId);
  //   vm.roomType = this.rooms[index].roomType;
  //   this.computeStayDay(vm.startDate, vm.endDate);
  //   //
  //   if (vm.bookingId === 0) {
  //     this.service.insertReservation(vm).subscribe(
  //       result => this.dialogRef.close(result),
  //       error => alert(error)
  //     );
  //   } else {
  //     this.service.updateReservation(vm).subscribe(
  //       result => this.dialogRef.close(result),
  //       error => alert(error)
  //     );
  //   }
  // }

  onConfirm(form: NgForm) {
    // Créer un objet JSON vide pour stocker les données du formulaire
    const formData = {};

    // Récupérer les valeurs des champs du formulaire
    formData['NumeroReservation'] = this.NumeroReservation;
    formData['NumeroSociete'] = Utility.toInteger(form.value.Organisme);
    formData['DateArriver'] = Utility.toDate(form.value.startDate);
    formData['DateDepart'] =  Utility.toDate(form.value.endDate);
    formData['NbrePersonne'] = form.value.nbPersonne;
    formData['CodePremierService'] = form.value.PremierService;
    formData['PersonneReserveur'] = form.value.bookingName;
    formData['NomReserveur'] = form.value.reserveur;
    formData['NumeroTel'] = form.value.telephone;
    formData['DateReservation'] = Utility.toDate(form.value.resrvationDate);
    formData['CodeMoyen'] = Utility.toInteger(form.value.moyenReservation);
    formData['Observation'] = form.value.Observation;
    formData['Categorie'] = form.value.categorie;
    formData['NombreChambre'] = form.value.nbrChambre;
    formData['CodeTypeReservation'] = form.value.CodeTypeReservation;
    formData['NombreNuite'] = Utility.toInteger(form.value.nbrNuite);
    formData['MontantAvance']=0;
    formData['CodeModeReglement']="";
    formData['NomUtilisateur']="";
    formData['PrenomReserveur']="";
    formData['NumeroChambre']=form.value.NumeroChambre;

    const jsonData = [formData];

    console.log(jsonData[0]);
    this.service.AddReservation(jsonData[0]);
    this.onClose();
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
  addNewRow() {
    if (this.isLastRowFilled()) {
      const lastRow = this.lignes[this.lignes.length - 1];
      const newRow = {
        categorie: lastRow.categorie,
        nbrChambre: lastRow.nbrChambre,
        CodeTypeReservation: lastRow.CodeTypeReservation,
        nbrNuite: lastRow.nbrNuite
      };
      this.lignes.push(newRow);
    }
  }
  isLastRowFilled() {
    const lastRow = this.lignes[this.lignes.length - 1];
    return lastRow.categorie && lastRow.nbrChambre && lastRow.CodeTypeReservation && lastRow.nbrNuite;
  }
}

