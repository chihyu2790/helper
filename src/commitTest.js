import simpleGit from 'simple-git';

const git = simpleGit();

function addAndCommit(git) {
  return function(commitMessage) {
    return git.add('.').commit(commitMessage);
  };
}

console.log(git);