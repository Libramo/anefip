import { OnboardingForm } from "@/components/forms/onboarding/OnboardingForm";
import { redirect } from "next/navigation";
import React from "react";
import { requireUser } from "../utils/requireUser";
import { prisma } from "../utils/db";

async function checkIfUserHasFinishedOnboarding(userId: string) {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      onboardingCompleted: true,
    },
  });

  if (user?.onboardingCompleted === true) {
    return redirect("/");
  }

  return user;
}

const OnboardingPage = async () => {
  const session = await requireUser();
  await checkIfUserHasFinishedOnboarding(session.id as string);
  return (
    <div className="min-h-screen w-screen flex flex-col items-center justify-center py-10">
      <OnboardingForm />
    </div>
  );
};

export default OnboardingPage;
