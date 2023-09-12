import { Fragment, Node } from '@tiptap/pm/model';

export function collectAttrsData(fragment: Node | Fragment, nodeTypes: string[], key: string, collectedAttributes: { [key: string]: number } = {}) {
    const items: { [key: string]: number } = collectedAttributes;
    fragment.forEach((node) => {
        if (nodeTypes.includes(node.type.name)) {
            const nodeKey = `${node.type}_${node.attrs[key]}`;
            items[nodeKey] = (items[nodeKey] || 0) + 1;
        }
        if (node.content) {
            collectedAttributes = collectAttrsData(node.content, nodeTypes, key, collectedAttributes);
        }
    });

    return { ...items, ...collectedAttributes };
}

export function getTagsFromFragment(fragment: Node | Fragment) {
    const nodesAttrs = collectAttrsData(fragment, ['mention', 'tag'], 'id');

    return Object.keys(nodesAttrs).map((key) => key.split('_')[1]);
}
