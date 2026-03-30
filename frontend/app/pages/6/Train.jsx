import { useEffect, useState } from 'react';
import { API_URL } from "@/config";
import Script from 'next/script';

export default function Train({ setNetwork }) {
  const [brainLoaded, setBrainLoaded] = useState(false);
  const [train, setTrain] = useState({});

  useEffect(() => {
    fetch(`${API_URL}/pages/r6`)
      .then((response) => response.json())
      .then((data) => {
        setTrain(data);
        // setBrainLoaded(true);
    });
  }, [])
  useEffect(() => {

    if (brainLoaded) {
      async function initNetwork() {
        const trainingData = train;
        
        // Now that brain.js is loaded, we can use it to create a neural network
        const network = new brain.NeuralNetwork();
        network.fromJSON(trainingData)
        
        // console.log(network) // objeto
        // console.log(trainingData) // train.json
        setNetwork(network); // Update the state with the trained network
      }

      initNetwork();
    }
  }, [brainLoaded, setNetwork, train]);

  return (
    <>
      <Script
        src="6/brain.js"
        // src={`${API_URL}/pages/6/t6`}
        strategy="lazyOnload"
        onLoad={() => {
          console.log("brain.js loaded");
          setBrainLoaded(true);
        }}
      />
    </>
  );
}
