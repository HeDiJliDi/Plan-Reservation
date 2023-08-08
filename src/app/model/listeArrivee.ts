export class ListeArrivee {
  NumeroReservation: string = '';
  NumeroSociete: string = '';
  JourArrivee: number = 0;
  AnneeArrivee: number = 0;
  MoisArrivee: number = 0;
  JourDepart: number = 0;
  AnneeDepart: number = 0;
  MoisDepart: number = 0;
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
  numeroReservation: string,
  numeroSociete: string,
  jourArrivee: number,
  anneeArrivee: number,
  moisArrivee: number,
  jourDepart: number,
  anneeDepart: number,
  moisDepart: number,
  nbrePersonne: number,
  codeTypeReservation: string,
  codePremierService: string,
  personneReserveur: string,
  nomReserveur: string,
  numeroTel: string,
  codeModeReglement: string,
  montantAvance: number,
  observation: string,
  designationSociete: string | null,
  libellePremierService: string | null,
  libelle: string | null,
  libelleTypeReservation: string | null,
  nomUtilisateur: string,
  prenomReserveur: string
) {
  this.NumeroReservation = numeroReservation;
  this.NumeroSociete = numeroSociete;
  this.JourArrivee = jourArrivee;
  this.AnneeArrivee = anneeArrivee;
  this.MoisArrivee = moisArrivee;
  this.JourDepart = jourDepart;
  this.AnneeDepart = anneeDepart;
  this.MoisDepart = moisDepart;
  this.NbrePersonne = nbrePersonne;
  this.CodeTypeReservation = codeTypeReservation;
  this.CodePremierService = codePremierService;
  this.PersonneReserveur = personneReserveur;
  this.NomReserveur = nomReserveur;
  this.NumeroTel = numeroTel;
  this.CodeModeReglement = codeModeReglement;
  this.MontantAvance = montantAvance;
  this.Observation = observation;
  this.DesignationSociete = designationSociete;
  this.LibellePremierService = libellePremierService;
  this.Libelle = libelle;
  this.LibelleTypeReservation = libelleTypeReservation;
  this.NomUtilisateur = nomUtilisateur;
  this.PrenomReserveur = prenomReserveur;
}
}
