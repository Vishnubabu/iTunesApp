import React from 'react';
import { Table } from 'react-bootstrap';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
        itemResults: state.itemResults || [],
        errorMsg: state.errorMsg
    };
}

const headers = [
    '',
    'Media',
    'Artist',
    'Collection',
    'Track',
    ''
]

const ItemResults = ({ itemResults, errorMsg }) => {
    if(errorMsg){
        return (
            <div className="alert alert-danger fade in">
                <strong>Error!</strong> A problem has been occurred while fetching data
                {errorMsg}
            </div>
        );
    }

    if(itemResults.length <= 0){
        return '';
    }

    return (
        <Table striped bordered condensed hover>
        <thead>
            <tr>
                { headers.map((h, i) => <th key={i}>{ h }</th>) }
            </tr>
        </thead>

        <tbody>
            {
            itemResults.map((res, i) => {
                return (
                    <tr key={i} >
                        <td key={1}><img alt="" src={ res.artworkUrl60 }/></td>
                        <td key={2}>{ res.kind }</td>
                        <td key={3}><a href={ res.artistViewUrl } target="_blank">{ res.artistName }</a></td>
                        <td key={4}><a href={ res.collectionViewUrl } target="_blank">{ res.collectionName }</a></td>
                        <td key={5}><a href={ res.trackViewUrl } target="_blank">{ res.trackName }</a></td>
                        <td key={6}><a href={ res.previewUrl } target="_blank">preview</a></td>
                    </tr>
                );
            })
            }
        </tbody>
        </Table>
    );
};

export default connect(mapStateToProps)(ItemResults);
