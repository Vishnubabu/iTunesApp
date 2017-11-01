import React from 'react';
import { Button, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import { doSearch, removeItemResults, searchBoxChanged } from '../actions';
import { connect } from 'react-redux';

const displayNames = {
    movie: 'Movie',
    podcast: 'Podcast',
    music: 'Music',
    musicVideo: 'Music Video',
    audiobook: 'Audio book',
    shortFilm: 'Short film',
    tvShow: 'TV show',
    software: 'Software',
    ebook: 'eBook',
    all: 'All',
    movieArtist: 'Movie artist',
    podcastAuthor: 'Podcast author',
    musicTrack: 'Music track',
    song: 'Song',
    musicArtist: 'Music artist',
    audiobookAuthor: 'Audiobook author',
    shortFilmArtist: 'Short film artist',
    tvEpisode: 'TV episode',
    iPadSoftware: 'iPad software',
    macSoftware: 'Mac software',
    album: 'Album',
    allArtist: 'All artist',
    mix: 'Mix',
    tvSeason: 'TV season',
    allTrack: 'All track',
    '': '...'
};

const mediaEntities = {
    '': [],
    movie: ['movieArtist', 'movie'],
    podcast: ['podcastAuthor', 'podcast'],
    music: ['musicArtist', 'musicTrack', 'album', 'musicVideo', 'mix', 'song'],
    musicVideo: ['musicArtist', 'musicVideo'],
    audiobook: ['audiobookAuthor', 'audiobook'],
    shortFilm: ['shortFilmArtist', 'shortFilm'],
    tvShow: ['tvEpisode', 'tvSeason'],
    software: ['software', 'iPadSoftware', 'macSoftware'],
    ebook: ['ebook'],
    all: ['movie', 'album', 'allArtist', 'podcast', 'musicVideo', 'mix', 'audiobook', 'tvSeason', 'allTrack']
};

const mapStateToProps = state => {
    return {
        searchBox: {...{ term: '', media: '', entity: '' }, ...state.searchBox }
    };
}

class SearchBox extends React.Component {

    doSearch({term, media, entity}){
        const {dispatch} = this.props;

        dispatch(searchBoxChanged({term: (term || ''), media: (media || ''), entity: (entity || '')}));

        if(!term){
            dispatch(removeItemResults());
            return;
        }

        const params = {term};
        media && (params.media = media);
        entity && (params.entity = entity);

        dispatch(doSearch(params));
    }

    componentWillReceiveProps(props){
        if(this.props.match.url !== props.match.url){
            this.doSearch(props.match.params);
        }
    }

    componentWillMount(){
        this.doSearch(this.props.match.params);
    }

    submit(evt) {
        evt.stopPropagation();
        evt.preventDefault();

        const {searchBox, history} = this.props;

        if(!searchBox.term.trim()){
            return;
        }

        history.push('/search/' + searchBox.term + (searchBox.media ? '/' + searchBox.media : '') + (searchBox.entity ? '/' + searchBox.entity : ''));
    };

    render(){
        const {dispatch, searchBox} = this.props;

        return (
            <form onSubmit={ this.submit.bind(this) }>
                <input type="text" placeholder="Enter the search term..." value={searchBox.term} className="form-control form-group" onChange={ e => dispatch(searchBoxChanged({term: e.target.value})) }/>

                <FormGroup controlId="formControlsSelect">
                    <ControlLabel>Media</ControlLabel>
                    <FormControl componentClass="select" value={searchBox.media} onChange={ e => dispatch(searchBoxChanged({media: e.target.value, entity: ''})) }>
                    {
                        Object.keys(mediaEntities).map(ent => {
                            return <option key={ ent } value={ ent }>{ displayNames[ent] }</option>
                        })
                    }
                    </FormControl>
                </FormGroup>

                <FormGroup controlId="formControlsSelect">
                    <ControlLabel>Entity</ControlLabel>
                    <FormControl componentClass="select" value={searchBox.entity} onChange={ e => dispatch(searchBoxChanged({entity: e.target.value})) }>
                        <option key={ '' } value={ '' }>{ displayNames[''] }</option>
                        {
                            mediaEntities[searchBox.media].map(ent => {
                                return <option key={ ent } value={ ent }>{ displayNames[ent] }</option>
                            })
                        }
                    </FormControl>
                </FormGroup>

                <Button bsStyle="primary" type="submit">Search</Button>
            </form>
        );
    }
};

export default connect(mapStateToProps)(SearchBox);
