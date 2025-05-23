// src/components/Visualization.js
import React from 'react';

function Visualization({ partitions, config }) { // Expects 'partitions' and 'config' props
  const { totalMemory, partitionSize, numPartitions } = config;

  // Check if partitions array is undefined, null, or empty
  if (!partitions || partitions.length === 0) {
     return <p className="text-gray-600 text-center italic">Run simulation to see memory visualization.</p>;
  }

   // Handle the case where numPartitions is 0 but partitions state might be initialized empty
   if (numPartitions === 0) {
       return <p className="text-red-600 text-center italic">Cannot visualize: Number of partitions is 0 (check configuration).</p>;
   }


  return (
    <div className="flex flex-col border border-gray-300 rounded overflow-hidden h-96 p-2 bg-gray-100"> {/* Container for vertical blocks */}
      <div className="flex items-center justify-between text-sm text-gray-700 mb-2 px-2"> {/* Added horizontal padding */}
          <span>Total Memory: <span className="font-semibold">{totalMemory} KB</span></span>
          <span>Partition Size: <span className="font-semibold">{partitionSize} KB</span></span>
          <span>Partitions: <span className="font-semibold">{numPartitions}</span></span>
      </div>
      {/* Memory blocks container */}
      <div className="flex flex-col space-y-0.5 flex-grow overflow-y-auto pr-1"> {/* Use flex-grow, overflow-y-auto, pr-1 for scrollbar */}
        {/* Ensure partitions array exists before mapping */}
        {partitions && partitions.map((partition, index) => (
          <div
            key={index}
            className={`flex flex-col items-center justify-center text-xs text-gray-800 border border-gray-400 p-1 rounded-sm text-center
                       ${partition ? 'bg-blue-300 border-blue-500' : 'bg-green-300 border-green-500'}`} // Adjusted colors & borders
            style={{ flexGrow: 1, minHeight: '25px' }} // Flex grow makes them take equal height, minHeight prevents collapse, slightly increased
          >
            {/* Display partition info */}
            {partition ? (
              <>
                <span className="font-semibold">P{partition.processId}</span>
                <span>({partition.size} KB)</span>
                 {/* You could show fragmentation here too if you add it to the partition object state */}
              </>
            ) : (
              <span className="text-gray-700">Partition {index + 1} (Free)</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Visualization;