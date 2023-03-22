import { userParam } from "../components/parameter";
export const creatTokenAPI = {
  post: {
    summary: "Create a JWT token for authorization",
    parameters: [userParam?.id],
    responses: {
      201: {
        description: "Created",
      },
    },
  },
};
