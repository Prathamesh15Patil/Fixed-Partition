// src/components/ResultsTable.js
import React from 'react';

function ResultsTable({ results }) { // Expects 'results' prop
  // Check if results is undefined, null, or empty array
  if (!results || results.length === 0) {
    return <p className="text-gray-600 text-center italic">Run the simulation to see allocation results.</p>;
  }

  return (
    <div className="overflow-x-auto shadow-md sm:rounded-lg border border-gray-200"> {/* Responsive table container */}
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Partition
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Process
            </th>
             <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Size (KB)
            </th>
             <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Internal Fragment (KB)
            </th>
             <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {/* Use a check before map just in case, although the initial check handles empty */}
          {results && results.map((result, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {result.partitionId ? result.partitionId : '--'}
              </td>
               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {result.processId ? `P${result.processId}` : '--'} {/* Handle case where processId might be null/0 */}
              </td>
               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {result.processSize !== null ? result.processSize : '--'}
              </td>
               <td className="px-6 py-4 whitespace-nowrap text-sm">
                 {/* Display fragmentation only if status is Allocated */}
                 {result.status === 'Allocated' && result.fragmentation !== null ? (
                   <span className="text-green-700 font-medium">{result.fragmentation}</span>
                 ) : (
                   <span className="text-gray-500 italic">--</span> // Show -- for fragmentation if not allocated
                 )}
              </td>
               <td className={`px-6 py-4 whitespace-nowrap text-sm font-semibold
                   ${result.status === 'Allocated' ? 'text-green-600'
                    : result.status === 'Too Large' ? 'text-red-600'
                    : 'text-yellow-600' // e.g., 'No Partition' status
                   }`}>
                {result.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ResultsTable;