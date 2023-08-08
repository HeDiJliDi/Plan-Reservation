import { DateAndWeek } from './datemanager';
import { HeaderDays } from './model/headerdays';

export class ChangeOccupationArg {

  constructor(public type: string, public operation: string, public roomtype: number, public startDate: Date, public endDate: Date) { }

}
