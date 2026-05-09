export const Select = ({ label, id, options, error, registration, className = '', ...props }) => {
  return (
    <div className={className}>
      {label && <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
      <select 
        id={id}
        className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:border-primary-500 bg-white ${
          error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-primary-500'
        }`}
        {...registration}
        {...props}
      >
        <option value="">Select...</option>
        {options.map(opt => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};