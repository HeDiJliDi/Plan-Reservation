export class BookingsIntoDto {
  bookingId: number;
  roomId: number;
  roomType: number;
  anneeDebut:number;
  moisDebut:number;
  jourDebut:number;
  anneeFin:number;
  moisFin:number;
  jourFin:number;
  stayDay: number;
  name: string;

  constructor() {
    this.bookingId = 0;
    this.roomId = 0;
    this.roomType = 0;
    this.anneeDebut=2000;
    this.moisDebut=1;
    this.jourDebut=1;
    this.anneeFin=2000;
    this.moisFin=1;
    this.jourFin=1;
    this.stayDay = 0;
    this.name = '';
  }

}
