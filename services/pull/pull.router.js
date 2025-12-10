const { error } = require("console");

const fs = require("fs").promises;

const visitorsPath = 'visitors.json';
const lanesPath = 'lanes.json';

async function ReadJson(file) {
    const data = await fs.readFile(file, 'utf-8');
    return JSON.parse(data);
}

async function WriteJson(file,newData) {
    const Data = await ReadJson(file);
    Data.push(newData);
    await fs.writeFile(file,JSON.stringify(Data, null , 2));
}


module.exports = (app) => {

    /////////////////////
    // V I S I T O R S//
    //     G E T     //
    //////////////////

    app.get("/visitors", async (req, res) => {
        const visitors = await ReadJson(visitorsPath);
        res.json(visitors);
    });

    app.get("/visitors/:id", async (req,res) => {
        const visitors = await ReadJson(visitorsPath);
        const visitor = visitors.find(s => s.id == req.params.id);

        if(!visitor){
            return res.status(404).json({error: "Visitor not found"});
        }

        else{
            res.json(visitor);
        }
    })


    /////////////////////
    // V I S I T O R S//
    //    P O S T    //
    //////////////////

    app.post("/visitors", async (req,res) => {
        try{
            const visitors = await ReadJson(visitorsPath);


            const newVisitor = {
                id: Date.now(),
                ...req.body
            };

            visitors.push(newVisitor);

            await fs.writeFile(visitorsPath, JSON.stringify(visitors, null , 2));

            res.status(201).json({message: "Visistor created", visitor: newVisitor});
        }
        catch(err){
            res.status(500).json({error: "Server error"});
        }
    });


    /////////////////////
    // V I S I T O R S//
    //  D E L E T E  //
    //////////////////

    app.delete("/visitors/:id", async (req,res) => {
        try{
            const visitors = await ReadJson(visitorsPath);
            const id = req.params.id;

            const index = visitors.findIndex(s => s.id == id);

            if(index === -1){
                return res.status(404).json({error: "Can't delete => Visitor not found"});
            }

            const removed = visitors.splice(index, 1)[0];
            
            await fs.writeFile(visitorsPath, JSON.stringify(visitors, null, 2));

            res.json({message: "Visitor deleted", removed});
        }
        catch (err){
            res.status(500).json({error: "Server Error"});
        }
    });

    /////////////////////
    // V I S I T O R S//
    //   P A T C H   //
    //////////////////


    app.patch("/visitors/:id", async (req,res) => {
        try{
            const visitors = await ReadJson(visitorsPath);
            const id = req.params.id;

            const index = visitors.findIndex(s => s.id == id);

            if(id === -1){
                return res.status(404).json({error: "Can't patch => Visitor not found"});
            }


            visitors[index] = {
                ...visitors[index],
                ...req.body
            }

            await fs.writeFile(visitorsPath, JSON.stringify(visitors, null , 2));

            res.json({message: "Visitor update", visitor: visitors[index]});

        }
        catch(err){
            res.status(500).json({error: "Server error"});
        }
    });

    /////////////////////
    // V I S I T O R S//
    //     P U T     //
    //////////////////
    

    app.put("/visitors/:id", async (req,res) => {
        try{
            const visitors = await ReadJson(visitorsPath);
            const id = req.params.id;

            const index = visitors.findIndex(s => s.id == id);

            if(index === -1){
                return res.status(404).json({error: "Can't put => Visitor not found"});
            }

            visitors[index] = {
                id: visitors[index].id,
                ...req.body
            };

            await fs.writeFile(visitorsPath, JSON.stringify(visitors, null , 2));

            res.json({message: "Visitor replaced", visitor: visitors[index]});

        }
        catch(err){
            res.status(500).json({error: "Server Error"});
        }
    })


    /////////////////////
    //   L A N E S    //
    //     G E T     //
    //////////////////

    app.get("/lanes", async (req,res) => {
        const lanes = await ReadJson(lanesPath);
        res.json(lanes);
    });

    app.get("/lanes/:id", async (req,res) => {
        const lanes = await ReadJson(lanesPath);
        const lane = lanes.find(s=> s.id == req.params.id);

        if(!lane){
            return res.status(404).json({error: "Lane not found"});
        }
        else{
            res.json(lane);
        }
    });

    /////////////////////
    //   L A N E S    //
    //    P O S T   //
    //////////////////

    app.post("/lanes", async (req,res) => {
        try{
            const lanes = await ReadJson(lanesPath);


            const newLanes = {
                id: Date.now(),
                ...req.body
            };

            lanes.push(newLanes);

            await fs.writeFile(lanesPath, JSON.stringify(lanes, null , 2));

            res.status(201).json({message: "Lane created", lane: newLanes});
        }
        catch(err){
            res.status(500).json({error: "Server error"});
        }
    });
    

    /////////////////////
    //   L A N E S    //
    //  D E L E T E  //
    //////////////////

    app.delete("/lanes/:id", async (req,res) => {
        try{
            const lanes = await ReadJson(lanesPath);
            const id = req.params.id;

            const index = lanes.findIndex(s => s.id == id);
            if(index === -1){
                return res.status(404).json({error: "Can't delete => Lane not found"});
            }

            const removed = lanes.splice(index, 1)[0];
            await fs.writeFile(lanesPath, JSON.stringify(lanesPath, null, 2));

            res.json({message: "Lanes deleted", removed});
        }
        catch (err){
            res.status(500).json({error: "Server error"});
        }
    });


    /////////////////////
    //   L A N E S    //
    //   P A T C H   //
    //////////////////

    app.patch("/lanes/:id", async (req,res) =>{
        try{
            const lanes = await ReadJson(lanesPath);
            const id = req.params.id;

            const index = lanes.findIndex(s => s.id == id);

            if(index === -1){
                return res.status(404).json({error: "Can't patch => Lane not found"});
            }

            lanes[index] = {
                ...lanes[index],
                ...req.body
            }
            
            await fs.writeFile(lanesPath, JSON.stringify(lanes, null, 2));

            res.json({message: "Lane updated", lane: lanes[index]});


        }
        catch(err){
            res.status(500).json({error: "Server error"});
        }
    });


    /////////////////////
    //   L A N E S    //
    //     P U T     //
    //////////////////

    app.put("/lanes/:id", async (req,res) => {
        try{
            const lanes = await ReadJson(lanesPath);
            const id = req.params.id;

            const index = lanes.findIndex(s => s.id == id);

            if(index === -1){
                return res.status(404).json({error: "Can't put => Lane not found"});
            }

            lanes[index] = {
                id: lanes[index].id,
                ...req.body
            }

            await fs.writeFile(lanesPath, JSON.stringify(lanes, null, 2));

            res.json({message: "Lane replaced", lane: lanes[index]});
        }
        catch(err){
            res.status(500).json({error: "Server error"});
        }
    });
}