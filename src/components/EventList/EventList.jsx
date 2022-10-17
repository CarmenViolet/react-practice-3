export const EventList = ({events, deleteEvent}) => {
  return (
    <>
      <ul>
        {events.map(({id, name, images}) => (
            <li key={id}>
                <h2>{name}</h2>
                <img src={images[0].url} alt={name} width='300'/>
                <button type="button" onClick={() => deleteEvent(id)}>Delete Event</button>
            </li>
        ))}
      </ul>
    </>
  );
};
