// src/App.js
import React, { useState, useEffect } from 'react';
import ConfigForm from './components/ConfigForm';
import ProcessInput from './components/ProcessInput';
import ResultsTable from './components/ResultsTable';
import Visualization from './components/Visualization';

function App() {
  // State for configuration
  const [totalMemory, setTotalMemory] = useState(1024);
  const [partitionSize, setPartitionSize] = useState(128);

  // State for processes to be allocated
  const [processSizes, setProcessSizes] = useState([]);

  // State for allocation results (for the table)
  const [allocationResults, setAllocationResults] = useState([]);

  // State for visualization (represents the current state of partitions)
  const [partitions, setPartitions] = useState([]);

   // Calculate numPartitions whenever config changes
   const numPartitions = totalMemory > 0 && partitionSize > 0
     ? Math.floor(totalMemory / partitionSize)
     : 0;

   // Reset results and visualization when config or process list changes
   // This ensures re-running simulation gives fresh results
   useEffect(() => {
       setAllocationResults([]);
       setPartitions([]);
   }, [totalMemory, partitionSize, processSizes]);


  const runSimulation = () => {
    // --- Input Validation ---
    if (totalMemory <= 0 || partitionSize <= 0) {
      alert("Please set valid Total Memory and Partition Size (must be positive numbers).");
      return;
    }
    if (processSizes.length === 0) {
        alert("Please add some processes to allocate.");
        return;
    }
     if (totalMemory < partitionSize) {
         alert("Total Memory must be greater than or equal to Partition Size.");
         return;
     }
     if (totalMemory % partitionSize !== 0) {
         console.warn("Warning: Total Memory (" + totalMemory + " KB) is not perfectly divisible by Partition Size (" + partitionSize + " KB). Simulation will use " + numPartitions + " full partitions.");
         // You might choose to alert or just log this warning
     }


    // --- Simulation Logic (Fixed Partition, Sequential Allocation) ---
    const currentPartitionsState = Array(numPartitions).fill(null); // Represents current state of memory partitions (null = free)
    const results = []; // Array to store table results
    let currentPartitionIndex = 0; // Tracks the next partition to attempt allocation

    for (let i = 0; i < processSizes.length; i++) {
      const processSize = processSizes[i];
      const processId = i + 1;

      // 1. Check if process is too large for *any* partition
      if (processSize > partitionSize) {
        results.push({
          processId: processId,
          processSize: processSize,
          status: 'Too Large',
          partitionId: null,
          fragmentation: null
        });
        continue; // Move to the next process
      }

      // 2. Attempt to allocate to the next available partition
      if (currentPartitionIndex < numPartitions) {
         const fragmentation = partitionSize - processSize;

         // Update the internal partition state for visualization
         currentPartitionsState[currentPartitionIndex] = {
             processId: processId,
             size: processSize,
             fragmentation: fragmentation
         };

         // Add result for the table
         results.push({
            processId: processId,
            processSize: processSize,
            status: 'Allocated',
            partitionId: currentPartitionIndex + 1, // Use 1-based indexing for display
            fragmentation: fragmentation
         });

         currentPartitionIndex++; // Move to the next partition for the next process attempt

      } else {
        // 3. No more free partitions in the sequential allocation scheme
         results.push({
            processId: processId,
            processSize: processSize,
            status: 'No Partition', // All partitions are occupied based on sequential filling
            partitionId: null,
            fragmentation: null
         });
      }
    }

    // --- Update State ---
    setAllocationResults(results);
    setPartitions([...currentPartitionsState]); // Update visualization state
  };

   // Reset Processes List and clear results/visualization
   const resetProcesses = () => {
     setProcessSizes([]);
     // useEffect handles clearing results and partitions when processSizes changes
   };

    // Reset Configuration and clear processes/results/visualization
   const resetConfig = () => {
       setTotalMemory(1024);
       setPartitionSize(128);
        // useEffect handles clearing processes, results and partitions when config changes
   }


  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 font-sans bg-gray-100 min-h-screen rounded-lg shadow-inner"> {/* Added padding and background */}
      <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8">
        Fixed Partition Memory Allocation
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-xl border border-gray-200"> {/* Improved styling */}
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Configuration</h2>
            <ConfigForm
              totalMemory={totalMemory}
              setTotalMemory={setTotalMemory}
              partitionSize={partitionSize}
              setPartitionSize={setPartitionSize}
            />
             <p className="mt-4 text-sm text-gray-600 text-right">
               Calculated Partitions: <span className="font-semibold text-gray-800">{numPartitions}</span>
             </p>
             <div className="mt-4 text-right">
                 <button
                    onClick={resetConfig}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 text-sm"
                 >
                   Reset Config
                 </button>
             </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-xl border border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Processes</h2>
            <ProcessInput
              processSizes={processSizes}
              setProcessSizes={setProcessSizes}
            />
             <div className="mt-4 text-right">
                 <button
                    onClick={resetProcesses}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 text-sm"
                 >
                   Reset Processes
                 </button>
             </div>
        </div>
      </div>

      {/* Run Simulation Button */}
      <div className="text-center mb-8">
        <button
          onClick={runSimulation}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg text-lg shadow-lg transition duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:opacity-50 disabled:cursor-not-allowed"
           disabled={processSizes.length === 0 || totalMemory <= 0 || partitionSize <= 0} // Disable if no processes or invalid config
        >
          Run Simulation
        </button>
      </div>

       {/* Visualization and Results */}
       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
           <div className="bg-white p-6 rounded-lg shadow-xl border border-gray-200">
               <h2 className="text-2xl font-semibold text-gray-700 mb-4">Memory Visualization</h2>
                {/* Pass calculated numPartitions to Visualization */}
                <Visualization
                    partitions={partitions}
                    config={{ totalMemory, partitionSize, numPartitions }}
                />
           </div>
            <div className="bg-white p-6 rounded-lg shadow-xl border border-gray-200">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">Allocation Results</h2>
                 {/* Pass the allocationResults array to ResultsTable */}
                 <ResultsTable results={allocationResults} />
            </div>
       </div>


       {/* Footer */}
       <footer className="text-center mt-12 text-gray-500 text-sm">
           {/* OS Course Project - Fixed Partition Simulation | Built with React and Tailwind CSS */}
       </footer>

    </div>
  );
}

export default App;