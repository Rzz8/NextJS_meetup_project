import Head from "next/head";
import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";
import { useEffect, useState } from "react";
import { Fragment } from "react";

// const DUMMY_MEETUPS = [
//   {
//     id: "m1",
//     title: "The first meetup",
//     image:
//       "https://upload.wikimedia.org/wikipedia/commons/d/d3/Stadtbild_M%C3%BCnchen.jpg",
//     address: "some address 5, some city",
//     description: "This is the first meeting!",
//   },
//   {
//     id: "m2",
//     title: "The second meetup",
//     image:
//       "https://upload.wikimedia.org/wikipedia/commons/d/d3/Stadtbild_M%C3%BCnchen.jpg",
//     address: "some address 15, some city",
//     description: "This is the second meeting!",
//   },
//   {
//     id: "m1",
//     title: "The third meetup",
//     image:
//       "https://upload.wikimedia.org/wikipedia/commons/d/d3/Stadtbild_M%C3%BCnchen.jpg",
//     address: "some address 25, some city",
//     description: "This is the third meeting!",
//   },
// ];

function HomePage(props) {
  return (
    <Fragment>
      <Head>
        <title>React meetups</title>
        <meta
          name="description"
          content="Browse a huge list of highly active React meetups"
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
}

export async function getStaticProps() {
  const client = await MongoClient.connect(
    //connect to MongoDB to fetch data
    "mongodb+srv://cat1943:Mongodb1989@cluster0.vqsoigc.mongodb.net/?retryWrites=true&w=majority"
  );

  const db = client.db();

  const meetups = await db.collection("meetups").find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  };
}

export default HomePage;
