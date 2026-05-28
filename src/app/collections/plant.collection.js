import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid'; // Certifique-se de instalar com: npm install uuid

const PlantSchema = new mongoose.Schema({
  _id: { type: String, default: uuidv4 }, // ID universal para facilitar integrações
  scientific_name: { type: String, required: true },
  family: String,
  type: String,
  origin: String,
  difficulty: {
    level: { type: String, enum: ['easy', 'medium', 'hard'] },
    description: String
  },
  growth: {
    speed: { type: String, enum: ['slow', 'moderate', 'fast'] },
    description: String
  },
  toxicity: {
    is_toxic: Boolean,
    description: String
  },
  ideal_locations: [{
    name: String,
    description: String
  }],
  care: {
    water: { frequency: String, description: String },
    light: {
      type: { type: String },
      description: String
    },
    climate: { humidity: String, temperature: String, description: String },
    maintenance: {
      fertilizing: { frequency: String, description: String },
      pruning: { title: String, description: String },
      repotting: { frequency: String, description: String }
    }
  },
  alerts: {
    common_problems: [{ title: String, description: String }]
  },
  curiosities: {
    origin: String,
    fun_fact: String,
    symbolism: String,
    decorative_use: String
  }
}, { timestamps: true });

export default mongoose.model('Plant', PlantSchema);