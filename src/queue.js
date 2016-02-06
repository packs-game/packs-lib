var config;

// Require libraries.
var aws = require( "aws-sdk" );
var Consumer = require('sqs-consumer');

function getQueueUrl(queueUrl) {
	return config.queuePrefix + queueUrl;
}

function createSQS(queueUrl) {
	if (!config) { throw new Error('no config found'); }
	// Create an instance of our SQS Client.
	var sqs = new aws.SQS({
		region: config.region,
		accessKeyId: config.accessKeyId,
		secretAccessKey: config.secretAccessKey,

		params: {
			QueueUrl: getQueueUrl(queueUrl)
		}
	});
	return sqs;
}


function send(sqs, data) {
	sqs.sendMessage({
		MessageBody: JSON.stringify(data)
	}, function(err,data){
		if (err) {
			//TODO REAL ERROR HANDLING
			console.log(err);
		}
	});
}

module.exports = {
	send: function(queueName, data) {
		var sqs = createSQS(queueName);
		send(sqs, data);
	},
	listen: function(queueName, handler) {
		var queueParaser = Consumer.create({
			queueUrl: getQueueUrl(queueName),
			handleMessage: function(message,done) {
				var data = JSON.parse(message.Body);
				handler(data,done);
			},
			sqs: createSQS(queueName)
		});
		queueParaser.start();
		return queueParaser;

	},
	setConfig: function(obj) {
		config = obj;
	}
};