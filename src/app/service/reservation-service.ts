import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of, throwError } from "rxjs";
import { ChangeReservationArg } from '../scheduler/changereservationarg';
import { SearchReservationArg } from '../scheduler/searchreservationargs';
import { ReservationDto } from '../model/reservationdto';
import { RoomDto } from '../model/roomdto';
import { BookingDto } from '../model/bookingdto';
import { BookingsIntoDto } from "../model/BookingsIntoDto";
import { PersonDto } from '../model/persondto';
import { environment } from "src/environments/environment";
import { PremierService } from "../model/PremierService";
import { SocieteDivers } from "../model/SocieteDivers";
import { ListeArrivee } from "../model/listeArrivee";
import { ListeArriveeDto } from "../model/ListeArriveeDto";
import { Categorie } from "../model/Categorie";
import { Arrangement } from "../model/Arrangement";
import { TypeMoyenReservation } from "../model/TypeMoyenReservation";
import { OccupationDto } from "../model/Occupation";
import { Occupation } from "../model/Occupation1";
import { ChangeOccupationArg } from "../scheduler/changerOccupation";
import { OccupationDtoDt } from "../model/OccupationDtoDt";
@Injectable()
export class ReservationService {
  bookings: BookingDto[];
  occupations:Occupation[];
  private apiUrl: string = environment.urlApi;
  listChambre: RoomDto[] = [];
  premierService:PremierService[];
  numeroReservation:string=""
  constructor(private http: HttpClient) {}
private serciceRoom(){
    return this.http.get<RoomDto[]>( this.apiUrl+'Chambres/GetListe').toPromise();
  }
  private BookingService(){
    return this.http.get<BookingsIntoDto[]>(this.apiUrl+"Chambres/GetBooking").toPromise();
   }
   public premierServiceSv(){
    return this.http.get<PremierService[]>(this.apiUrl+"PremierServices/listeService").toPromise();
   }
   public NumeroReservationService(){
    return this.http.get<any>(this.apiUrl+"CompteurPieces/NumeroReservation").toPromise();
   }
   public NumeroArriveeService(){
    return this.http.get<any>(this.apiUrl+"CompteurPieces/NumeroArrivee").toPromise();
   }
   public societeDiversService(){
    return this.http.get<SocieteDivers[]>(this.apiUrl+"SocieteDivers/getListe").toPromise();
   }
   public listeArriveeService(){
    return this.http.get<ListeArrivee[]>(this.apiUrl+"ReceptionGroupes/ListeArrivee").toPromise();
   }
  public ListCategorieService(){
    return this.http.get<Categorie[]>(this.apiUrl+"Categories/GetCategorie").toPromise();
  }
  public ListArrangementService(){
    return this.http.get<Arrangement[]>(this.apiUrl+"TypeReservations/GetArrongement").toPromise();
  }
  public MoyenReservationService(){
    return this.http.get<TypeMoyenReservation[]>(this.apiUrl+"TypeMoyenReservations/MoyenReservation").toPromise();
  }
  public AddReservationService(obj:any){
    return this.http.post<any>(this.apiUrl+"Reservations/Reservation",obj).toPromise();
  }
  AddReservation(obj:any){
    this.AddReservationService(obj).then(res=>{});
  }
  getListeMoyenReservation(){
    var r =new Array<TypeMoyenReservation>();
    let moyenreservaation:TypeMoyenReservation;
    this.MoyenReservationService().then((res:any[])=>{
      for(let i=0;res.length;i++){
        moyenreservaation=new TypeMoyenReservation();
        moyenreservaation.CodeMoyen=res[i].codeMoyen;
        moyenreservaation.LibelleMoyen=res[i].libelleMoyen;
        r.push(moyenreservaation);
      }
    });
    return r ;
  }
  ListOccupationService(){
    return this.http.get<OccupationDto[]>(this.apiUrl+"Chambres/Get/Reservation").toPromise();
  }

  private getAllOccupation(): Occupation[] {

    if (this.occupations) {
      return this.occupations;
    }
    const b = new Array<Occupation>();
    this.occupations = b;
    this.createOccupation(b);
    return b;
  }
private createOccupation(b) {
    let occupation: Occupation;
    let x:number=0;
    this.ListOccupationService().then((res:any[])=>{
      for(let i=0;res.length;i++){
        occupation = new Occupation();
        occupation.occupationId=res[i].bookingId;
        occupation.roomId = res[i].roomId;
        occupation.startDate =new Date(res[i].anneeDebut,res[i].moisDebut-1,res[i].jourDebut);
        occupation.endDate = new Date(res[i].anneeFin,res[i].moisFin-1,res[i].jourFin);
        occupation.stayDay = res[i].stayDay;
        occupation.name = res[i].name;
        b.push(occupation);
      }
    });
  }
  getListeCategorie(){
    var r=new Array<Categorie>();
    let categorie:Categorie;
    this.ListCategorieService().then((res:any[])=>{
      for(let i=0;res.length;i++){
        categorie=new Categorie();
        categorie.CodeCategorie=res[i].codeCategorie;
        categorie.Designation=res[i].designation;
        categorie.ParametreContrat = res[i].parametreContrat;
        categorie.NbrePersonne = res[i].nbrePersonne;
        categorie.NumeroPrestation = res[i].numeroPrestation;
        r.push(categorie);
      }
    });
    return r ;
  }
  getListeArrangement(){
    var r=new Array<Arrangement>();
    let arrangement:Arrangement;
    this.ListArrangementService().then((res:any[])=>{
      for(let i=0;res.length;i++){
        arrangement=new Arrangement();
        arrangement.CodePremierService=res[i].codePremierService;
        arrangement.CodeTypeReservation=res[i].CodeTypeReservation;
        arrangement.LibelleTypeReservation=res[i].libelleTypeReservation;
        arrangement.NbreRepas=res[i].NbreRepas;
        arrangement.NumeroPrestation=res[i].numeroPrestation;
        arrangement.ParametreContrat=res[i].parametreContrat;
        r.push(arrangement);
      }
    });
    console.log("dvdvdv",r);
    return r ;
  }
   public getListArrivee(){
    var r= new Array<ListeArriveeDto>();
    let listeArrivee:ListeArriveeDto;
    this.listeArriveeService().then((res:any[])=>{
      for(let i=0;res.length;i++){
        listeArrivee=new ListeArriveeDto();
        listeArrivee.NumeroReservation=res[i].numeroReservation;
        listeArrivee.NumeroReservation = res[i].numeroReservation;
        listeArrivee.NumeroSociete = res[i].numeroSociete;
        listeArrivee.DateArrivee=new Date(res[i].anneeArrivee,res[i].moisArrivee,res[i].jourArrivee)
        listeArrivee.DateDepart=new Date(res[i].anneeDepart,res[i].moisDepart,res[i].jourDepart)
        listeArrivee.NbrePersonne = res[i].nbrePersonne;
        listeArrivee.CodeTypeReservation = res[i].codeTypeReservation;
        listeArrivee.CodePremierService = res[i].codePremierService;
        listeArrivee.PersonneReserveur = res[i].personneReserveur;
        listeArrivee.NomReserveur = res[i].nomReserveur;
        listeArrivee.NumeroTel = res[i].numeroTel;
        listeArrivee.CodeModeReglement = res[i].codeModeReglement;
        listeArrivee.MontantAvance = res[i].montantAvance;
        listeArrivee.Observation = res[i].observation;
        listeArrivee.DesignationSociete = res[i].designationSociete;
        listeArrivee.LibellePremierService = res[i].libellePremierService;
        listeArrivee.Libelle = res[i].libelle;
        listeArrivee.LibelleTypeReservation = res[i].libelleTypeReservation;
        listeArrivee.NomUtilisateur = res[i].nomUtilisateur;
        listeArrivee.PrenomReserveur = res[i].prenomReserveur;
        r.push(listeArrivee);

      }
    });
    console.log(r);
    return r;
   }
   public getAllSocieteDivers():SocieteDivers[]{
    var r =new Array<SocieteDivers>();
    let societeDivers:SocieteDivers;
    this.societeDiversService().then((res:any[])=>{
      for(let i=0;res.length;i++){
        societeDivers=new SocieteDivers();
        societeDivers.NumeroSociete=res[i].numeroSociete;
        societeDivers.AdresseSociete=res[i].adresseSociete;
        societeDivers.DesignationSociete=res[i].designationSociete;

        r.push(societeDivers);
      }
    });
   return r ;
   }
   public getNumeroReservation(){
    var numero:string;
      this.NumeroReservationService().then((res:any)=>{
        console.log("res",res.numeroReservationEncours);
        numero=res.numeroReservationEncours;
      });
      console.log(numero);
    return numero;
   }
   public getPremierService():PremierService[]{
    var r = new Array<PremierService>();
    let prService: PremierService;
    this.premierServiceSv().then((res:any[])=>{
      for(let i=0;res.length;i++){
        prService=new PremierService();
        prService.codePremierService = res[i].codePremierService;
        prService.libellePremierService = res[i].libellePremierService;
        r.push(prService);
      }
    });
    return r;
   }
  getRooms(): Observable<object> {
    let rooms: RoomDto[];
    rooms = this.getAllRoom();
    return of(rooms);
  }
  getReservations(args: ChangeReservationArg): Observable<object> {
    console.log("reservation");

    const res = new ReservationDto();
    let list1 = this.getAllRoom();
    if (args.roomtype !== 0) {
      list1 = list1.filter(l => l.roomType === args.roomtype);
    }
    res.rooms  = list1;
    let list2 = this.getAllBooking();
    if (args.roomtype !== 0) {
      list2 = list2.filter(l => l.roomType === args.roomtype);
    }
    res.bookings = list2;
    return of(res);
  }
  getOccupations(args: ChangeOccupationArg): Observable<object> {
    console.log("occupation");

    const res = new OccupationDtoDt();
    let list1 = this.getAllRoom();
    if (args.roomtype !== 0) {
      list1 = list1.filter(l => l.roomType === args.roomtype);
    }
    res.rooms  = list1;
    let list2 = this.getAllOccupation();
    if (args.roomtype !== 0) {
      list2 = list2.filter(l => l.roomType === args.roomtype);
    }
    res.occupation = list2;
    return of(res);
  }
  getReservationByName(args: SearchReservationArg): Observable<object> {

    const persons = new Array<PersonDto>();
    if (args.year === 0 && args.month === 0 && args.name === '') {
      return of(persons);
    }
    let list = this.getAllBooking();
    if (args.year !== 0) {
      list = list.filter(l => l.startDate.getFullYear() === args.year);
    }
    if (args.month !== 0) {
      list = list.filter(l => l.startDate.getMonth() === args.month - 1);
    }
    if (args.name !== '') {
      list = list.filter(l => l.name.startsWith(args.name) === true);
    }
    for (const b of list) {
      const p = new PersonDto();
      p.bookingId = b.bookingId;
      p.roomId = b.roomId;
      p.roomType = b.roomType;
      p.roomNumber = this.getRoomById(p.roomId).roomNumber;
      p.roomTypeName = this.getRoomById(p.roomId).roomTypeName;
      p.startDate = b.startDate;
      p.endDate = b.endDate;
      p.stayDay = b.stayDay;
      p.name = b.name;
      persons.push(p);
    }
    return of(persons);
  }
  insertReservation(booking: BookingDto): Observable<string> {
    const list = this.getAllBooking();
    for (const item of list) {
      if (booking.bookingId !== item.bookingId && booking.roomId === item.roomId) {
        if (booking.startDate >= item.startDate && booking.startDate < item.endDate) {
          return throwError('wrong startDate: ' + booking.startDate.toString());
        }
        if (booking.endDate > item.startDate && booking.startDate < item.endDate) {
          return throwError('wrong endDate: ' + booking.endDate.toString());
        }
      }
    }
    booking.bookingId = this.maxValue(list) + 1;
    list.push(booking);
    return of('ok');
  }
  updateReservation(booking: BookingDto): Observable<string> {
    const list = this.getAllBooking();

    for (const item of list) {
      if (booking.bookingId !== item.bookingId && booking.roomId === item.roomId) {
        if (booking.startDate >= item.startDate && booking.startDate < item.endDate) {
          return throwError('wrong startDate: ' + this.formatGMY(booking.startDate));
        }
        if (booking.endDate > item.startDate && booking.startDate < item.endDate) {
          return throwError('wrong endDate: ' + this.formatGMY(booking.endDate));
        }
      }
    }
    const index = list.findIndex(x => x.bookingId === booking.bookingId);
    list[index] = booking;
    return of('ok');
  }
  deleteReservation(id: number): Observable<string> {
    const list = this.getAllBooking();
    const index = list.findIndex(x => x.bookingId === id);
    list.splice(index, 1);
    return of('ok');
  }
  private formatGMY(date: Date): string {
    return date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();
  }
  private maxValue(list: BookingDto[]): number {
    return list.reduce((max, p) => p.bookingId > max ? p.bookingId : max, list[0].bookingId);
  }
  private cloneBooking(list: BookingDto[]): BookingDto[] {
    const a = new Array<BookingDto>();
    for (const b of list) {
      a.push(b);
    }
    return a;
  }
  public getRoomById(value: number): RoomDto {
    const list = this.getAllRoom();
    const r = list.filter(l => l.roomId === value)[0];
    return r;
  }
  public getAllRoom(): RoomDto[] {
    var r = new Array<RoomDto>();
    let room: RoomDto;
    var a:any;
    this.serciceRoom().then((res:any[])=>{
      for(let i=0;res.length;i++){
        room = new RoomDto();
        room.roomId = res[i].roomId;
        room.roomNumber = res[i].roomNumber;
        room.roomType =res[i].roomType;
        room.roomTypeName = res[i].roomTypeName;
        r.push(room);
      }
    });
    return r;
  }
  private getAllBooking(): BookingDto[] {
    if (this.bookings) {
      return this.bookings;
    }
    const b = new Array<BookingDto>();
    this.bookings = b;
    this.createBokingDto1(b);
    return b;
  }
private createBokingDto1(b) {
    let booking: BookingDto;
    let x:number=0;
    this.BookingService().then((res:any[])=>{
      for(let i=0;res.length;i++){
        booking = new BookingDto();
        booking.bookingId=res[i].bookingId;
        booking.roomId = res[i].roomId;
        booking.startDate =new Date(res[i].anneeDebut,res[i].moisDebut-1,res[i].jourDebut);
        booking.endDate = new Date(res[i].anneeFin,res[i].moisFin-1,res[i].jourFin);
        booking.stayDay = res[i].stayDay;
        booking.name = res[i].name;
        b.push(booking);
      }
    });

  }
}
