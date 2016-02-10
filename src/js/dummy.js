var data = {
    things: [
        {
            id: 1,
            type: 'book',
            name: 'The God Delusion',
            authors: [1]
        },
        {
            id: 2,
            type: 'book',
            name: 'Phantoms in the Brain',
        },
        {
            id: 3,
            type: 'book',
            name: 'The Astonishing Hypothesis',
        },
        {
            id: 4,
            type: 'book',
            name: 'What Mad Pursuit',
        },
        {
            id: 5,
            type: 'person',
            name: 'Richard Dawkins',
            books: [1]
        },
        {
            id: 6,
            type: 'person',
            name: 'VS Ramachanran',
            books: [2]
        },
        {
            id: 7,
            type: 'person',
            name: 'Francis Crick',
            books: [2]
        }
    ],
    mentions: [
        {
            mentionedby: 1,
            mentioned: 2
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
