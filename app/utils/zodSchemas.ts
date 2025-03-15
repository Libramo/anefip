import { z } from "zod";

export const companySchema = z.object({
  name: z.string().min(2, "Company name must be at least 2 characters"),
  location: z.string().min(1, "Location must be defined"),
  about: z
    .string()
    .min(10, "Please provide some information about your company"),

  logo: z.string().min(1, "Please upload a logo"),
  website: z.string().optional(),
  xAccount: z.string().optional(),
});

export const jobSeekerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  about: z.string().min(10, "Please provide more information about yourself"),
  resume: z.string().min(1, "Please upload your resume"),
});

export const jobSchema = z.object({
  jobTitle: z
    .string()
    .min(2, "L'intitulé du poste doit comporter au moins 2 caractères."),
  employmentType: z.string().min(1, "Veuillez sélectionner un type d'emploi"),
  location: z.string().min(1, "Veuillez sélectionner le lieu"),
  jobDescription: z.string().min(1, "Veuillez donner des details de l'offre"),
  listingDuration: z
    .number()
    .min(
      1,
      "Vous devez selectionner une durée de visibilité de l'offre sur le site"
    ),

  benefits: z
    .array(z.string())
    .min(1, "Veuillez sélectionner au moins un avantage"),
  companyName: z.string().min(1, "Le nom est requis"),
  companyLocation: z.string().min(1, "La localisation est requise"),
  companyAbout: z.string().min(10, "La description de l'offre est requise"),

  companyLogo: z.string().min(1, "Le logo est requis"),
  companyWebsite: z.string().optional(),
  companyXAccount: z.string().optional(),
});
