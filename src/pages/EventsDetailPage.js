import React, { Suspense } from "react";
import {
  Await,
  defer,
  json,
  redirect,
  useRouteLoaderData,
} from "react-router-dom";
import EventItem from "../components/EventItem";
import EventsList from "../components/EventsList";

const EventsDetailPage = () => {
  const { event, events } = useRouteLoaderData("event-detail");
  return (
    <>
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
        <Await resolve={event}>
          {(loadedEvent) => <EventItem event={loadedEvent} />}
        </Await>
      </Suspense>
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
        <Await resolve={events}>
          {(loadedEvents) => <EventsList events={loadedEvents} />}
        </Await>
      </Suspense>
    </>
  );
};

export default EventsDetailPage;

async function loadEvent(id) {
  // const response = await fetch("http://localhost:8080/events/" + id);
  const response = await fetch("https://eventsbasicbackend.onrender.com/events/" + id);
  if (!response.ok) {
    throw json(
      {
        message: "Could not fetch details for selected event.",
      },
      {
        status: 500,
      }
    );
  } else {
    const resData = await response.json();
    return resData.event;
  }
}

async function loadEvents() {
  //never use react hooks here
  // usually it's place where we're fetching the data
  // const response = await fetch("http://localhost:8080/events");
  const response = await fetch("https://eventsbasicbackend.onrender.com/events");

  if (!response.ok) {
    // return {isError: true, message: 'Could not fetch events.'};
    // throw new Response(JSON.stringify({ message: "Could not fetch events." }), {
    //   status: 500,
    // });

    throw json(
      { message: "Could not fetch events." },
      {
        status: 500,
      }
    );
  } else {
    const resData = await response.json();
    return resData.events;
  }
}

export async function loader({ request, params }) {
  const id = params.eventId;

  return defer({
    event: await loadEvent(id),
    events: await loadEvents(),
  });
}

export async function action({ params, request }) {
  const eventId = params.eventId;
  // const response = await fetch("http://localhost:8080/events/" + eventId, {
  const response = await fetch("https://eventsbasicbackend.onrender.com/events/" + eventId, {
    method: request.method,
  });

  if (!response.ok) {
    throw json(
      {
        message: "Could not delete event.",
      },
      {
        status: 500,
      }
    );
  }

  return redirect("/events");
}
