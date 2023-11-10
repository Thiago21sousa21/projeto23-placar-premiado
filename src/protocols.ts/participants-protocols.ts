import { Participant } from "@prisma/client";

export type NewParticipant = Omit<Participant, "id" | "createdAt" | "updatedAt">