export interface Dashboard {
  slug: string;
  name: string;
  hexUrl: string;
}

export const dashboards: Dashboard[] = [
  {
    slug: "sales-pipeline",
    name: "Sales Pipeline",
    hexUrl:
      "https://app.hex.tech/019c2f69-46f3-7111-b501-4cbddb1cdbd0/app/032hTXt6OTCuAz0zTSBccE/latest?embedded=true",
  },
  // Add more dashboards here
];

export function getDashboard(slug: string): Dashboard | undefined {
  return dashboards.find((d) => d.slug === slug);
}
