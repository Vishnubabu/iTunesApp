import React from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import { Route } from 'react-router-dom';
import SearchBox from '../components/SearchBox';
import LookupBox from '../components/LookupBox';
import ItemResults from '../components/ItemResults';

const getTabFromRoute = route => {
    const match = route.match(/^\/(search|lookup)([/?].*)*$/);

    return (match && match[1]) || 'search';
}

export default ({ history }) => (
    <div>
        <Tabs activeKey={ getTabFromRoute(history.location.pathname) } id="maintabs" onSelect={ tab => history.push('/' + tab) }>
            <Tab eventKey={'search'} title="Search">
                <Route path="/search/:term?/:media?/:entity?" render={ ({match}) => (
                    <div className="well">
                        <SearchBox { ...{match, history} } />
                    </div>
                )} />
            </Tab>
            <Tab eventKey={'lookup'} title="Lookup">
                <Route path="/lookup/:store?/:id?" render={ ({match}) => (
                    <div className="well">
                        <LookupBox { ...{match, history} } />
                    </div>
                )} />
            </Tab>
        </Tabs>

        <div className="container-fluid">
            <ItemResults/>
        </div>
    </div>
);
