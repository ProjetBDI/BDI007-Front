import { FirestoreDataConverter, doc, docData } from "@angular/fire/firestore";
import { FestiUser, Panier, UserBD } from "./eltDefinitions";
import { UserCredential } from "@angular/fire/auth";

export const convUserToFestiUser : FirestoreDataConverter<FestiUser> = {
    toFirestore : val => val,
    fromFirestore : snap => ({
        prenom : snap.get("prenom"),
        nom : snap.get("nom"),
        dateNaissance : snap.get("dateNaissance"),
        email : snap.get("email"),
        photoUrl : snap.get("photoUrl")
    })
}

// convert UserCredential to FestiUser
export const convUserCredentialToFestiUser = (uc: UserCredential) : FestiUser => ({
    nom : uc.user.displayName?.split(" ")[1] ?? "",
    prenom : uc.user.displayName?.split(" ")[0] ?? "",
    email : uc.user.email ?? "",
    dateNaissance : new Date(),
    photoUrl : uc.user.photoURL ?? "https://cdn-icons-png.flaticon.com/512/1077/1077012.png"
})

export const convUserBDToFestiUser = (userBD: UserBD) => ({
    nom : userBD.nom,
    prenom : userBD.prenom ?? "",
    email : userBD.email ?? "",
    dateNaissance : userBD.dateNaissance,
    photoUrl : ""
})
