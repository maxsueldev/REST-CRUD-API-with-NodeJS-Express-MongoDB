const User = require('../models/User');

module.exports = {
    async store(req, res) {  //Create a User
        const { name, email } = req.body;
        
        let user = await User.findOne({ email });
        
        if(!user) {
            user = await User.create({ name, email });
        }

        return res.json({ user });
    },

    async show(req, res) {  //Return all Users
        const users = await User.find({});

        return res.json(users);
    },

    async update(req, res) {  //Update a User
        const { name, email } = req.body
        const { user_id } = req.params;
        const user = await User.findByIdAndUpdate(user_id, { name, email });

        return res.json(user);
    },

    async delete(req, res) { // Delete a User
        const { user_id } = req.params;
        const user = await User.findByIdAndDelete(user_id);
        
        return res.json(user);
    }
}