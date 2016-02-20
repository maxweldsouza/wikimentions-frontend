var moment = require('moment');

var data = {
    things: [
        {
            id: 1,
            type: 'book',
            name: 'The God Delusion',
            slug: 'the-god-delusion',
            authors: [18]
        },
        {
            id: 2,
            type: 'book',
            name: 'Phantoms in the Brain',
            slug: 'phantoms-in-the-brain',
            authors: [19]
        },
        {
            id: 3,
            type: 'book',
            name: 'The Astonishing Hypothesis',
            slug: 'the-astonishing-hypothesis',
            authors: [21]
        },
        {
            id: 4,
            type: 'book',
            name: 'What Mad Pursuit',
            slug: 'what-mad-pursuit',
            authors: [20]
        },
        {
            id: 5,
            type: 'book',
            name: 'The Annotated Turing',
            slug: 'the-annotated-turing',
            authors: [22]
        },
        {
            id: 6,
            type: 'book',
            name: 'The Magic of Reality',
            slug: 'the-magic-of-reality',
            authors: [18]
        },
        {
            id: 7,
            type: 'book',
            name: 'What Is Life?',
            slug: 'what-is-life',
            books: [23]
        },
        {
            id: 8,
            type: 'book',
            name: 'The Birth and Death of the Sun',
            slug: 'the-birth-and-death-of-the-sun',
            authors: [24]
        },
        {
            id: 9,
            type: 'book',
            name: 'The Greatest Show on Earth',
            slug: 'the-greatest-show-on-earth',
            authors: [18]
        },
        {
            id: 10,
            type: 'book',
            name: 'An Apetite for Wonder',
            slug: 'an-apetite-for-wonder',
            authors: [18]
        },
        {
            id: 11,
            type: 'book',
            name: 'The Ancestors Tale',
            slug: 'the-ancestors-tale',
            authors: [18]
        },
        {
            id: 12,
            type: 'book',
            name: 'Fear of Physics',
            slug: 'fear-of-physics',
            authors: [25]
        },
        {
            id: 13,
            type: 'book',
            name: 'QED',
            slug: 'qed',
            authors: [26]
        },
        {
            id: 14,
            type: 'book',
            name: 'Why I am not a Christian',
            slug: 'why-i-am-not-a-christian',
            authors: [27]
        },
        {
            id: 15,
            type: 'book',
            name: 'The Extended Phenotype',
            slug: 'the-extended-phenotype',
            authors: [18]
        },
        {
            id: 16,
            type: 'book',
            name: 'Awakenings',
            slug: 'awakenings',
            authors: [21]
        },
        {
            id: 17,
            type: 'book',
            name: 'Surely you\'re joking Mr Feynman',
            slug: 'surely-youre-joking-mr-feynman',
            authors: [26]
        },
        {
            id: 18,
            type: 'person',
            name: 'Richard Dawkins',
            slug: 'richard-dawkins',
            description: 'Evolutionary Biologist',
            books: [1, 6, 9, 10, 11, 15, 30]
        },
        {
            id: 19,
            type: 'person',
            name: 'VS Ramachandran',
            slug: 'vs-ramachandran',
            description: 'Neuroscientist',
            books: [2]
        },
        {
            id: 20,
            type: 'person',
            name: 'Francis Crick',
            slug: 'francis-crick',
            description: 'Molecular Biologist',
            books: [3, 4]
        },
        {
            id: 21,
            type: 'person',
            name: 'Oliver Sacks',
            slug: 'oliver-sacks',
            description: 'Neuroscientist',
            books: [16]
        },
        {
            id: 22,
            type: 'person',
            name: 'Alan Turing',
            slug: 'alan-turing',
            description: 'Mathematician',
            books: [5]
        },
        {
            id: 23,
            type: 'person',
            name: 'Erwin Schrodinger',
            slug: 'erwin-schrodinger',
            description: 'Physicist',
            books: [7]
        },
        {
            id: 24,
            type: 'person',
            name: 'George Gamow',
            slug: 'george-gamow',
            description: 'Physicist',
            books: [8]
        },
        {
            id: 25,
            type: 'person',
            name: 'Lawrence Krauss',
            slug: 'lawrence-krauss',
            description: 'Physicist',
            books: [12]
        },
        {
            id: 26,
            type: 'person',
            name: 'Richard Feynman',
            slug: 'richard-feynman',
            description: 'Physicist',
            books: [13, 17]
        },
        {
            id: 27,
            type: 'person',
            name: 'Bertrand Russell',
            slug: 'bertrand-russell',
            description: 'Mathematician',
            books: [14]
        },
        {
            id: 28,
            type: 'person',
            name: 'Venkatraman Ramakrishnan',
            slug: 'venkatraman-ramakrishnan',
            description: 'Molecular Biologist',
            books: []
        },
        {
            id: 29,
            type: 'person',
            name: 'Charles Darwin',
            slug: 'charles-darwin',
            description: 'Creator of Theory of Evolution',
            books: [35]
        },
        {
            id: 30,
            type: 'book',
            name: 'The Selfish Gene',
            slug: 'the-selfish-gene',
            description: '',
            authors: [18]
        },
        {
            id: 31,
            type: 'person',
            name: 'G.G Simpson',
            slug: 'g-g-simpson',
            description: 'Zoologist',
            books: []
        },
        {
            id: 32,
            type: 'person',
            name: 'G.C Williams',
            slug: 'g-c-williams',
            description: '',
            books: []
        },
        {
            id: 33,
            type: 'book',
            name: 'Adaptation and Natural Selection',
            slug: 'adaptation-and-natural-selection',
            description: '',
            authors: [32]
        },
        {
            id: 34,
            type: 'person',
            name: 'John Maynard Smith',
            slug: 'john-maynard-smith',
            description: 'Theoretical evolutionary biologist and geneticist',
            books: []
        },
        {
            id: 35,
            type: 'book',
            name: 'The Origin of Species',
            slug: 'the-origin-of-species',
            description: '',
            authors: [29]
        },
        {
            id: 36,
            type: 'person',
            name: 'R. A. Fisher',
            slug: 'ra-fisher',
            description: '',
            books: []
        },
        {
            id: 37,
            type: 'person',
            name: 'J. B. S. Haldane',
            slug: 'jbs-haldane',
            description: '',
            books: []
        },
        {
            id: 38,
            type: 'person',
            name: 'W. D. Hamilton',
            slug: 'wd-hamilton',
            description: '',
            books: []
        },
        {
            id: 39,
            type: 'person',
            name: 'Carl Sagan',
            slug: 'carl-sagan',
            description: 'Astrophysicist',
            books: [40]
        },
        {
            id: 40,
            type: 'book',
            name: 'Pale Blue Dot',
            slug: 'pale-blue-dot',
            description: '',
            authors: [39]
        },
        {
            id: 41,
            type: 'person',
            name: 'Steven Weinberg',
            slug: 'steven-weinberg',
            description: 'Nobel prize winning physicist',
            books: [42]
        },
        {
            id: 42,
            type: 'book',
            name: 'To Explain The World',
            slug: 'to-explain-the-world',
            description: '',
            authors: [41]
        },
        {
            id: 43,
            type: 'book',
            name: 'Dreams of a Final Theory',
            slug: 'dreams-of-a-final-theory',
            description: '',
            authors: [41]
        }
    ],
    mentions: [
        {
            mentionedby: 1,
            mentioned: 42,
            quote: ''
        },
        {
            mentionedby: 1,
            mentioned: 43,
            quote: ''
        },
        {
            mentionedby: 1,
            mentioned: 39,
            quote: ''
        },
        {
            mentionedby: 1,
            mentioned: 40,
            quote: ''
        },
        {
            mentionedby: 30,
            mentioned: 36,
            quote: ''
        },
        {
            mentionedby: 30,
            mentioned: 37,
            quote: ''
        },
        {
            mentionedby: 30,
            mentioned: 38,
            quote: ''
        },
        {
            mentionedby: 30,
            mentioned: 34,
            quote: ''
        },
        {
            mentionedby: 30,
            mentioned: 32,
            quote: 'Great book'
        },
        {
            mentionedby: 30,
            mentioned: 33,
            quote: ''
        },
        {
            mentionedby: 18,
            mentioned: 19,
            quote: 'The marco polo of neuroscience'
        },
        {
            mentionedby: 19,
            mentioned: 18,
            quote: 'As the social critic Richard Dawkins has pointed out'
        },
        {
            mentionedby: 18,
            mentioned: 20,
            quote: 'As Francis Crick just said'
        },
        {
            mentionedby: 28,
            mentioned: 27,
            quote: 'Bertrand Russell had once said'
        },
        {
            mentionedby: 28,
            mentioned: 20,
            quote: 'Probably the greatest molecular biologist of all time'
        },
        {
            mentionedby: 7,
            mentioned: 20,
            quote: 'Inspired by this book, which led to the discovery of structure of DNA'
        },
        {
            mentionedby: 30,
            mentioned: 29,
            quote: ''
        }
    ],
    users: [
        {
            id: 1,
            name: 'maxweldsouza',
            joined: '2015-02-11'
        },
        {
            id: 2,
            name: 'someuser',
            joined: '2014-02-11'
        }
    ],
    discussions: [
        {
            id: 1,
            page_id: 18,
            user: 1,
            text: 'We should add some more books of this author !',
            posted: '2016-02-11T14:35:24+00:00'
        },
        {
            id: 2,
            page_id: 18,
            user: 2,
            text: 'Sure !',
            posted: '2016-02-11T14:36:24+00:00'
        },
        {
            id: 3,
            page_id: 18,
            user: 1,
            text: 'Alright, done',
            posted: '2016-02-11T14:38:24+00:00'
        }
    ]
};

module.exports = data;
