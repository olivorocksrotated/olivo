import { danger, markdown, message, warn } from 'danger';

function keepLockfileUpToDate() {
    const packageChanged = danger.git.modified_files.includes('package.json');
    const lockfileChanged = danger.git.modified_files.includes('package-lock.json');
    if (packageChanged && !lockfileChanged) {
        const msg = 'Changes were made to package.json, but not to package-lock.json';
        const idea = 'Perhaps you need to run `npm install`?';
        warn(`${msg} - <i>${idea}</i>`);
    }
}

function encourageSmallPRs() {
    const bigPRThreshold = 600;
    const allChanges = danger.github.pr.additions + danger.github.pr.deletions;
    if (allChanges > bigPRThreshold) {
        warn(':exclamation: This seems like a big PR');
        markdown('> If the PR contains multiple changes, splitting it into separate PRs will help getting a faster and easier review');
    }
}

function praiseCodeRemoved() {
    if (danger.github.pr.deletions > danger.github.pr.additions) {
        message(':heart: Thanks for removing unused code :)');
    }
}

function main() {
    // Sanity
    keepLockfileUpToDate();

    // Best practices
    encourageSmallPRs();

    // Praising
    praiseCodeRemoved();
}

main();
