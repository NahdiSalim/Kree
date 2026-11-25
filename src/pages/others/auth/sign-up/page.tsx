import { PageMeta } from "@/components/shared/page-meta";
import SignUp from "./index";

export default function SignUpPage() {
  return (
    <>
      <PageMeta
        title="Inscription propriétaire | Kree"
        description="Créez votre espace propriétaire Kree pour publier maisons et véhicules en Tunisie."
      />
      <SignUp />
    </>
  );
}
