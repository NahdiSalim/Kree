import { Helmet } from "react-helmet-async";

export function PageMeta({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <Helmet>
      <title>{title}</title>
      {description ? <meta name="description" content={description} /> : null}
    </Helmet>
  );
}
