const contractAddress = '0xcAB73291aB46544146db1cCD107BbB763f8073FF'; // Replace with your contract's address
const contractABI = [
    {
        "constant": false,
        "inputs": [
            {
                "name": "_make",
                "type": "string"
            },
            {
                "name": "_model",
                "type": "string"
            },
            {
                "name": "_year",
                "type": "uint256"
            }
        ],
        "name": "addVehicle",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "getVehicleCount",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "index",
                "type": "uint256"
            }
        ],
        "name": "getVehicle",
        "outputs": [
            {
                "name": "make",
                "type": "string"
            },
            {
                "name": "model",
                "type": "string"
            },
            {
                "name": "year",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }
];

const web3 = new Web3(web3.currentProvider);
const contract = new web3.eth.Contract(contractABI, contractAddress);

document.addEventListener("DOMContentLoaded", () => {
    // Load functions and connect to the contract

    // Add Vehicle Button
    const addVehicleButton = document.getElementById("addVehicleButton");
    addVehicleButton.addEventListener("click", addVehicle);

    // Get Vehicle Count Button
    const getVehicleCountButton = document.getElementById("getVehicleCountButton");
    getVehicleCountButton.addEventListener("click", () => {
        getVehicleCount().then(count => {
            displayResult(`Vehicle Count: ${count}`);
        });
    });

    // Get Vehicle Button
    const getVehicleButton = document.getElementById("getVehicleButton");
    getVehicleButton.addEventListener("click", () => {
        const index = parseInt(document.getElementById("vehicleIndex").value);
        getVehicle(index).then(result => {
            displayResult(`Vehicle Details - Make: ${result.make}, Model: ${result.model}, Year: ${result.year}`);
        });
    });
});

function displayResult(result) {
    const resultElement = document.getElementById("result");
    resultElement.innerHTML = result;
}

function addVehicle() {
    const make = document.getElementById("vehicleMake").value;
    const model = document.getElementById("vehicleModel").value;
    const year = parseInt(document.getElementById("vehicleYear").value);

    // Call the contract's addVehicle function
    contract.methods.addVehicle(make, model, year).send({ from: 'yourAddress' })
        .on('receipt', (receipt) => {
            // Vehicle added successfully
            console.log('Vehicle added:', receipt);
        })
        .on('error', (error) => {
            // Error adding the vehicle
            console.error('Error adding vehicle:', error);
        });
}

async function getVehicleCount() {
    // Call the contract's getVehicleCount function
    return await contract.methods.getVehicleCount().call();
}

async function getVehicle(index) {
    // Call the contract's getVehicle function
    return await contract.methods.getVehicle(index).call();
}
