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

export interface UtilisateurBD {
  email: string,
  nom: string,
  prenom: string,
  motDePasse: string,
  dateNaissance?: Date,
  telephone: string,
}


export interface PanierEtape {
  idPanierEtape: number,
  nbPlaceOccupe: number,
  idEtape: Etape,
  idPanier: Panier,
  idCovoiturage: Covoiturage,
}

export interface InstanciationPanierEtape {
  nbPlaceOccupe: number,
  idPanier: number,
  idEtape: number
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

export interface IPanier {
  datePaiement: Date,
  nomsFestivaliers: string,
  idProprietaire: Utilisateur
}

export interface Panier extends IPanier{
  idPanier: number,
}


export interface Etape {
  idEtape: number,
  prixEtape: number,
  dureeDepuisDepart: number,
  idLieu: Lieu,
  idCovoiturage: Covoiturage,
}

export interface Covoiturage {
  idCovoiturage: number,
  nbPlace: number,
  nbPlaceDispo: number,
  marque: string,
  modele: string,
  couleur: string,
  dateDepart: Date,
  idConducteur: Utilisateur,
  idFestival: Festival,
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