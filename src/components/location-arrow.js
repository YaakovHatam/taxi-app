import { Icon } from 'semantic-ui-react'
import PropTypes from 'prop-types';

function LocationArrow(props) {

    const onLocationClick = () => {
        window.navigator.geolocation.getCurrentPosition((position) => {
            props.onLocationReceived(position.coords.latitude, position.coords.longitude);
        });
    }
    return (
        <Icon onClick={onLocationClick} name='location arrow' />
    );
}

LocationArrow.propTypes = {
    onLocationReceived: PropTypes.func.isRequired
}

export default LocationArrow;