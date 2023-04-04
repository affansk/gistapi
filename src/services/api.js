import { Octokit } from "@octokit/rest";


const octokit = new Octokit();


export const gist = async (object: object) => {
  const response = await octokit.rest.repos.listForOrg({
    org: "octokit",
    type: "public",
  });
  return response
}


