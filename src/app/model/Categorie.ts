export  class Categorie {
  public CodeCategorie: string  ;
  public Designation: string  ;
  public ParametreContrat: boolean ;
  public NbrePersonne: number  ;
  public NumeroPrestation: string ;
  constructor(){
      this.CodeCategorie="";
      this.Designation="";
      this.ParametreContrat=false;
      this.NbrePersonne=0;
      this.NumeroPrestation="";

  }
}
