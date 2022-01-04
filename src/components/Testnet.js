import React, { useState, useEffect, useContext } from 'react';
import '../App.css';
import * as fcl from '@onflow/fcl';
import FlowContext from '../context/FlowContext';

function Testnet(props) {
    const flow = useContext(FlowContext);

    useEffect(() => {
        fcl.currentUser().subscribe(flow.setUser);
        fcl.config()
            .put('discovery.wallet', 'https://flow-wallet-testnet.blocto.app/authn')
    }, [])

    useEffect(() => {
        if (flow.user && flow.user.addr) {
            flow.sendAuthPOST("testnet");
        }
    }, [flow.user]);

    return (
        <div className="App">
            <h1>{flow.user.loggedIn && success 
                    ? "Successfully verified." 
                    : flow.user.loggedIn && !success
                    ? "Verification failed."
                    : null 
                }
            </h1>
            <button className="button-9" onClick={() => flow.authentication()}>{flow.user && !flow.user.addr ? "Log in with Blocto" : "Log out"}</button>
        </div>
    );
}

export default Testnet;
