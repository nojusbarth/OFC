import testDataFile from "./data.json"
import exportFile from "./export.json"
import {ProjectRepository} from "../../repository/ProjectRepository";
import {DayTime} from "../../repository/entity/DayTime";
import {PositionKeyFrame} from "../../repository/entity/PositionKeyFrame";
import {Color, Vector3} from "three";
import {Drone} from "../../controller/logic/Drone";
import {ColorKeyFrame} from "../../repository/entity/ColorKeyFrame";
import {wait} from "@testing-library/user-event/dist/utils";

it('should parse json string', () => {
    const data = JSON.stringify(testDataFile).toString()
    const repository = new ProjectRepository()
    repository.load(data, () => {
        // Settings
        expect(repository.getMaxTime()).toBe(1000);
        expect(repository.getCollisionRadius()).toBe(1);
        expect(repository.getDayTime()).toBe(DayTime.NIGHT);

        // Drones
        expect(repository.getAllDrones().length).toBe(1);
        expect(repository.getDroneById(0)!.getColorKeyFrames().length).toBe(1);
        expect(repository.getDroneById(0)!.getPositionKeyFrames().length).toBe(1);

        /// Drone updaten
        let updateDrone = repository.getDroneById(0)!
        updateDrone.insertPositionKeyFrame(new PositionKeyFrame(new Vector3(1,1,1), 100))
        repository.updateDrone(updateDrone)
        expect(repository.getDroneById(0)!.getPositionKeyFrames().length).toBe(2)

        /// Drone hinzufügen
        expect(repository.getNextDroneId()).toBe(1)
        let newDrone = new Drone(
            1,
            [new PositionKeyFrame(new Vector3(0,0,0), 0)],
            [new ColorKeyFrame(new Color(0,0,0), 0)],
        )
        repository.addDrone(newDrone)
        expect(repository.getAllDrones().length).toBe(2)

        /// Drone löschen
        repository.removeDrone(0)
        expect(repository.getDroneById(0)).toBeFalsy()

        // Test export
        expect(repository.exportConfig()).toBe(data)
    } )
});

it ('reset project', () => {
    const repository = new ProjectRepository()

    repository.load(null, (result) => {
        expect(result.getResult()).toBe(true)
        expect(repository.getDroneById(0)).toBeFalsy()
    })
})

it('parse wrong data', () => {
    let data = JSON.stringify(testDataFile)
    data = data.replace('{', '')
    const repository = new ProjectRepository()
    repository.load(data, (result) => {
        expect(result.getResult()).toBe(false)
        expect(result.getError()).toBeTruthy()
    })
    const fakeFile = new File([data], "project.json", {
        type: "text/json",
    });
    repository.load(fakeFile, (result) => {
        expect(result.getResult()).toBe(false)
        expect(result.getError()).toBeTruthy()
    })
})

it('parse wrong file version', () => {
    let data = JSON.stringify(testDataFile)
    data = data.replace('"version":"1"', '"version":"12"')
    const repository = new ProjectRepository()
    repository.load(data, (result) => {
        expect(result.getResult()).toBe(false)
        expect(result.getError()).toBeTruthy()
    })
})

it ('load project from file', () => {
    const repository = new ProjectRepository()
    const fakeFile = new File([JSON.stringify(testDataFile)], "project.json", {
        type: "text/json",
    });
    repository.load(fakeFile, (result) => {
        expect(result.getResult()).toBe(true)
        expect(repository.exportConfig()).toBe(JSON.stringify(testDataFile))
    })
})

it ('save and load project from localStorage', async () => {
    const repository = new ProjectRepository()
    repository.load(JSON.stringify(testDataFile), (result) => {
        repository.saveToLocalStorage()
    })
    await wait(500)
    const newRepository = new ProjectRepository()
    newRepository.loadLastProject()
    expect(repository.exportConfig()).toBe(JSON.stringify(testDataFile))
})

it('test export', () => {
    const repository = new ProjectRepository()
    repository.load(JSON.stringify(testDataFile), (result) => {
        expect(repository.export().replaceAll(/\s+/g, '')).toBe(JSON.stringify(exportFile))
    })
})

it ('should be able to parse exported data', () => {
    const startRepo = new ProjectRepository();
    startRepo.setMaxTime(5000);
    startRepo.setCollisionRadius(2);
    startRepo.setDayTime(DayTime.SUNSET);

    let drone1 = new Drone(
        0,
        [new PositionKeyFrame(new Vector3(0,0,0), 0)],
        [new ColorKeyFrame(new Color(1,0,0), 0)],
    )
    startRepo.addDrone(drone1);

    const exportedData = startRepo.exportConfig();
    const newRepo = new ProjectRepository();
    newRepo.load(exportedData, () => {});

    expect(newRepo.getMaxTime()).toBe(5000);
    expect(newRepo.getCollisionRadius()).toBe(2);
    expect(newRepo.getDayTime()).toBe(DayTime.SUNSET);
    expect(newRepo.getAllDrones().length).toBe(1);
    expect(newRepo.getDroneById(0)!.getPositionKeyFrames().length).toBe(1);
    expect(newRepo.getDroneById(0)!.getPositionKeyFrames()[0].getPos().equals(new Vector3(0,0,0))).toBe(true);
    expect(newRepo.getDroneById(0)!.getColorKeyFrames().length).toBe(1);
    expect(newRepo.getDroneById(0)!.getColorKeyFrames()[0].getColor().equals(new Color(1,0,0))).toBe(true);
});