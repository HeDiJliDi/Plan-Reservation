export class Occupation{
  occupationId: number;
  roomId: number;
  roomType: number;
  startDate: Date;
  endDate: Date;
  stayDay: number;
  name: string;
  numeroReservation:string;

  constructor() {
    this.occupationId = 0;
    this.roomId = 0;
    this.roomType = 0;
    this.startDate = undefined;
    this.endDate = undefined;
    this.stayDay = 0;
    this.name = '';
    this.numeroReservation ="";
  }

}

