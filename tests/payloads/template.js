const sampleTemplate = {
    id: "$generateUUID()",
    name: "$oneOfList('names.js')",
    phone: "$oneOfList('phones.js')",
    address: "$oneOfList('addresses.js')",
    node: {
        value: "$randomString(10)",
        name: "$randomString(20)",
        int: "$randomNumber(4)"
    },
    otherNode: {
        fixValue: "abc",
        randomString: "$randomString(40)"
    }
};

export default sampleTemplate;