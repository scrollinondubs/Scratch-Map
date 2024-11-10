import PropTypes from 'prop-types';

const Button = ({ children, ...props }) => {
  return (
    <button
      className="p-2 font-semibold text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      {...props}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
    children: PropTypes.node.isRequired,  // Validate that children is required and can be any valid node
  };

export default Button;
