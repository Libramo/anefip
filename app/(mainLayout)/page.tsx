import { JobFilter } from "@/components/general/JobFilters";
import { JobListingLoading } from "@/components/general/JobListingLoading";
import { JobListings } from "@/components/general/JobListings";
import { Suspense } from "react";

type SearchParams = {
  searchParams: Promise<{
    page?: string;
    jobTypes?: string;
    location?: string;
  }>;
};

export default async function Home({ searchParams }: SearchParams) {
  const params = await searchParams;

  const currentPage = Number(params.page) || 1;
  const jobTypes = params.jobTypes?.split(",") || [];
  const locations = params.location?.split(",") || [];

  const filterKey = `page=${currentPage};types=${jobTypes.join(
    ","
  )};locations=${locations}`;

  return (
    <div className="grid grid-cols-4 gap-8">
      <JobFilter />

      <div className="col-span-3 flex flex-col gap-6">
        <Suspense fallback={<JobListingLoading />} key={filterKey}>
          <JobListings
            locations={locations}
            currentPage={currentPage}
            jobTypes={jobTypes}
          />
        </Suspense>
      </div>
    </div>
  );
}
