import React, {useState, Suspense} from 'react';
import './App.css';
import {OrbitControls, useGLTF} from "drei";

import {Canvas} from 'react-three-fiber'

const Sphere = ({color}) => {
  return <mesh>
    <sphereBufferGeometry attach={'geometry'}/>
    <meshLambertMaterial attach={"material"} color={color}/>
  </mesh>
}

const Model = () => {
  const model = useGLTF('/models3d/vintage_chair/scene.gltf')
  console.log(model)
  return <primitive object={model.scene} />
}

const colorMap = {
  green: "green",
  red: "red",
  blue: "blue"
}

function App() {
  const [color, setColor] = useState(colorMap.blue)
  const setNewColor = (ev) => {
    setColor(ev.target.value)
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className={'canvas-wrapper'}>

          <Canvas>
            <ambientLight intensity={0.3}/>
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1}/>
            <pointLight position={[-10, -10, -10]}/>
            <OrbitControls/>
            <Suspense fallback={null}>
              {/*<mesh material={model.material} geometry={model.nodes} position={[0, 0, 5]}>*/}
              {/*  <meshStandardMaterial*/}
              {/*    attach="material"*/}
              {/*    color="white"*/}
              {/*    roughness={0.3}*/}
              {/*    metalness={1.0}*/}
              {/*  />*/}
              {/*</mesh>*/}
              <mesh position={[0, 0, 0]}>
                <Model color={color}/>
                <meshStandardMaterial attach="material" color={color} transparent opacity={0.5} />

              </mesh>
              {/*<Sphere color={color}/>*/}
            </Suspense>
          </Canvas>
        </div>

        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        {Object.values(colorMap).map((color) => {
          return <button key={`color-${color}`} value={color} type={"button"}
                         onClick={(ev) => setNewColor(ev)}>
            {color}
          </button>
        })

        }
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
