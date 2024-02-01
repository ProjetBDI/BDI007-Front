import { FirestoreDataConverter, doc, docData } from "@angular/fire/firestore";
import { Panier, Utilisateur, UtilisateurBD } from "./eltDefinitions";
import { UserCredential } from "@angular/fire/auth";

export const convUserToUtilisateur : FirestoreDataConverter<Utilisateur> = {
    toFirestore : val => val,
    fromFirestore : snap => ({
        idUtilisateur: snap.get("idUtilisateur"),
        email: snap.get("email"),
        nom: snap.get("nom"),
        prenom: snap.get("prenom") ?? "",
        motDePasse: snap.get("motDePasse") ?? "",
        dateNaissance: snap.get("dateNaissance"),
        telephone: snap.get("telephone") ?? "",
        photoUrl: snap.get("photoUrl") ?? "https://cdn-icons-png.flaticon.com/512/1077/1077012.png",
    }) as Utilisateur
}

// convert UserCredential to FestiUser
export const convUserCredentialToUtilisateur = (uc: UserCredential, nom: string, prenom: string, dateNaissance: Date, password: string, telephone: string) : Utilisateur => ({
    idUtilisateur: -1,
    email: uc.user?.email ?? "",
    nom: nom,
    prenom: prenom,
    motDePasse: password,
    dateNaissance: dateNaissance,
    telephone: telephone,
    photoUrl: uc.user?.photoURL ?? "https://cdn-icons-png.flaticon.com/512/1077/1077012.png",
})

export const convUtilisateurToUtilisateurBD = (user: Utilisateur) : UtilisateurBD => ({
    email: user.email,
    nom: user.nom,
    prenom: user.prenom,
    motDePasse: user.motDePasse,
    dateNaissance: user.dateNaissance,
    telephone: user.telephone,
})
