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
            authors: [21]
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
            books: [1, 6, 9, 10, 11, 15]
        },
        {
            id: 19,
            type: 'person',
            name: 'VS Ramachanran',
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
        }
    ],
    mentions: [
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
        }
    ],
    users: [
        {
            id: 1,
            name: 'maxweldsouza'
        },
        {
            id: 2,
            name: 'someuser'
        }
    ],
    discussions: []
}

module.exports = data;
