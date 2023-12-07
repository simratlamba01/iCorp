import React, { useState } from "react";
import "./App.css"
import CytoscapeComponent from "react-cytoscapejs";

export default function App() {
  const closeModal = () => {
    setIsPopup(false);
  }
  const [width, setWith] = useState("100%");
  const [height, setHeight] = useState("400px");
  const [isPopup, setIsPopup] = useState(false);
  const [graphData, setGraphData] = useState({
    nodes: [
      { data: { id: "1", label: "Deep Learning", type: "ip" } },
      { data: { id: "2", label: "Node 1", type: "ip" } },
      { data: { id: "3", label: "Node 2", type: "ip" } },
      { data: { id: "4", label: "React 2", type: "device" } },
      { data: { id: "5", label: "Angular 3", type: "device" } },
      { data: { id: "6", label: "React 3", type: "ip" } },
      { data: { id: "7", label: "Node 5", type: "device" } },
      { data: { id: "8", label: "Node 6", type: "device" } },
      { data: { id: "9", label: "Node 7", type: "device" } },
      { data: { id: "10", label: "Node 8", type: "ip" } },
      { data: { id: "11", label: "Node 9", type: "device" } },
      { data: { id: "12", label: "Testing 3", type: "ip" } },
      { data: { id: "13", label: "Deep Learning 10", type: "device" } }
    ],
    edges: [
      {
        data: { source: "1", target: "3", label: "Node6" }
      },
      {
        data: { source: "3", target: "4", label: "Node4" }
      },
      {
        data: { source: "3", target: "5", label: "3 -> 5" }
      },
      {
        data: { source: "1", target: "5", label: " 6 -> 5" }
      },
      {
        data: { source: "6", target: "7", label: " 6 -> 7" }
      },
      {
        data: { source: "5", target: "8", label: " 6 -> 8" }
      },
      {
        data: { source: "6", target: "9", label: " 6 -> 9" }
      },
      {
        data: { source: "3", target: "13", label: " 3 -> 13" }
      }
    ]
  });

  const layout = {
    name: "breadthfirst",
    fit: true,
    // circle: true,
    directed: true,
    padding: 50,
    spacingFactor: 1.5,
    animate: true,
    animationDuration: 1000,
    avoidOverlap: true,
    nodeDimensionsIncludeLabels: false
  };

  const styleSheet = [
    {
      selector: "node",
      style: {
        backgroundColor: "#006622",
        width: 30,
        height: 30,
        label: "data(label)",

        "overlay-padding": "6px",
        "z-index": "10",
        //text props
        "text-outline-color": "#4a56a6",
        "text-outline-width": "2px",
        color: "#fff",
        fontSize: 20
      }
    },
    {
      selector: "node:selected",
      style: {
        "border-width": "6px",
        "border-color": "#AAD8FF",
        shape: "rectangle",
        "border-opacity": "1",
        "background-color": "#77828C",
        width: 50,
        height: 50,
        //text props
        "text-outline-color": "#77828C",
        "text-outline-width": 8
      }
    },
    {
      selector: "node[type='device']",
      style: {
        shape: "rectangle"
      }
    },
    {
      selector: "edge",
      style: {
        width: 3,
        // "line-color": "#6774cb",
        "line-color": "#AAD8FF",
        "target-arrow-color": "#6774cb",
        "target-arrow-shape": "triangle",
        "curve-style": "bezier"
      }
    }
  ];

  let myCyRef;

  return (
    <>
      <header>
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
          <div class="container-fluid">
            <a class="navbar-brand" href="#">iCorp</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                  <a class="nav-link active" aria-current="page" href="#">Home</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">Link</a>
                </li>
                <li class="nav-item dropdown">
                  <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Dropdown
                  </a>
                  <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li><a class="dropdown-item" href="#">Action</a></li>
                    <li><a class="dropdown-item" href="#">Another action</a></li>
                    <li><a class="dropdown-item" href="#">Something else here</a></li>
                  </ul>
                </li>
              </ul>
              <form class="d-flex">
                <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                <button class="btn btn-outline-success" type="submit">Search</button>
              </form>
            </div>
          </div>
        </nav>
      </header>
      <section className="py-4">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div>
                <h1>ICorp</h1>
                <div
                >
                  <CytoscapeComponent
                    elements={CytoscapeComponent.normalizeElements(graphData)}
                    // pan={{ x: 200, y: 200 }}
                    style={{ width: width, height: height }}
                    zoomingEnabled={true}
                    maxZoom={3}
                    minZoom={0.1}
                    autounselectify={false}
                    boxSelectionEnabled={true}
                    layout={layout}
                    stylesheet={styleSheet}
                    cy={cy => {
                      myCyRef = cy;

                      console.log("EVT", cy);

                      cy.on("tap", "node", evt => {
                        var node = evt.target;
                        setIsPopup(true)
                      });
                    }}
                    abc={console.log("myCyRef", myCyRef)}
                  />
                </div>
                {isPopup && (
                  <>
                    <div className="overlay">
                      <div className="outer-container position-relative">
                        <div className="content-container">
                          <button className="close bg-transparent border-0 position-absolute top-0 end-0"
                            onClick={closeModal}>
                            <svg
                              width="24px"
                              height="24px"
                              version="1.1"
                              viewBox="0 0 24 24"
                            >
                              <g id="grid_system" />
                              <g id="_icons">
                                <path
                                  stroke="#000"
                                  fill="#000"
                                  d="M5.3,18.7C5.5,18.9,5.7,19,6,19s0.5-0.1,0.7-0.3l5.3-5.3l5.3,5.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3   c0.4-0.4,0.4-1,0-1.4L13.4,12l5.3-5.3c0.4-0.4,0.4-1,0-1.4s-1-0.4-1.4,0L12,10.6L6.7,5.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4   l5.3,5.3l-5.3,5.3C4.9,17.7,4.9,18.3,5.3,18.7z"
                                />
                              </g>
                            </svg>
                          </button>
                          <ul className="ps-0">
                            <li>
                              <div class="media d-flex">
                                <img class="me-3" src="https://placehold.co/64x64" alt="Generic placeholder image" />
                                <div class="media-body">
                                  <h5 class="mt-0">Media heading</h5>
                                  Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin.
                                </div>
                              </div>
                            </li>
                            <li>
                              <div class="media d-flex">
                                <img class="me-3" src="https://placehold.co/64x64" alt="Generic placeholder image" />
                                <div class="media-body">
                                  <h5 class="mt-0">Media heading</h5>
                                  Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis.
                                </div>
                              </div>
                            </li>
                            <li>
                              <div class="media d-flex">
                                <img class="me-3" src="https://placehold.co/64x64" alt="Generic placeholder image" />
                                <div class="media-body">
                                  <h5 class="mt-0">Media heading</h5>
                                  Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis.
                                </div>
                              </div>
                            </li>
                            <li>
                              <div class="media d-flex">
                                <img class="me-3" src="https://placehold.co/64x64" alt="Generic placeholder image" />
                                <div class="media-body">
                                  <h5 class="mt-0">Media heading</h5>
                                  Cras sit amet nibh libero, in gravida nulla. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
                                </div>
                              </div>
                            </li>
                            <li>
                              <div class="media d-flex">
                                <img class="me-3" src="https://placehold.co/64x64" alt="Generic placeholder image" />
                                <div class="media-body">
                                  <h5 class="mt-0">Media heading</h5>
                                  Cras sit amet nibh libero, in gravida nulla.
                                </div>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
