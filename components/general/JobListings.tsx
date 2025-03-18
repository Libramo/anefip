import { prisma } from "@/app/utils/db";
import { EmptyState } from "./EmptyState";
import { JobCard } from "./JobCard";
import { MainPagination } from "./MainPagination";
import { JobPostStatus } from "@prisma/client";

async function getData({
  page = 1,
  pageSize = 2,
  jobTypes = [],
  locations = [],
}: {
  page: number;
  pageSize: number;
  jobTypes: string[];
  locations: string[];
}) {
  const skip = (page - 1) * pageSize;

  console.log("JOBTYPES", jobTypes);
  console.log("LOCATIONS", locations);

  const where = {
    status: JobPostStatus.ACTIVE,
    ...(jobTypes.length > 0 && {
      employmentType: {
        in: jobTypes,
      },
    }),
    ...(locations.length > 0 && {
      location: { in: locations },
    }),
  };

  const [data, totalCount] = await Promise.all([
    prisma.jobPost.findMany({
      where: where,
      take: pageSize,
      skip: skip,
      select: {
        jobTitle: true,
        id: true,
        employmentType: true,
        location: true,
        createdAt: true,
        Company: {
          select: {
            name: true,
            logo: true,
            location: true,
            about: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    }),

    prisma.jobPost.count({
      where: {
        status: "ACTIVE",
      },
    }),
  ]);

  // console.log(locations);
  // console.log(where);

  return {
    jobs: data,
    totalPages: Math.ceil(totalCount / pageSize),
  };
}

export async function JobListings({
  currentPage,
  jobTypes,
  locations,
}: {
  currentPage: number;
  jobTypes: string[];
  locations: string[];
}) {
  const { jobs, totalPages } = await getData({
    page: currentPage,
    pageSize: 2,
    jobTypes: jobTypes,
    locations: locations,
  });

  return (
    <>
      {jobs.length > 0 ? (
        <div className="flex flex-col gap-6">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="Aucune offre d'emploi"
          description="Essayez de rechercher un autre titre de poste ou un autre lieu."
          buttonText="Réinitialiser tous les filtres"
          href="/"
        />
      )}

      {totalPages !== 0 && (
        <div className="flex justify-center mt-6">
          <MainPagination totalPages={totalPages} currentPage={currentPage} />
        </div>
      )}
    </>
  );
}
