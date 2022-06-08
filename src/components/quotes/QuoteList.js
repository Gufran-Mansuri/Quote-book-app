import { Fragment } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import QuoteItem from './QuoteItem';
import classes from './QuoteList.module.css';

const sortQuotes = (quotes, ascending) => {
  return quotes.sort((quoteA, quoteB) => {
    if (ascending) {
      return quoteA.id > quoteB.id ? 1 : -1;
    } else {
      return quoteA.id < quoteB.id ? 1 : -1;
    }
  });
};

const QuoteList = (props) => {
  const history = useHistory();
  const location = useLocation();

  const queryParms = new URLSearchParams(location.search);
  const isQueryAscending = queryParms.get('sort') === 'asc';

  const sortedQuotes = sortQuotes(props.quotes, isQueryAscending);

  const sortAscending = () => {
    history.push('/quotes?sort=' + (isQueryAscending ? 'desc' : 'asc'));

  }
  return (
    <Fragment>
      <div className={classes.sorting}>
        <button onClick={sortAscending}>Sort {isQueryAscending ? 'Descending' : 'Ascending'  }</button>
      </div>
      <ul className={classes.list}>
        {props.quotes.map((quote) => (
          <QuoteItem
            key={quote.id}
            id={quote.id}
            author={quote.author}
            text={quote.text}
          />
        ))}
      </ul>
    </Fragment>
  );
};

export default QuoteList;
