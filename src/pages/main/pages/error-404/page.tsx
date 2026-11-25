import { PageMeta } from "@/components/shared/page-meta";
import Error404 from "./index";

export default function Error404Page() {
  return (
    <div>
      <PageMeta
        title="Page introuvable | Kree"
        description="La page demandée n’existe pas sur Kree."
      />
      <Error404 />
    </div>
  );
}
