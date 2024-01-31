import { FirestoreDataConverter, doc, docData } from "@angular/fire/firestore";
import { Panier, Utilisateur } from "./eltDefinitions";
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
export const convUserCredentialToUtilisateur = (uc: UserCredential) : Utilisateur => ({
    idUtilisateur: -1,
    email: uc.user?.email ?? "",
    nom: uc.user?.displayName?.split(" ")[1] ?? "",
    prenom: uc.user?.displayName?.split(" ")[0] ?? "",
    motDePasse: "",
    dateNaissance: new Date(2000,1,1),
    telephone: uc.user?.phoneNumber ?? "",
    photoUrl: uc.user?.photoURL ?? "https://cdn-icons-png.flaticon.com/512/1077/1077012.png",
})
