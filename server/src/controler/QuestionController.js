const Question = require('../model/question');

module.exports = {
    async index(req,res){
        const question = await Question.find();
        res.json(question);
    },
    async search(req,res){
        const {questionTitle, query} = req.body
        const question = await Question.find({$text:{$search:query}});
        if (!question.length > 0) {
			products = await Product.find({});
		}
        res.json(question);
    },
    async create(req,res){
        const {questionTitle, description} = req.body;
        let generateData = {};

        generateData = {questionTitle, description};
        let question =  await Question.create(generateData);

        // a ver se funciona vvv
        res.json(question);
    },
    async update(req,res){
        const { _id, questionTitle, description } = req.body;
        const generateData = {questionTitle, description, body};
        const question = await Question.findOneAndUpdate({_id}, generateData,{new:true});
        res.json(question);
    },
    async details(req,res){
        const {_id} = req.params;
        const question = await Question.findOne({_id});
        res.json(question);
    },
    async delete(req,res){
        const { _id } = req.params;
        const question = await Question.findByIdAndDelete({_id});
        return res.json(question);
    }
}