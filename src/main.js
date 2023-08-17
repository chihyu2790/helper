import simpleGit from 'simple-git';

const repositoryPath = 'repo-path';
const commitData = { commitMessage: 'message' };

function compose(...fns) {
  return input => fns.reduceRight((result, fn) => fn(result), input);
}

function addAndCommit(git, commitMessage) {
  return git.add('.')
    .commit(commitMessage);
}

// function checkoutBranch(git, branchName) {
//   git.checkout(branchName);
// }

// function getGitStatus(git) {
//   return git.status();
// }

// function getGitLog(git) {
//   return git.log();
// }

async function openAndCommit(repositoryPath, commitMessage) {
  const git = simpleGit(repositoryPath);

  try {
    await addAndCommit(git, commitMessage);
    return 'Changes added and committed.';
  } catch (err) {
    return `Error occurred: ${err}`;
  }
}

async function tryAddAndCommit(git, commitMessage) {
  try {
    await addAndCommit(git, commitMessage);
    return 'Changes added and committed.';
  } catch (err) {
    return `Error occurred: ${err}`;
  }
}

const composedOpenAndCommit = compose(
  async (repositoryPath, commitMessage) => {
    const git = simpleGit(repositoryPath);
    return await tryAddAndCommit(git, commitMessage);
  }
);

export { composedOpenAndCommit as openAndCommit };
