export interface FestiUser{
  name: string
  email: string
  readonly photoUrl : string,
  dateNaissance?: String,
}

export interface PanierState {
  panier: Panier,
  covoiturage: Covoiturage,
  etapes: Etape[],
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

export interface Panier {
  etapes: Etape[]
  date: Date,
  proprietaire: FestiUser | undefined,
  nomFestivaliers: string[] // ex: "Arthur - Alex - Kyks - Vincent" à split pour faire une liste
  nbPlaceOccuppee: number,
}

export interface Etape {
  id: number,
  lieu: Lieu,
  covoiturage: Covoiturage,
  dureeDepuisDepart: number,
  prixEtape: number,
}

export interface Covoiturage {
  id: number,
  dateDepart: Date,
  nbPlace: number,
  nbPlaceDispo: number,
  marque: string,
  modele: string,
  couleur: string,
  prixParPersonne: number,
  conducteur: FestiUser,
  festival: Festival,
}

export interface Lieu {
  id: number,
  nom: string,
  adresse: string,
  codeINSEE: string,
  latitude: number,
  longitude: number,
  typeLieu: string,
  commune: Commune
}

export interface Commune {
  id: number,
  codeINSEE: string,
  codePostal: string,
  latitude: number,
  longitude: number,
  nom: string,
  departement: Departement
}

export interface Departement {
  id: number,
  code: string,
  nom: string,
  region: string
}