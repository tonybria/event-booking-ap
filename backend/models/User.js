const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    username: { 
        type: String, 
        required: true, 
        unique: true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    role: { 
        type: String, 
        enum: ['admin', 'organizer', 'attendee'], 
        default: 'attendee' 
    },
<<<<<<< HEAD
},  { collection: "users" } ,{ timestamps: true }
); // ✅ Adds createdAt & updatedAt fields
=======
}, { timestamps: true, collection: "users" }); 
>>>>>>> Benny

// 🔹 Hash password before saving to DB
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
<<<<<<< HEAD
    
=======
>>>>>>> Benny
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

<<<<<<< HEAD

=======
>>>>>>> Benny
module.exports = mongoose.model('User', userSchema);
