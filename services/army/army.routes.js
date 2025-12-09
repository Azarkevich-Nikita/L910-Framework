const fs = require("fs").promises;

const soldierPath = "soldiers.json";
const vehiclePath = "vehicles.json";


async function readJSON(file){
    const data = await fs.readFile(file, 'utf-8')
    return JSON.parse(data);
}

async function writeJSON(file, newData){
    const currentData = await readJSON(file);
    currentData.push(newData);
    await fs.writeFile(file, JSON.stringify(currentData, null, 2));
}

module.exports = (app) => {

    //
    //  <-- S O L D I E R S -->
    //

    app.get("/soldiers", async (req, res) => {
        const soldiers = await readJSON(soldierPath);
        res.json(soldiers);
    });

    app.get("/soldiers/:id", async (req, res) => {
        const soldiers = await readJSON(soldierPath);
        const soldier = soldiers.find(s => s.id == req.params.id);

        if(!soldier){
            res.status(404).json({ error: "Soldier not founnd" });
        }
        else{
            res.json(soldier);
        }
    });

    //
    // <-- V E H I C L E S -->
    //

    app.get("/vehicles", async (req, res) => {
        const vehicles = await readJSON(vehiclePath);
        res.json(vehicles);
    });

    app.get("/vehicles/:id", async (req, res) => {
        const vehicles = await readJSON(vehiclePath);
        const vehicle = vehicles.find(v => v.id == req.params.id);

        if(!vehicle){
            res.status(404).json({ error: "Vehicle not found" });
        }
        else{
            res.json(vehicle);
        }
    })
}