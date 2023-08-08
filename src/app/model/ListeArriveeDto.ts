export class ListeArriveeDto {
  NumeroReservation: string = '';
  NumeroSociete: string = '';
  DateArrivee:Date;
  DateDepart:Date;
  NbrePersonne: number = 0;
  CodeTypeReservation: string = '';
  CodePremierService: string = '';
  PersonneReserveur: string = '';
  NomReserveur: string = '';
  NumeroTel: string = '';
  CodeModeReglement: string = '';
  MontantAvance: number = 0;
  Observation: string = '';
  DesignationSociete: string | null = null;
  LibellePremierService: string | null = null;
  Libelle: string | null = null;
  LibelleTypeReservation: string | null = null;
  NomUtilisateur: string = '';
  PrenomReserveur: string = '';


constructor(

) {
  this.NumeroReservation =  '';
  this.NumeroSociete =  '';
  this.DateArrivee=new Date();
  this.DateDepart=new Date();
  this.NbrePersonne = 0;
  this.CodeTypeReservation =
  this.CodePremierService =
  this.PersonneReserveur = '';
  this.NomReserveur = '';
  this.NumeroTel ='';
  this.CodeModeReglement = '';
  this.MontantAvance = 0;
  this.Observation = '';
  this.DesignationSociete = '';
  this.LibellePremierService = '';
  this.Libelle = '';
  this.LibelleTypeReservation = '';
  this.NomUtilisateur = '';
  this.PrenomReserveur = '';
}
}
