import { useState } from 'react';
import Head from 'next/head';

import {
  Feature,
  Section,
  GridSection,
  GridText,
  Contact,
} from 'components/home';
import { Header, Footer } from 'components/layout';

import { sendMessage } from 'services';
import {
  about,
  invite,
  ourPartnersData,
  ourSupportersData,
  ourSpeakersData,
  ourTeamData,
} from 'data';

const Home = () => {
  const [sentSuccess, setSentSuccess] = useState(false);

  const sendContact = (values) => {
    sendMessage(values);
    setSentSuccess(true);
    setTimeout(() => {
      setSentSuccess(false);
    }, 10000);
  };

  return (
    <>
      <Head>
        <title>Coin Nations Summit 2021</title>
        <meta
          name='description'
          content='Coin Nations We’re showcasing the best crypto companies, leaders on one Coin Nations Global Summit'
        />
        <meta
          name='keywords'
          content='crypto bitcoin, ethereum, revolut, kraken, visa, circle'
        />
      </Head>
      <Header />
      <Feature />
      <GridSection
        data={ourPartnersData}
        title='Our Partners'
        link='Partners'
      />
      <GridSection
        data={ourSupportersData}
        title='Supporters'
        link='Supporters'
      />
      <Section data={about} />
      <GridText title='Our Speakers' data={ourSpeakersData} link='Speakers' />
      <Section data={invite} />
      <GridText title='Our Team' data={ourTeamData} link='Team' />
      <Contact onSubmit={sendContact} success={sentSuccess} />
      <Footer />
    </>
  );
};

export default Home;
