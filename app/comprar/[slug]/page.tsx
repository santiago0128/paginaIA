import { redirect } from "next/navigation";

type Props = { params: { slug: string } };

export default function ComprarComparisonAliasPage({ params }: Props) {
  redirect(`/comparar/${params.slug}`);
}
