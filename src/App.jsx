import { useSnapshot } from "valtio";
import Experience from "./components/Experience";
import { craftedClimateState } from "../store";

function App() {
  const snap = useSnapshot(craftedClimateState);
  const changeColor = () => {
    craftedClimateState.climateColor = "#e91313";
  };
  return (
    <>
      <div className={`w-auto flex flex-col h-screen bg-[#ff00ff]`}>
        {/* Title, Location, Calender */}
        <div className="flex flex-col items-center text-center ">
          <div className="w-[50%] bg-[#08f954] text-white" onClick={changeColor}>
            AIR QUALITY INDEX
          </div>
          <div className="w-[50%] flex justify-between bg-[#9A0084] text-white">
            <div className="w-full flex gap-1 justify-center items-center">
              <div>Icon</div>
              <div>Location</div>
            </div>
          </div>
          <div className="w-[50%] bg-[#9A0084] text-white">Date</div>
        </div>

        {/* Experience */}
        <Experience />

        {/* R3 */}
        <div className="text-center text-white">Meter Value</div>
        <div className="text-center text-white">Alert Message</div>
      </div>
    </>
  );
}

export default App;
