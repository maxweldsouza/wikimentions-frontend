import React from 'react';
import autoBind from 'react-autobind';

const PageBar = ({ id, slug, type, noPage }) => {
    let pagepath;
    if (type === 'video') {
        pagepath = '/videos/';
    } else if (type === 'book') {
        pagepath = '/books/';
    } else if (type === 'person') {
        pagepath = '/people/';
    } else {
        throw new Error('No page type specified');
    }
    return (
        <div className="page-bar">
            {noPage
                ? null
                : <span>
                      <a
                          className="secondary"
                          href={`${pagepath + id}/${slug}`}
                          aria-label="Back to page"
                      >
                          Page
                      </a>
                      {' · '}
                  </span>}
            <a
                className="secondary"
                rel="nofollow"
                href={`/edit/${id}/${slug}`}
                aria-label="Edit this page"
            >
                Edit
            </a>
            {' · '}
            <a
                className="secondary"
                rel="nofollow"
                href={`/discuss/${id}/${slug}`}
                aria-label="Discussion about this page"
            >
                Discuss
            </a>
            {' · '}
            <a
                className="secondary"
                rel="nofollow"
                href={`/history/${id}/${slug}`}
                aria-label="Page edit history"
            >
                History
            </a>
            {type === 'person'
                ? <span>
                      {' · '}
                      <a
                          className="secondary"
                          rel="nofollow"
                          href={`/quotes/${id}/${slug}`}
                          aria-label="Quotes"
                      >
                          Quotes
                      </a>
                  </span>
                : null}
        </div>
    );
};

export default PageBar;
