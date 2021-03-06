var expect = require('chai').expect;
var mongoose = require('mongoose');
var jobModel = require('../models/Job');
var Promise = require('bluebird');

function resetJobs() {
    return new Promise(function(resolve, reject) {
        mongoose.connection.collections['jobs'].drop(resolve, reject); 
    });
};

function findJobs(query) {
    return Promise.cast(mongoose.model('Job').find(query).exec());
};

describe('get jobs', function() {
    var jobs = [];
    
    before(function(done) {
        mongoose.connect('mongodb://psdev1:psdev1@ds019101.mlab.com:19101/jobfinder', function() {
            resetJobs()
            .then(jobModel.seedJobs)
            .then(findJobs)
            .then(function(collection) {
                jobs = collection;
                done();
            });
        });
    });
    
    it('should never be empty since jobs are seeded', function() {
        expect(jobs.length).to.be.at.least(1);
    });
    
    it('should have a job with a title', function() {
        expect(jobs[0].title).to.not.be.empty;
    });
    
    it('should have a job with a description', function() {
        expect(jobs[0].description).to.not.be.empty;
    });
});