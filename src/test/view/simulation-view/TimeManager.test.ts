import { TimeManager } from "../../../view/simulation-view/subsystems/TimeManager";
import { LightFrame } from "../../../view/simulation-view/state/LightFrame";
import { DayTime } from "../../../repository/entity/DayTime";
import { lightFrames } from "../../../view/simulation-view/config";

it("Setting simulation time to NOON should apply noon light", () => {
  var timeManager = new TimeManager();

  timeManager.setSimulationTime(DayTime.NOON);

  var currentLight = new LightFrame();
  var updatedLight = timeManager.applyLightChanges(currentLight);

  expect(updatedLight).toEqual(lightFrames.noon);
});

it("Setting simulation time to SUNSET should apply sunset light", () => {
  var timeManager = new TimeManager();

  timeManager.setSimulationTime(DayTime.SUNSET);

  var currentLight = new LightFrame();
  var updatedLight = timeManager.applyLightChanges(currentLight);

  expect(updatedLight).toEqual(lightFrames.sunset);
});

it("Setting simulation time to NIGHT should apply night light", () => {
  var timeManager = new TimeManager();

  timeManager.setSimulationTime(DayTime.NIGHT);

  var currentLight = new LightFrame();
  var updatedLight = timeManager.applyLightChanges(currentLight);

  expect(updatedLight).toEqual(lightFrames.night);
});

it("Changing simulation time should update the applied light", () => {
  var timeManager = new TimeManager();

  timeManager.setSimulationTime(DayTime.NOON);
  var currentLight1 = new LightFrame();
  var updatedLight1 = timeManager.applyLightChanges(currentLight1);
  expect(updatedLight1).toEqual(lightFrames.noon);

  timeManager.setSimulationTime(DayTime.SUNSET);
  var currentLight2 = new LightFrame();
  var updatedLight2 = timeManager.applyLightChanges(currentLight2);
  expect(updatedLight2).toEqual(lightFrames.sunset);

  timeManager.setSimulationTime(DayTime.NIGHT);
  var currentLight3 = new LightFrame();
  var updatedLight3 = timeManager.applyLightChanges(currentLight3);
  expect(updatedLight3).toEqual(lightFrames.night);
});

it("Multiple calls to applyLightChanges should return consistent results", () => {
  var timeManager = new TimeManager();

  timeManager.setSimulationTime(DayTime.NIGHT);

  var light1 = timeManager.applyLightChanges(new LightFrame());
  var light2 = timeManager.applyLightChanges(new LightFrame());
  var light3 = timeManager.applyLightChanges(new LightFrame());

  expect(light1).toEqual(lightFrames.night);
  expect(light2).toEqual(lightFrames.night);
  expect(light3).toEqual(lightFrames.night);
  expect(light1).toEqual(light2);
  expect(light2).toEqual(light3);
});

it("Setting simulation time back to previous value should work correctly", () => {
  var timeManager = new TimeManager();

  timeManager.setSimulationTime(DayTime.SUNSET);
  var light1 = timeManager.applyLightChanges(new LightFrame());
  expect(light1).toEqual(lightFrames.sunset);

  timeManager.setSimulationTime(DayTime.NIGHT);
  var light2 = timeManager.applyLightChanges(new LightFrame());
  expect(light2).toEqual(lightFrames.night);

  timeManager.setSimulationTime(DayTime.SUNSET);
  var light3 = timeManager.applyLightChanges(new LightFrame());
  expect(light3).toEqual(lightFrames.sunset);
});
