const fs = require("fs").promises;
const path = require('path');

const soldierPath = path.join(__dirname, 'soldiers.json');
const vehiclePath = path.join(__dirname, 'vehicles.json');


async function readJSON(file){
    const data = await fs.readFile(file, 'utf-8')
    return JSON.parse(data);
}

async function writeJSON(file, data){
    await fs.writeFile(file, JSON.stringify(data, null, 2));
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
            res.status(404).json({ error: "Soldier not found" });
        }
        else{
            res.json(soldier);
        }
    });

    app.post("/soldiers", async (req, res) => {
        const soldiers = await readJSON(soldierPath);
        const newSoldier = {
            id: Date.now(),
            name: req.body.name,
            rank: req.body.rank,
            age: req.body.age,
            isActive: req.body.isActive,
            enlistedAt: req.body.enlistedAt,
            skills: req.body.skills
        }
        soldiers.push(newSoldier);
        await writeJSON(soldierPath, soldiers);

        res.status(201).json(newSoldier);
    });

    app.put("/soldiers/:id", async (req, res) => {
        const soldiers = await readJSON(soldierPath);
        const index = soldiers.findIndex(s => s.id == req.params.id);

        if(index === -1){
            return res.status(404).json({ error: "Soldier not found" });
        }

        soldiers[index] = {
            id: soldiers[index].id,
            name: req.body.name,
            rank: req.body.rank,
            age: req.body.age,
            isActive: req.body.isActive,
            enlistedAt: req.body.enlistedAt,
            skills: req.body.skills
        }

        await writeJSON(soldierPath, soldiers);

        res.json(soldiers[index]);
    });

    app.patch("/soldiers/:id", async (req, res) => {
        const soldiers = await readJSON(soldierPath);
        const index = soldiers.findIndex(s => s.id == req.params.id);

        if(index === -1){
            return res.status(404).json({ error: "Soldier not found" });
        }

        soldiers[index] = {
            id: soldiers[index].id,
            name: req.body.name ?? soldiers[index].name,
            rank: req.body.rank ?? soldiers[index].rank,
            age: req.body.age ?? soldiers[index].age,
            isActive: req.body.isActive ?? soldiers[index].isActive,
            enlistedAt: req.body.enlistedAt ?? soldiers[index].enlistedAt,
            skills: req.body.skills ?? soldiers[index].skills
        }

        await writeJSON(soldierPath, soldiers);

        res.json(soldiers[index]);
    })


    app.delete("/soldiers/:id", async (req, res) => {
        let soldiers = await readJSON(soldierPath);
        const soldiersCountBefore = soldiers.length;

        soldiers = soldiers.filter(s => s.id != req.params.id);

        if(soldiers.length === soldiersCountBefore){
            return res.status(404).json({ error: "Soldier not found" });
        }

        await writeJSON(soldierPath, soldiers);
        res.json({ message: "Soldier deleted" })
    })

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

    app.post("/vehicles", async (req, res) => {
        const vehicles = await readJSON(vehiclePath);
        const newVehicle = {
            id: Date.now(),
            model: req.body.model,
            type: req.body.type,
            crew: req.body.crew,
            isOperational: req.body.isOperational,
            lastService: req.body.lastService,
            equipment: req.body.equipment
        }
        vehicles.push(newVehicle);
        await writeJSON(vehiclePath, vehicles);

        res.status(201).json(newVehicle);
    });

    app.put("/vehicles/:id", async (req, res) => {
        const vehicles = await readJSON(vehiclePath);
        const index = vehicles.findIndex(v => v.id == req.params.id);

        if(index === -1){
            return res.status(404).json({ error: "Vehicle not found" });
        }

        vehicles[index] = {
            id: vehicles[index].id,
            model: req.body.model,
            type: req.body.type,
            crew: req.body.crew,
            isOperational: req.body.isOperational,
            lastService: req.body.lastService,
            equipment: req.body.equipment
        }

        await writeJSON(vehiclePath, vehicles);

        res.json(vehicles[index]);
    });

    app.patch("/vehicles/:id", async (req, res) => {
        const vehicles = await readJSON(vehiclePath);
        const index = vehicles.findIndex(v => v.id == req.params.id);

        if(index === -1){
            return res.status(404).json({ error: "Vehicle not found" });
        }

        vehicles[index] = {
            id: vehicles[index].id,
            model: req.body.model ?? vehicles[index].model,
            type: req.body.type ?? vehicles[index].type,
            crew: req.body.crew ?? vehicles[index].crew,
            isOperational: req.body.isOperational ?? vehicles[index].isOperational,
            lastService: req.body.lastService ?? vehicles[index].lastService,
            equipment: req.body.equipment ?? vehicles[index].equipment
        }

        await writeJSON(vehiclePath, vehicles);

        res.json(vehicles[index]);
    })

    app.delete("/vehicles/:id", async(req, res) => {
        let vehicles = await readJSON(vehiclePath);
        const vehiclesCoutBefore = vehicles.length;

        vehicles = vehicles.filter(v => v.id != req.params.id);

        if(vehicles.length === vehiclesCoutBefore){
            return res.status(404).json({ error: "Vehicle not found" });
        }

        await writeJSON(vehiclePath, vehicles);
        res.json({ message: "Vehicle deleted" });
    })
}

/*

    <-- ‼️The race conditions issue is also not resolved. -->

*/