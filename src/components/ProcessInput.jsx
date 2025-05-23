// src/components/ProcessInput.js
import React, { useState } from 'react';

function ProcessInput({ processSizes, setProcessSizes }) {
  const [newProcessSize, setNewProcessSize] = useState('');

  const handleAddProcess = () => {
    const size = parseInt(newProcessSize.trim()); // Trim whitespace

    if (!isNaN(size) && size > 0) {
      setProcessSizes([...processSizes, size]); // Add to the list
      setNewProcessSize(''); // Clear the input
    } else {
      alert("Please enter a valid positive number for process size.");
    }
  };

  // Allow adding process on Enter key press in the input field
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddProcess();
    }
  };


  return (
    <div className="space-y-4">
      <div className="flex items-end space-x-2"> {/* Use items-end to align button to bottom */}
        <div className="flex-grow"> {/* Input takes available space */}
          <label htmlFor="processSize" className="block text-sm font-medium text-gray-700 mb-1">
            Add Process Size (KB):
          </label>
           <input
           type='number'
            id="processSize"
            value={newProcessSize}
            onChange={(e) => setNewProcessSize(e.target.value)}
            onKeyPress={handleKeyPress}
            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md" // Updated input styles
            min="1"
            placeholder="e.g., 100"
          />
        </div>
        <div> {/* Button container */}
            <button
              onClick={handleAddProcess}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition duration-150 ease-in-out sm:text-sm" // Added sm:text-sm for smaller screens
            >
              Add
            </button>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Processes to Allocate ({processSizes.length}):</h3>
        <ul className="list-disc list-inside max-h-40 overflow-y-auto border border-gray-300 p-3 rounded-md bg-gray-50 text-sm"> {/* List styling */}
          {processSizes.length === 0 ? (
            <li className="text-gray-500 italic">No processes added yet. Add processes above.</li>
          ) : (
            processSizes.map((size, index) => (
              <li key={index} className="text-gray-700">
                P{index + 1}: <span className="font-semibold">{size} KB</span>
              </li>
            ))
          )}
        </ul>
      </div>
      {/* Reset button is in App.js */}
    </div>
  );
}

export default ProcessInput;