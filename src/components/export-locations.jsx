import PropTypes from 'prop-types';
import { RxUpload } from "react-icons/rx";
import Button from './ui/button';

function ExportLocations({ markers }) {
    const handleExport = () => {
        // TODO: Implement export functionality
        console.log('Export functionality to be implemented');
    };

    return (
        <Button onClick={handleExport}>
            <RxUpload size={24} />
        </Button>
    );
}

ExportLocations.propTypes = {
    markers: PropTypes.array.isRequired,
};

export default ExportLocations;