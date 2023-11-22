import { z } from "zod";

const publicEnvSchema = z.object({
  NEXT_PUBLIC_SOCKET_URL: z.string().url(),
});

type PublicEnv = z.infer<typeof publicEnvSchema>;

export const publicEnv: PublicEnv = {
  NEXT_PUBLIC_SOCKET_URL: process.env.NEXT_PUBLIC_SOCKET_URL!,
};

publicEnvSchema.parse(publicEnv);
