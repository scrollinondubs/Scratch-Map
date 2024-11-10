import PropTypes from 'prop-types';

const Button = ({ children, ...props }) => {
  return (
    <button
      className="p-2 font-semibold text-white bg-slate-700 rounded-lg shadow-md hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-700 focus:ring-offset-2"
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
