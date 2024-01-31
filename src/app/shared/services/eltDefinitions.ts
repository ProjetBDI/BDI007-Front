export interface Utilisateur {
  idUtilisateur: number,
  email: string,
  nom: string,
  prenom: string,
  motDePasse: string,
  dateNaissance?: Date,
  telephone: string,
  photoUrl: string,
}

export interface PanierEtape {
  idPanierEtape: number,
  nbPlaceOccupe: number,
  idEtape: Etape,
  idPanier: Panier,
}

export interface Festival {
  idFestival: number,
  nom: string,
  dateDebut: Date,
  dateFin: Date,
  siteWeb: string,
  lieuPrincipal: string,
  nbPassTotal: number,
  nbPassDispo: number,
  nbPassIndispo: number,
  tarifPass: number,
  status: string,
  idCommune: Commune,
  idDomaine: Domaine
}

export interface Panier {
  idPanier: number,
  datePaiement: Date,
  nomFestivaliers: string,
  idProprietaire: Utilisateur,
}

export interface Etape {
  idEtape: number,
  prixEtape: number,
  dureeDepuisDepart: number,
  idLieu: Lieu,
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
  conducteur: Utilisateur,
  festival: Festival,
}

export interface Lieu {
  idLieu: number,
  adresse: string,
  codeINSEELieu: string,
  latitude: number,
  longitude: number,
  nom: string,
  typeLieu: string,
  idCommune: Commune
}

export interface Commune {
  idCommune: number,
  codeINSEE: string,
  codePostal: string,
  latitude: number,
  longitude: number,
  nomCommune: string,
  idDepartement: Departement
}

export interface Departement {
  idDepartement: number,
  numDepartement: string,
  nomDepartement: string,
  nomregion: string
}

export interface Domaine {
  idDomaine: number,
  nomDomaine: string,
  sousDomaine: string
}