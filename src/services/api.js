import { Octokit } from "@octokit/rest";


const octokit = new Octokit();


export const gist = async () => {
  const response = await octokit.request('GET /gists/public', {
    headers: {
      'X-GitHub-Api-Version': '2022-11-28'
    }
  })
  return response
}


