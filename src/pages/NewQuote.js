import { useEffect } from 'react';
import QuoteForm from '../components/quotes/QuoteForm'
import { useHistory } from 'react-router-dom'
import useHttp from '../hooks/use-http'
import {addQuote} from '../lib/api'
const NewQuote = () => {
    const {sendRequest, status} = useHttp(addQuote);

    const history = useHistory();
    useEffect(()=>{
        console.log(status)
        if(status === 'completed'){
            
            history.push('/quotes')
        }
    }, [history, status])
    const addQuoteHandler = (quote) => {
        sendRequest(quote)
    }
    return(
        <QuoteForm isLoding={status === 'pending'} onAddQuote={addQuoteHandler}/>
    )
}
export default NewQuote;