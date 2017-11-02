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

const mapStateToProps = state => ({
    lookupBox: {...{ id: '', store: 'id' }, ...state.lookupBox }
});

class LookupBox extends React.Component {

    doLookup({store, id = ''}){
        const {dispatch} = this.props;

        //validating
        id = decodeURIComponent(id);
        store = store in stores ? store : 'id';

        dispatch(lookupBoxChanged({store, id}));

        if(!id.trim()){
            dispatch(removeItemResults());
            return;
        }

        const params = {[store]: id};
        dispatch(doLookup(params));
    }

    componentWillReceiveProps(props){
        if(this.props.match.url !== props.match.url){  //listen to url change
            this.doLookup(props.match.params);
        }
    }

    componentWillMount(){
        this.doLookup(this.props.match.params);
    }

    submit(evt) {
        evt.stopPropagation();
        evt.preventDefault();

        const {lookupBox, history} = this.props;

        if(!lookupBox.id.trim()){
            return;
        }

        //change the route for the new lookup
        history.push('/lookup/' + lookupBox.store + '/' + encodeURIComponent(lookupBox.id));
    };

    render(){
        const {dispatch, lookupBox} = this.props;

        return (
            <form onSubmit={ this.submit.bind(this) }>
                <FormGroup>
                {
                    Object.keys(stores).map(store => (
                        <Radio key={ store } value={ store } name="radioGroup" checked={lookupBox.store === store} inline
                            onChange={ e => dispatch(lookupBoxChanged({store: e.target.value})) }>{ stores[store] }</Radio>
                    ))
                }
                </FormGroup>

                <input type="text" placeholder="Enter the Id (comma separated)..." value={lookupBox.id} className="form-control form-group"
                    onChange={ e => dispatch(lookupBoxChanged({id: e.target.value})) }/>

                <Button bsStyle="primary" type="submit">Search</Button>
            </form>
        );
    }
};

export default connect(mapStateToProps)(LookupBox);
