import { FirestoreDataConverter } from "@angular/fire/firestore";
import { FestiUser } from "./eltDefinitions";
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
    prenom : uc.user.displayName?.split(" ")[0] ?? "",
    nom : uc.user.displayName?.split(" ")[1] ?? "",
    email : uc.user.email ?? "",
    dateNaissance : new Date(),
    photoUrl : uc.user.photoURL ?? "https://cdn-icons-png.flaticon.com/512/1077/1077012.png"
})

