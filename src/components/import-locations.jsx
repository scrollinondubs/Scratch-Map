import PropTypes from 'prop-types';
import { RxDownload } from "react-icons/rx";
import Button from './ui/button';

function ImportLocations({ setMarkers }) {
    const handleImport = () => {
        // TODO: Implement import functionality
        console.log('Import functionality to be implemented');
    };

    return (
        <Button onClick={handleImport}>
            <RxDownload size={24} />
        </Button>
    );
}

ImportLocations.propTypes = {
    setMarkers: PropTypes.func.isRequired,
};

export default ImportLocations;