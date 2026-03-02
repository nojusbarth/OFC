import { OFCEvent } from "../../controller/interface/OFCEvent";

it("Basic Event Emission Tests", () => {
    const ofcEvent = new OFCEvent<string>();
    const handler1 = jest.fn();
    const handler2 = jest.fn();

    ofcEvent.register(handler1);
    const TEST_VALUE_1 = "Test Value 1";
    ofcEvent.notify(TEST_VALUE_1);

    expect(handler1).toHaveBeenCalledWith(TEST_VALUE_1);
    expect(handler1).toHaveBeenCalledTimes(1);
    expect(handler2).not.toHaveBeenCalled();

    ofcEvent.register(handler2);
    const TEST_VALUE_2 = "Test Value 2";
    ofcEvent.notify(TEST_VALUE_2);

    expect(handler1).toHaveBeenCalledWith(TEST_VALUE_2);
    expect(handler1).toHaveBeenCalledTimes(2);
    expect(handler2).toHaveBeenCalledWith(TEST_VALUE_2);
    expect(handler2).toHaveBeenCalledTimes(1);

    ofcEvent.remove(handler1);
    const TEST_VALUE_3 = "Test Value 3";
    ofcEvent.notify(TEST_VALUE_3);

    expect(handler1).not.toHaveBeenCalledWith(TEST_VALUE_3);
    expect(handler1).toHaveBeenCalledTimes(2);
    expect(handler2).toHaveBeenCalledWith(TEST_VALUE_3);
    expect(handler2).toHaveBeenCalledTimes(2);

    ofcEvent.remove(handler2);
    const TEST_VALUE_4 = "Test Value 4";
    ofcEvent.notify(TEST_VALUE_4);

    expect(handler1).not.toHaveBeenCalledWith(TEST_VALUE_4);
    expect(handler1).toHaveBeenCalledTimes(2);
    expect(handler2).not.toHaveBeenCalledWith(TEST_VALUE_4);
    expect(handler2).toHaveBeenCalledTimes(2);
});

it("Batching Tests", () => {
    const ofcEvent = new OFCEvent<string>();
    const handler = jest.fn();

    ofcEvent.register(handler);
    ofcEvent.startBatching((batch, value) => batch.push(value));

    const TEST_VALUE_1 = "Batch Test Value 1";
    const TEST_VALUE_2 = "Batch Test Value 2";
    ofcEvent.notify(TEST_VALUE_1);
    ofcEvent.notify(TEST_VALUE_2);

    expect(handler).not.toHaveBeenCalled();

    ofcEvent.endBatching();
    expect(handler).toHaveBeenCalledWith(TEST_VALUE_1);
    expect(handler).toHaveBeenCalledWith(TEST_VALUE_2);
    expect(handler).toHaveBeenCalledTimes(2);
});