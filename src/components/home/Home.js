import React from 'react';
import Config from '../../Config';

import Banner from '../navigation/banner/Banner';
import Status from '../home/status/Status';

import Discord from '../social/discord/Discord';
import Twitter from '../social/twitter/Twitter';
import Facebook from '../social/facebook/Facebook';

class Home extends React.Component {
    render() {
        return (
            <div>
                <Banner title={Config.server_name} subtitle=""></Banner>
                <main className="home">
                    <Status></Status>
                    <Discord></Discord>
                    <Twitter></Twitter>
                    <Facebook></Facebook>
                </main>
            </div>
        );
    }
}

export default Home;
