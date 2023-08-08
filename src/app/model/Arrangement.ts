export  class Arrangement {
  public CodeTypeReservation: string ;
  public LibelleTypeReservation: string ;
  public ParametreContrat: boolean ;
  public NumeroPrestation: string;
  public NbreRepas: number ;
  public CodePremierService: string ;
  constructor(){
    this.CodeTypeReservation="";
    this.LibelleTypeReservation="";
    this.ParametreContrat=false;
    this.NumeroPrestation="";
    this.NbreRepas=0;
    this.CodePremierService="";
  }
}
