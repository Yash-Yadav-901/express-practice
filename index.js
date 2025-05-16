import express from 'express';

const app= express();

const port=3000;
app.use(express.json());

let dataList=[];
let id=0;

app.get('/superheros/', (req,res) =>{
    
    res.status(201).send(dataList);
});

//taking data from user in json format using body
app.post('/superheros',(req,res)=>{
    const {name, superPower}= req.body;
    const newHero={
        id: id++,
        name,
        superPower
    }
    dataList.push(newHero);
    res.status(201).send('data added successfully');
});


//sending data to user 
app.get('/superheros/:id', (req,res) =>{
    const hero= dataList.find( h => h.id === parseInt(req.params.id));

    if(!hero){
        return res.status(404).send('404 not found');
    }
    
    res.status(201).send(hero);
});


//updating data

app.put('/superheros/:id', (req, res)=>{
        const herp= dataList.find(h => h.id ===parseInt(req.params.id));

        if(!hero) return res.status(404).send('404 not found');

        hero.name= req.body.name;
        hero.superPower=req.body.superPower;

        res.status(201).send('data updated successfully');
});

//deleting data


app.delete('/superheros/:id', (req,res)=>{
    const idx= dataList.findIndex(h => h.id === parseInt(req.params.id));

    if(idx==-1) return res.status(404).send('404 not found');

    dataList.splice(idx,1);
});



app.listen(port,()=>{
    console.log(`server is running on port:${port}...`);
});
