const fs = require("fs").promises;
const path = require('path');

const actorsPath = path.join(__dirname, 'actors.json');
const playsPath = path.join(__dirname, 'plays.json');


async function readJSON(file){
    const data = await fs.readFile(file, 'utf-8')
    return JSON.parse(data);
}

async function writeJSON(file, data){
    await fs.writeFile(file, JSON.stringify(data, null, 2));
}

module.exports = (app) => {

    app.get("/actors", async (req, res) => {
        const actors = await readJSON(actorsPath);
        res.json(actors);
    });

    app.get("/actors/:id", async (req, res) => {
        const actors = await readJSON(actorsPath);
        const actor = actors.find(s => s.id == req.params.id);

        if(!actor){
            res.status(404).json({ error: "Actors not found" });
        }
        else{
            res.json(actor);
        }
    });

    app.post("/actors", async (req, res) => {
        const actors = await readJSON(actorsPath);
        const newActor = {
            id: Date.now(),
            name: req.body.name,
            specialization: req.body.specialization,
            age: req.body.age,
            isMovieActor: req.body.isMovieActor,
            DayOfProduction: req.body.DayOfProduction,
            roles: req.body.roles
        }
        actors.push(newActor);
        await writeJSON(actorsPath, actors);

        res.status(201).json(newActor);
    });

    app.put("/actors/:id", async (req, res) => {
        const actors = await readJSON(actorsPath);
        const index = actors.findIndex(s => s.id == req.params.id);

        if(index === -1){
            return res.status(404).json({ error: "Actors not found" });
        }

        actors[index] = {
            id: actors[index].id,
            name: req.body.name,
            specialization: req.body.specialization,
            age: req.body.age,
            isMovieActor: req.body.isMovieActor,
            DayOfProduction: req.body.DayOfProduction,
            roles: req.body.roles
        }

        await writeJSON(actorsPath, actors);

        res.json(actors[index]);
    });

    app.patch("/actors/:id", async (req, res) => {
        const actors = await readJSON(actorsPath);
        const index = actors.findIndex(s => s.id == req.params.id);

        if(index === -1){
            return res.status(404).json({ error: "Actors not found" });
        }

        actors[index] = {
            id: actors[index].id,
            name: req.body.name ?? actors[index].name,
            specialization: req.body.specialization ?? actors[index].specialization,
            age: req.body.age ?? actors[index].age,
            isMovieActor: req.body.isMovieActor ?? actors[index].isMovieActor,
            DayOfProduction: req.body.DayOfProduction ?? actors[index].DayOfProduction,
            roles: req.body.roles ?? actors[index].roles
        }

        await writeJSON(actorsPath, actors);

        res.json(actors[index]);
    })


    app.delete("/actors/:id", async (req, res) => {
        let actors = await readJSON(actorsPath);
        const actorsCountBefore = actors.length;

        actors = actors.filter(s => s.id != req.params.id);

        if(actors.length === actorsCountBefore){
            return res.status(404).json({ error: "Actors not found" });
        }

        await writeJSON(actorsPath, actors);
        res.json({ message: "Actors deleted" })
    })

    //
    // <-- V E H I C L E S -->
    //

    app.get("/vehicles", async (req, res) => {
        const vehicles = await readJSON(playsPath);
        res.json(vehicles);
    });

    app.get("/vehicles/:id", async (req, res) => {
        const vehicles = await readJSON(playsPath);
        const vehicle = vehicles.find(v => v.id == req.params.id);

        if(!vehicle){
            res.status(404).json({ error: "Vehicle not found" });
        }
        else{
            res.json(vehicle);
        }
    })

    app.get("/plays", async (req, res) => {
        const plays = await readJSON(playsPath);
        res.json(plays);
    });

    app.get("/plays/:id", async (req, res) => {
        const plays = await readJSON(playsPath);
        const play = plays.find(p => p.id == req.params.id);

        if(!play){
            res.status(404).json({ error: "Play not found" });
        }
        else{
            res.json(play);
        }
    })

    app.post("/plays", async (req, res) => {
        const plays = await readJSON(playsPath);
        const newPlay = {
            id: Date.now(),
            title: req.body.title,
            genre: req.body.genre,
            castSize: req.body.castSize,
            isCurrentlyRunning: req.body.isCurrentlyRunning,
            lastRehearsal: req.body.lastRehearsal,
            stageEquipment: req.body.stageEquipment
        }
        plays.push(newPlay);
        await writeJSON(playsPath, plays);

        res.status(201).json(newPlay);
    });

    app.put("/plays/:id", async (req, res) => {
        const plays = await readJSON(playsPath);
        const index = plays.findIndex(p => p.id == req.params.id);

        if(index === -1){
            return res.status(404).json({ error: "Play not found" });
        }

        plays[index] = {
            id: plays[index].id,
            title: req.body.title,
            genre: req.body.genre,
            castSize: req.body.castSize,
            isCurrentlyRunning: req.body.isCurrentlyRunning,
            lastRehearsal: req.body.lastRehearsal,
            stageEquipment: req.body.stageEquipment
        }

        await writeJSON(playsPath, plays);

        res.json(plays[index]);
    });

    app.patch("/plays/:id", async (req, res) => {
        const plays = await readJSON(playsPath);
        const index = plays.findIndex(p => p.id == req.params.id);

        if(index === -1){
            return res.status(404).json({ error: "Play not found" });
        }

        plays[index] = {
            id: plays[index].id,
            title: req.body.title ?? plays[index].title,
            genre: req.body.genre ?? plays[index].genre,
            castSize: req.body.castSize ?? plays[index].castSize,
            isCurrentlyRunning: req.body.isCurrentlyRunning ?? plays[index].isCurrentlyRunning,
            lastRehearsal: req.body.lastRehearsal ?? plays[index].lastRehearsal,
            stageEquipment: req.body.stageEquipment ?? plays[index].stageEquipment
        }

        await writeJSON(playsPath, plays);

        res.json(plays[index]);
    })

    app.delete("/plays/:id", async(req, res) => {
        let plays = await readJSON(playsPath);
        const playsCountBefore = plays.length;

        plays = plays.filter(p => p.id != req.params.id);

        if(plays.length === playsCountBefore){
            return res.status(404).json({ error: "Play not found" });
        }

        await writeJSON(playsPath, plays);
        res.json({ message: "Play deleted" });
    })
}

/*

    <-- ‼️The race conditions issue is also not resolved. -->

*/