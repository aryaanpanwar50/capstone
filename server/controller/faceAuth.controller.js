const Face = require("../models/faceAuth");
const jwt = require("jsonwebtoken");

// Utility: Cosine Similarity
function cosineSimilarity(vec1, vec2) {
    const dotProduct = vec1.reduce((sum, v, i) => sum + v * vec2[i], 0);
    const magnitude1 = Math.sqrt(vec1.reduce((sum, v) => sum + v * v, 0));
    const magnitude2 = Math.sqrt(vec2.reduce((sum, v) => sum + v * v, 0));
    return dotProduct / (magnitude1 * magnitude2);
}

// Signup (with face embedding)
const signup = async (req, res) => {
    try {
        const { email, faceEmbedding } = req.body;
        
        if (!email || !faceEmbedding) {
            return res.status(400).json({ 
                message: "Email and face embedding are required" 
            });
        }

        if (!Array.isArray(faceEmbedding) || faceEmbedding.length !== 128) {
            return res.status(400).json({ 
                message: "Invalid face embedding format" 
            });
        }

        const existingUser = await Face.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists!" });
        }

        const newUser = new Face({ email, faceEmbedding });
        await newUser.save();

        res.status(201).json({ message: "User registered successfully!" });
    } catch (err) {
        console.error("Signup error:", err);
        res.status(500).json({ 
            message: "Error during registration", 
            error: err.message 
        });
    }
};

// Login (with face verification)
const login = async (req, res) => {
    try {
        const { email, faceEmbedding } = req.body;
        const user = await Face.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "User not found!", verified: false });
        }

        const similarity = cosineSimilarity(faceEmbedding, user.faceEmbedding);
        const SIMILARITY_THRESHOLD = 0.92;

        if (similarity < SIMILARITY_THRESHOLD) {
            return res.status(401).json({
                message: "Face verification failed - Not enough similarity",
                similarity,
                verified: false,
                threshold: SIMILARITY_THRESHOLD
            });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.json({
            token,
            message: "Login successful - Face verified",
            similarity,
            verified: true,
            threshold: SIMILARITY_THRESHOLD
        });
    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ 
            message: "Error during login", 
            error: err.message, 
            verified: false 
        });
    }
};

// Face Verification (used independently)
const verifyFace = async (req, res) => {
    try {
        const { email, faceEmbedding } = req.body;

        if (!email || !faceEmbedding) {
            return res.status(400).json({ message: "Email and face embedding are required" });
        }

        const user = await Face.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const similarity = cosineSimilarity(faceEmbedding, user.faceEmbedding);
        const threshold = 0.8;
        const isMatch = similarity >= threshold;

        return res.json({
            isMatch,
            similarity,
            message: isMatch ? "Face verified successfully" : "Face verification failed"
        });
    } catch (error) {
        console.error("Face verification error:", error);
        return res.status(500).json({ 
            message: "Error verifying face", 
            error: error.message 
        });
    }
};

module.exports = { signup, login, verifyFace };
