// src/components/ConfigForm.js
import React from 'react';

function ConfigForm({ totalMemory, setTotalMemory, partitionSize, setPartitionSize }) {
  return (
    <div className="space-y-4"> {/* Tailwind spacing */}
      <div>
        <label htmlFor="totalMemory" className="block text-sm font-medium text-gray-700 mb-1">
          Total Memory (KB):
        </label>
        <input
        type='Number'
          id="totalMemory"
          value={totalMemory}
          onChange={(e) => setTotalMemory(parseInt(e.target.value) || 0)} // Parse to integer, default to 0 if invalid or empty
          className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md" // Updated input styles
          min="1"
        />
      </div>
      <div>
        <label htmlFor="partitionSize" className="block text-sm font-medium text-gray-700 mb-1">
          Partition Size (KB):
        </label>
        <input
          type="Number"
          id="partitionSize"
          value={partitionSize}
          onChange={(e) => setPartitionSize(parseInt(e.target.value) || 0)} // Parse to integer, default to 0 if invalid or empty
          className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md" // Updated input styles
          min="1"
        />
      </div>
      {/* Reset button is in App.js */}
    </div>
  );
}

export default ConfigForm;