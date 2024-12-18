import { useSnapshot } from "valtio";
import Experience from "./components/Experience";
import { craftedClimateState } from "../store";
import LocationPin from "./components/LocationPin";
import { useEffect } from "react";

function App() {
  const snap = useSnapshot(craftedClimateState);

  useEffect(() => {
    if (snap.climateColor === "green") {
      craftedClimateState.description = "Air quality is considered satisfactory.";
    } else if (snap.climateColor === "yellow") {
      craftedClimateState.description = "Air quality is acceptable.";
    } else if (snap.climateColor === "orange") {
      craftedClimateState.description = "Sensitive groups may experience health effects.";
    } else if (snap.climateColor === "red") {
      craftedClimateState.description = "Everyone may begin to experience health effects.";
    } else if (snap.climateColor === "purple") {
      craftedClimateState.description = "Everyone may experience more serious health effects.";
    } else if (snap.climateColor === "maroon") {
      craftedClimateState.description = "Health warnings of emergency conditions.";
    } else {
      craftedClimateState.description = "";
    }
  }, [snap.climateColor]);

  return (
    <>
      <div
        className="w-auto p-1 flex flex-col h-screen overflow-hidden bg-white font-bold"
        style={{ color: snap.climateColor }}
      >
        {/* Title, Location, Calender */}
        <div className="flex flex-col items-center text-center gap-2">
          <div
            className="w-[60%] text-nowrap p-2 text-xl md:text-2xl font-bold rounded-b-md text-white"
            style={{ backgroundColor: snap.climateColor }}
          >
            AIR QUALITY INDEX
          </div>
          <div className="w-[50%] flex justify-between">
            <div className="w-full flex gap-1 justify-center text-xl items-center">
              <div>
                <LocationPin size={20} />
              </div>
              <div>Location</div>
            </div>
          </div>
          <div className="w-[50%] text-xl">Date</div>
        </div>

        {/* 3D Experience */}
        <Experience />

        {/* R3 */}
        <div className="text-2xl text-center">{snap.apiNum}</div>
        <div className="text-center text-lg mb-5 p-2">
          <div>
            <h1>Health Alert:</h1>
            <p>{snap.description}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
