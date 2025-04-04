import React from "react";
import GraphComponent from "./components/GraphComponent";

const App = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        Disease Spread Prediction 🦠
      </h1>
      <p className="text-lg text-gray-600 text-center max-w-2xl">
        This simulation models how a disease spreads through a population based on interactions.
      </p>
      <button className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
        Start Simulation
      </button>
      <div className="w-full max-w-4xl mt-10 flex flex-col items-center">
        <GraphComponent />
        <div className="w-full h-64 bg-white shadow-lg rounded-lg mt-6 flex items-center justify-center">
          <p className="text-gray-500">Map Visualization (Coming Soon)</p>
        </div>
      </div>
    </div>
  );
};

export default App;
