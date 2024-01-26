export interface FestiUser{
  name: string
  email: string
  readonly photoUrl : string
}

export interface Festival {
  nom: string,
  lieuPrincipal: string,
  dateDebut: Date,
  dateFin: Date,
  domaine: string,
  sousDomaine: string,
  siteWeb: string,
  nbPassDispo: number,
  nbPassIndispo: number,
  nbPassTotal: number,
  tarifPass: number,
  status: string
}