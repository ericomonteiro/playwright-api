import {randomUUID} from "node:crypto";
import {oneOfList, randomNumber, randomString} from "../utils/template-processor";

const sampleTemplate = {
    id: randomUUID(),
    name: oneOfList("names.js"),
    phone: oneOfList('phones.js'),
    address: oneOfList('addresses.js'),
    node: {
        value: randomString(10),
        name: randomString(20),
        int: randomNumber(4)
    },
    otherNode: {
        fixValue: "abc",
        randomString: randomString(40)
    }
};

export default sampleTemplate;