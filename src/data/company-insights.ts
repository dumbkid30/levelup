export type CompanyInsight = {
  name: string;
  slug: string;
  rating?: string; // e.g. "3.6/5"
  reputation?: string;
  culture?: string;
  growth?: string;
  compensation?: string;
  caveats?: string[];
};

// Initial static dataset. Extend this as needed with more companies.
const COMPANY_INSIGHTS: CompanyInsight[] = [
  {
    name: "Hyperpure",
    slug: "hyperpure",
    rating: "3.6/5",
    reputation:
      "Considered a fast-growing B2B supplies business under the Zomato umbrella, with solid brand backing.",
    culture:
      "Fast-paced, operations-heavy environment with a strong focus on execution and delivery reliability.",
    growth:
      "Good ownership and learning opportunities, especially for people comfortable with supply-chain and on-ground operations.",
    compensation:
      "Generally competitive for supply-chain and operations roles in its segment; senior roles can be significantly higher than market average.",
    caveats: [
      "Work-life balance can be challenging due to operational pressures and peak-period workloads.",
      "Roles can be demanding and may involve on-ground/shift work depending on function."
    ]
  }
];

export function getCompanyInsight(query: string): CompanyInsight | null {
  const lower = query.toLowerCase().trim();

  // Try exact slug or name match first
  const direct = COMPANY_INSIGHTS.find(
    (c) => c.slug === lower || c.name.toLowerCase() === lower
  );
  if (direct) return direct;

  // Fuzzy contains match
  const fuzzy = COMPANY_INSIGHTS.find((c) =>
    lower.includes(c.slug) || lower.includes(c.name.toLowerCase())
  );
  return fuzzy ?? null;
}
