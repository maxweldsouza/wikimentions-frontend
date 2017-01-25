const isBrowser = () => typeof window !== 'undefined';

const isNode = () => !isBrowser();

export default {
    isNode,
    isBrowser
};
