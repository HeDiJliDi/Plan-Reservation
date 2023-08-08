export class Reservation {
  public NumeroReservation: string ;
  public NumeroSociete: string;
  public DateArriver: Date;
  public DateDepart: Date ;
  public NbrePersonne: number;
  public CodeTypeReservation: string;
  public CodePremierService: string ;
  public PersonneReserveur: string ;
  public NomReserveur: string ;
  public NumeroTel: string ;
  public CodeModeReglement: string ;
  public MontantAvance: number;
  public Observation: string ;
  public NomUtilisateur: string ;
  public PrenomReserveur: string ;
  public CodeMoyen: string;
  public DateReservation: Date ;
  public Categorie:number;
  constructor() {
    this.DateArriver = new Date();
    this.DateDepart = new Date();
    this.DateReservation = new Date();
    this.NbrePersonne = 0;
    this.MontantAvance = 0;
    this.NumeroReservation = "";
    this.NumeroSociete = "";
    this.CodeTypeReservation = "";
    this.PersonneReserveur = "";
    this.NomReserveur = "";
    this.NumeroTel = "";
    this.CodeModeReglement = "";
    this.Observation = "";
    this.NomUtilisateur = "";
    this.PrenomReserveur = "";
    this.CodeMoyen = "";
    this.CodePremierService = "";
    this.Categorie = 0;

  }
}
