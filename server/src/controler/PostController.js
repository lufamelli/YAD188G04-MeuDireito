const Post = require('../model/post');

module.exports = {
    async index(req,res){
        const post = await Post.find();
        res.json(post);
    },
    async search(req,res){
        const {title, query} = req.body
        const post = await Post.find({$text:{$search:query}});
        if (!post.length > 0) {
			products = await Product.find({});
		}
        res.json(post);
    },
    async create(req,res){
        const {title, subTitle, body} = req.body;
        let generateData = {};

        generateData = {title, subTitle, body};
        let post =  await Post.create(generateData);

        // a ver se funciona vvv
        res.json(post);
    },
    async update(req,res){
        const { _id, title, subTitle, body } = req.body;
        const generateData = {title, subTitle, body};
        const post = await Post.findOneAndUpdate({_id}, generateData,{new:true});
        res.json(post);
    },
    async details(req,res){
        const {_id} = req.params;
        //const post = await Post.findOne({_id});
        const post = await Post.findById({_id});
        if(!post){
            res.status(400).send("Falha no detalhe do post.")
        }else {
            res.json(post);
        }
    },
    async delete(req,res){
        const { _id } = req.params;
        const post = await Post.findByIdAndDelete({_id});
        return res.json(post);
    }
}