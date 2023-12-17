// This is a temporary workaround until the real fix is done upstream.
// I opened an issue in the repo to track the status of this https://github.com/TheEdoRan/next-safe-action/issues/42

const fs = require('fs');

const files = ['./node_modules/next-safe-action/dist/index.mjs', './node_modules/next-safe-action/dist/hook.mjs'];
const replacements = [
    {
        original: '\"next/dist/client/components/not-found\"',
        change: '\"next/dist/client/components/not-found.js\"'
    },
    {
        original: '\"next/dist/client/components/redirect\"',
        change: '\"next/dist/client/components/redirect.js\"'
    }
];

try {
    files.forEach((file) => {
        const data = fs.readFileSync(file, 'utf8');
        let changedData = data;
        replacements.forEach((r) => changedData = changedData.replace(new RegExp(r.original, 'g'), r.change));
        fs.writeFileSync(file, changedData, 'utf8');
    });
} catch (error) {
    console.error(error);
}

