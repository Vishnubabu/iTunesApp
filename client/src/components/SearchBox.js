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
    '': [''],
    movie: ['', 'movieArtist', 'movie'],
    podcast: ['', 'podcastAuthor', 'podcast'],
    music: ['', 'musicArtist', 'musicTrack', 'album', 'musicVideo', 'mix', 'song'],
    musicVideo: ['', 'musicArtist', 'musicVideo'],
    audiobook: ['', 'audiobookAuthor', 'audiobook'],
    shortFilm: ['', 'shortFilmArtist', 'shortFilm'],
    tvShow: ['', 'tvEpisode', 'tvSeason'],
    software: ['', 'software', 'iPadSoftware', 'macSoftware'],
    ebook: ['', 'ebook'],
    all: ['', 'movie', 'album', 'allArtist', 'podcast', 'musicVideo', 'mix', 'audiobook', 'tvSeason', 'allTrack']
};

const mapStateToProps = ({searchBox: {term = '', media = '', entity = ''} = {}}) => ({ term, media, entity });

class SearchBox extends React.Component {

    onUrlChanged({term = '', media = '', entity = ''}) {
        const {dispatch} = this.props;

        //validating
        term = decodeURIComponent(term);
        media = media in mediaEntities ? media : '';
        entity = mediaEntities[media].indexOf(entity) >= 0 ? entity : '';

        dispatch(searchBoxChanged({term, media, entity}));

        this.doSearch({term, media, entity});
    }

    doSearch({term = '', media = '', entity = ''}) {
        const {dispatch} = this.props;

        if (!term.trim()) {
            return dispatch(removeItemResults());
        }

        //remove empty media & entity sending to backend
        const params = {term};
        media && (params.media = media);
        entity && (params.entity = entity);

        dispatch(doSearch(params));
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

        const {term, media, entity, history, match} = this.props;

        const newRoute = '/search/' + encodeURIComponent(term) + (media ? '/' + media : '') + (entity ? '/' + entity : '');
        if (match.url !== newRoute) { // new search so change the route
            return history.push(newRoute);
        }

        this.doSearch({term, media, entity}); // search again
    };

    render() {
        const {dispatch, term, media, entity} = this.props;

        return (
            <form onSubmit={ this.submit.bind(this) }>
                <input type="text" placeholder="Enter the search term..." value={term} className="form-control form-group"
                    onChange={ e => dispatch(searchBoxChanged({term: e.target.value})) }/>

                <FormGroup controlId="formControlsSelect">
                    <ControlLabel>Media</ControlLabel>
                    <FormControl componentClass="select" value={media}
                        onChange={ e => dispatch(searchBoxChanged({media: e.target.value, entity: ''})) }>
                    {
                        Object.keys(mediaEntities).map(ent => (
                            <option key={ ent } value={ ent }>{ displayNames[ent] }</option>
                        ))
                    }
                    </FormControl>
                </FormGroup>

                <FormGroup controlId="formControlsSelect">
                    <ControlLabel>Entity</ControlLabel>
                    <FormControl componentClass="select" value={entity}
                        onChange={ e => dispatch(searchBoxChanged({entity: e.target.value})) }>
                    {
                        mediaEntities[media].map(ent => (
                            <option key={ ent } value={ ent }>{ displayNames[ent] }</option>
                        ))
                    }
                    </FormControl>
                </FormGroup>

                <Button bsStyle="primary" type="submit">Search</Button>
            </form>
        );
    }
};

export default connect(mapStateToProps)(SearchBox);
