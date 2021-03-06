var mongoose = require("mongoose");
var Promise = require("bluebird");

var jobSchema = mongoose.Schema({
    title: {type:String},
    description: {type:String}
});

var Job = mongoose.model('Job', jobSchema);

exports.seedJobs = function() {
    return new Promise(function(resolve, reject) {
       Job.find({}).exec(function(error, collection) {
            if(collection.length === 0) {
                Job.create({title: 'Cook', description: 'You will be making bagels'});
                Job.create({title: 'Waiter', description: 'You will be putting food on peoples table'});
                Job.create({title: 'Programmer', description: 'You will be mindlessly typing'});
                Job.create({title: 'Axe Maker', description: 'We need many axes made...  so many...'}, resolve);
            }
        }); 
    });
}