const SubmitButton = ({ disabled = false }) => {
  return (
    <div className="mt-6 w-full max-w-md mx-auto">
      <button
        type="submit"
        disabled={disabled}
        className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white 
          ${disabled ? 'bg-gray-500 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'}
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
      >
        Calculate Fare
      </button>
    </div>
  );
};

export default SubmitButton;
