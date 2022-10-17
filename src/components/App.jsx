// import { useState, useEffect } from 'react';
// import eventsValues from '../data/events.json';
 import { EventList } from './EventList/EventList';

// export const App = () => {
//   const [events, setEvents] = useState(
//     () => JSON.parse(localStorage.getItem('events')) ?? eventsValues
//   );

//   useEffect(() => {
//     localStorage.setItem("events", JSON.stringify(events))
//   }, [events]);

//   const deleteEvent = eventId => {
//     setEvents(prevEvents => prevEvents.filter(event => event.id !== eventId));
//   };
//   return (
//     <>
//       <EventList events={events} deleteEvent={deleteEvent} />
//     </>
//   );
// };

import { useState, useEffect } from 'react';
import {fetchApi} from "../api/fetch";

export const App = () => {

  const [events, setEvents] = useState([]);
  const [isShown, setisShown] = useState(false);
  const [page, setPage] = useState(1);

  const deleteEvent = eventId => {
        setEvents(prevEvents => prevEvents.filter(event => event.id !== eventId));
      };

  const showEvents = () => {
    setisShown( true)
  };

  useEffect(() => {
    if(isShown) {
    fetchApi(page).then(resp => setEvents(prevEvents => [...prevEvents, ...resp.data._embedded.events]))
    }
  }, [isShown, page])

  const loadMore = () => {
    setPage(prevPage => prevPage + 1)
  }

  return (
    <>
    {isShown && <EventList events={events} deleteEvent={deleteEvent} />}
    {!isShown && <button type='button' onClick={showEvents}>Show Events</button> }
    {isShown &&  <button type='button' onClick={loadMore}>Load More</button>}
    </>
  )
}