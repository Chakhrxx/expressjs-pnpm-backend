import { userParam } from "../components/parameter";
export const creatTokenAPI = {
  post: {
    summary: "Creates a user.",
    parameters: [userParam?.id],
    responses: {
      201: {
        description: "Created",
      },
    },
  },
};
