import React from "react";
import Header from "../components/Layout/Header";
import EventCard from "../components/Events/EventCard";

const EventsPage = () => {
  return (
    <>
      <Header activeHeading={4} />
      <EventCard active={true} />
      <EventCard active={true} />
    </>
  );
};

export default EventsPage;
