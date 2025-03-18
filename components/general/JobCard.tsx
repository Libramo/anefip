import Link from "next/link";
import { Card, CardHeader } from "../ui/card";
import { MapPin } from "lucide-react";
import Image from "next/image";
import { Badge } from "../ui/badge";
// import { formatCurrency } from "@/app/utils/formatCurrency";
import { formatRelativeTime } from "@/app/utils/formatRelativeTime";
import { Separator } from "../ui/separator";

interface iAppProps {
  job: {
    id: string;
    createdAt: Date;
    Company: {
      about: string;
      name: string;
      location: string;
      logo: string;
    };
    jobTitle: string;
    employmentType: string;
    location: string;
  };
}

export function JobCard({ job }: iAppProps) {
  return (
    <Link href={`/job/${job.id}`} className="w-full">
      <Card className="hover:shadow-lg transition-all duration-300 hover:border-primary">
        <CardHeader className="mb-3">
          <div className="flex flex-col md:flex-row gap-4">
            <Image
              src={job.Company.logo}
              alt={job.Company.name}
              width={48}
              height={48}
              className="size-12 rounded-lg"
            />

            <div>
              <h1 className="text-xl md:text-2xl font-bold mb-3">
                {job.jobTitle}
              </h1>
              <div className="flex h-5 items-center space-x-4 text-sm">
                <p className="text-sm text-muted-foreground">
                  {job.Company.name}
                </p>

                <Separator orientation="vertical" className="bg-primary" />

                <Badge className="rounded-full capitalize" variant="secondary">
                  {job.employmentType}
                </Badge>

                <Separator orientation="vertical" className="bg-primary" />

                <Badge className="rounded-full capitalize">
                  {job.location}
                </Badge>

                <Separator orientation="vertical" className="bg-primary" />
              </div>
            </div>

            <div className="md:ml-auto text-right">
              <div className="flex items-center gap-2 justify-end">
                <MapPin className="size-4" />
                <h1 className="capitalize">{job.location}</h1>
              </div>

              <p className="text-sm text-muted-foreground md:text-right">
                {formatRelativeTime(job.createdAt)}
              </p>
            </div>
          </div>

          <p className="text-base text-muted-foreground line-clamp-2 !mt-5">
            {job.Company.about}
          </p>
        </CardHeader>
      </Card>
    </Link>
  );
}
