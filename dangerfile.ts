import { danger, message, warn } from 'danger';

function keepLockfileUpToDate() {
    const packageChanged = danger.git.modified_files.includes('package.json');
    const lockfileChanged = danger.git.modified_files.includes('package-lock.json');
    if (packageChanged && !lockfileChanged) {
        const msg = ':lock: Changes were made to package.json, but not to package-lock.json';
        const idea = 'Perhaps you need to run `npm install`?';
        warn(`${msg} - <i>${idea}</i>`);
    }
}

async function encourageSmallPRs() {
    const linesCount = await danger.git.linesOfCode('**/*') ?? 0;
    // Exclude package.json files
    const excludeLinesCount = await danger.git.linesOfCode('**/package*.json') ?? 0;
    const totalLinesCount = linesCount - excludeLinesCount;
    const bigPRThreshold = 600;
    // const allChanges = danger.github.pr.additions + danger.github.pr.deletions;
    if (totalLinesCount > bigPRThreshold) {
        warn(`:exclamation: This seems like a big PR (>${bigPRThreshold}), ${totalLinesCount} lines where changed. If the PR contains multiple changes, splitting it into separate PRs will help getting a faster and easier review`);
    }
}

function praiseCodeRemoved() {
    if (danger.github.pr.deletions > danger.github.pr.additions) {
        message(':heart: Thanks for removing unused code :)');
    }
}

async function main() {
    // Sanity
    keepLockfileUpToDate();

    // Best practices
    encourageSmallPRs();

    // Praising
    praiseCodeRemoved();
}

main().then();
