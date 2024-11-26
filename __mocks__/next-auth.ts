import type { GetServerSidePropsContext } from "next";

import { jest } from "@jest/globals";
import type { Session } from "next-auth";

const mockSession: Session = {
  user: {
    id: "c3db6225-3497-471c-a453-c8e114f6de36",
    email: "sam@gmail.com",
    accessToken: "fake-access-token",
    refreshToken: "fake-refresh-token",
    firstName: "Sam",
    lastName: "Smith",
    image: "",
    role: "ADMIN",
  },
  expires: "fake-expiry-date",
  error: "",
};

type GetServerSessionType = (
  context?: GetServerSidePropsContext
) => Promise<Session | null>;

export const getServerSession = jest
  .fn<GetServerSessionType>()
  .mockResolvedValue(mockSession);
