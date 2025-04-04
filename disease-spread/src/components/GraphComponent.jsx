import React, { useState } from "react";
import CytoscapeComponent from "react-cytoscapejs";
import { motion } from "framer-motion";
import MapComponent from "./MapComponent";

const locations = {
  Delhi: [28.6139, 77.2090],
  Mumbai: [19.0760, 72.8777],
  Bangalore: [12.9716, 77.5946],
  Chennai: [13.0827, 80.2707],
  Kolkata: [22.5726, 88.3639],
  Hyderabad: [17.3850, 78.4867],
  Pune: [18.5204, 73.8567],
  Ahmedabad: [23.0225, 72.5714],
  Jaipur: [26.9124, 75.7873],
  Lucknow: [26.8467, 80.9462],
  Chandigarh: [30.7333, 76.7794],
  Bhopal: [23.2599, 77.4126],
  Indore: [22.7196, 75.8577],
  Patna: [25.5941, 85.1376],
  Guwahati: [26.1445, 91.7362],
  Visakhapatnam: [17.6868, 83.2185],
  Surat: [21.1702, 72.8311],
  Kanpur: [26.4499, 80.3319],
  Nagpur: [21.1458, 79.0882],
  Coimbatore: [11.0168, 76.9558],
};

const initialElements = Object.keys(locations).map((city) => ({
  data: { id: city, label: city, infected: false },
}));

const connections = [
  ["Delhi", "Mumbai"], ["Delhi", "Chandigarh"], ["Delhi", "Lucknow"],
  ["Mumbai", "Pune"], ["Mumbai", "Surat"],
  ["Bangalore", "Chennai"], ["Bangalore", "Hyderabad"],
  ["Kolkata", "Patna"], ["Kolkata", "Guwahati"],
  ["Hyderabad", "Visakhapatnam"],
  ["Pune", "Ahmedabad"], ["Pune", "Indore"],
  ["Jaipur", "Lucknow"],
  ["Chandigarh", "Bhopal"],
  ["Patna", "Kanpur"],
  ["Nagpur", "Coimbatore"],
];

connections.forEach(([source, target]) => {
  initialElements.push({ data: { source, target } });
});

const GraphComponent = () => {
  const [elements, setElements] = useState(initialElements);
  const [infectedLocations, setInfectedLocations] = useState([]);
  const [infectedCities, setInfectedCities] = useState(new Set());

  const infectPerson = (startId) => {
    let queue = [startId];
    let visited = new Set(infectedCities);
    let newElements = [...elements];

    const spreadInfection = () => {
      if (queue.length === 0) return;

      let nextQueue = [];
      newElements = newElements.map((el) => {
        if (el.data.id && queue.includes(el.data.id) && !visited.has(el.data.id)) {
          visited.add(el.data.id);
          newElements.forEach((e) => {
            if (e.data.source === el.data.id && !visited.has(e.data.target)) {
              nextQueue.push(e.data.target);
            }
            if (e.data.target === el.data.id && !visited.has(e.data.source)) {
              nextQueue.push(e.data.source);
            }
          });
          return { ...el, data: { ...el.data, infected: true } };
        }
        return el;
      });

      setElements([...newElements]);
      setInfectedLocations([...visited].map((id) => locations[id]));
      setInfectedCities(new Set(visited));
      queue = nextQueue;
      setTimeout(spreadInfection, 1000);
    };

    spreadInfection();
  };

  const stylesheet = [
    {
      selector: "node",
      style: {
        width: "40px",
        height: "40px",
        backgroundColor: (ele) => (ele.data("infected") ? "#FF4136" : "#007BFF"),
        label: "data(label)",
        color: "white",
        textValign: "center",
        textHalign: "center",
        fontSize: "12px",
        transition: "background-color 0.5s ease-in-out",
      },
    },
    {
      selector: "edge",
      style: {
        width: 2,
        lineColor: "#ddd",
        targetArrowShape: "triangle",
        targetArrowColor: "#ddd",
      },
    },
  ];

  return (
    <div className="w-full h-auto bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-lg font-bold text-gray-700 mb-2">Disease Spread Simulation</h2>
      <motion.div
        className="relative w-full h-6 bg-gray-300 rounded-md overflow-hidden mt-2"
        initial={{ width: "0%" }}
        animate={{ width: `${(infectedCities.size / Object.keys(locations).length) * 100}%` }}
        transition={{ duration: 1 }}
      >
        <div className="absolute left-0 h-full bg-red-500" style={{ width: `${(infectedCities.size / Object.keys(locations).length) * 100}%` }}></div>
      </motion.div>
      <p className="text-gray-600 font-medium mt-2">Infected Cities: {infectedCities.size}</p>

      <CytoscapeComponent
        elements={elements}
        style={{ width: "100%", height: "400px" }}
        layout={{ name: "circle" }}
        stylesheet={stylesheet}
        cy={(cy) => {
          cy.on("tap", "node", (event) => {
            const nodeId = event.target.id();
            infectPerson(nodeId);
          });
        }}
      />

      <h3 className="text-md font-semibold mt-6">Quarantine Zones</h3>
      <MapComponent infectedLocations={infectedLocations} />
    </div>
  );
};

export default GraphComponent;
