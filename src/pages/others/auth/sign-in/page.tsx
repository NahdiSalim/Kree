import { PageMeta } from "@/components/shared/page-meta";
import SignIn from "./index";

export default function SignInPage() {
  return (
    <>
      <PageMeta
        title="Connexion propriétaire | Kree"
        description="Espace propriétaire Kree — gérez vos annonces et demandes de réservation."
      />
      <SignIn />
    </>
  );
}
