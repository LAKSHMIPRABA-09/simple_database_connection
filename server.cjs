const express = require('express')
const bodyParser =require('body-parser')
const {connectToDB, getDB} = require('./db.cjs')
const {ObjectId} =require('mongodb')

const app=express()
app.use(express.static(__dirname))
app.use(express.json())
app.use(bodyParser.json())
let db

connectToDB(function(error)
{
    if(!error){
        
        app.listen(4000)
        console.log('server listening on http:localhost: 2000')
        db= getDB()
    }
    else{
        console.log(error)
    }
})
/** end points
 * get-entries : fetching all the entry data
 * add-entry
 * delete - entry
 * edit-entry
 */

app.post('/post-data',function(req,res)
{
    console.log(req.body)
    // if(req.body.username === 'lakshmi' && req.body.password === '091123')
    // {
    //     res.status(200).json({
    //         'expense-details' : 'added successfully'
    //     })
    // }
    // else{
    //     res.status(200).json({
    //         'expense-details' : 'failed to add'
    //     })
    // }
    db.collection('e-commerce_data').insertOne(req.body).then(function(){
        res.status(201).json({
            'status' : 'data added successfully'
        })
    }).catch(function(error){
        res.status(500).json({
            'error' : "data failed to add"
        })
    })
})
app.get('/get-data',function(req,res){
    const entries=[]
    console.log(req.body)
    db.collection('e-commerce_data').find().forEach(entry=>entries.push(entry)).then(function(){
        res.status(200).json(entries)
    }).catch(function(error){
        res.status(404).json({
            'error': error
        })
    })
})
app.delete('/delete-data',function(req,res){
    console.log("Received ID:", req.body.id);
    if(ObjectId.isValid(req.body.id)){
        db.collection('ExpenseData').deleteOne({
            _id : new ObjectId(req.body.id)
        }).then(function(){
            res.status(201).json({
                'status' : 'data successfully deleted'
            })
        }).catch(function(error){
            res.status(500).json({
                'error' : error
            })
        })
    }
    else{
        res.status(500).json({
            'status' : 'ObjectId not valid'
        })
    }
})
app.patch('/update-entry', function(request, response) {
    if(ObjectId.isValid(request.body.id)) {
        db.collection('ExpenseData').updateOne(
            {_id: new ObjectId(request.body.id)},
            {$set : request.body.data}
        ).then(function() {
            response.status(201).json({
                'status' : 'data successfully updated'
            })
        }).catch(function(error) {
            response.status(500).json({
                'error' : error
            })
        })
    } else {
        response.status(500).json({
            'status' : 'ObjectId not valid'
        })
    }
})
// app.delete('/delete-entry',function(req,res){
//     db.collection('ExpenseData').deleteOne(req.body)
// })
// app.listen(2000)