import React from 'react';
import { Button, FormGroup, Radio } from 'react-bootstrap';
import { doLookup, removeItemResults, lookupBoxChanged } from '../actions';
import { connect } from 'react-redux';

const stores = {
    id: 'iTunes',
    upc: 'UPC',
    isbn: 'ISBN',
    amgArtistId: 'AMG artist',
    amgAlbumId: 'AMG album',
    amgVideoId: 'AMG video'
};

const mapStateToProps = ({lookupBox: {id = '', store = 'id'} = {}}) => ({id, store});

class LookupBox extends React.Component {

    onUrlChanged({store, id = ''}) {
        const {dispatch} = this.props;

        //validating
        id = decodeURIComponent(id);
        store = store in stores ? store : 'id';

        dispatch(lookupBoxChanged({store, id}));
        this.doLookup({store, id});
    }

    doLookup({store, id = ''}) {
        const {dispatch} = this.props;

        if (!id.trim()) {
            return dispatch(removeItemResults());
        }

        const params = {[store]: id};
        dispatch(doLookup(params));
    }

    componentWillReceiveProps(props) {
        if (this.props.match.url !== props.match.url) {  //listen to url change
            this.onUrlChanged(props.match.params);
        }
    }

    componentWillMount() {
        this.onUrlChanged(this.props.match.params);
    }

    submit(evt) {
        evt.stopPropagation();
        evt.preventDefault();

        const {id, store, history, match} = this.props;

        const newRoute = '/lookup/' + store + '/' + encodeURIComponent(id);
        if (match.url !== newRoute) { // new lookup so change the route
            return history.push(newRoute);
        }

        this.doLookup({store, id}); // lookup again
    };

    render() {
        const {dispatch, id, store} = this.props;

        return (
            <form onSubmit={ this.submit.bind(this) }>
                <FormGroup>
                {
                    Object.keys(stores).map(s => (
                        <Radio key={ s } value={ s } name="radioGroup" checked={ s === store } inline
                            onChange={ e => dispatch(lookupBoxChanged({store: e.target.value})) }>{ stores[s] }</Radio>
                    ))
                }
                </FormGroup>

                <input type="text" placeholder="Enter the Id (comma separated)..." value={id} className="form-control form-group"
                    onChange={ e => dispatch(lookupBoxChanged({id: e.target.value})) }/>

                <Button bsStyle="primary" type="submit">Lookup</Button>
            </form>
        );
    }
};

export default connect(mapStateToProps)(LookupBox);
