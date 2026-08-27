import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import 'dotenv/config';

import Company from '../models/Company';
import Question from '../models/Question';

const MONGO_URI = process.env.MONGODB_URI;

async function importData() {
  if (!MONGO_URI) {
    console.error('\n❌ ERROR: MONGODB_URI is not defined.');
    console.error('Please create a .env file in the backend/ folder with your MongoDB connection string:');
    console.error('MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.../placeprep\n');
    process.exit(1);
  }

  console.log('Connecting to MongoDB...');
  await mongoose.connect(MONGO_URI);
  console.log('✅ Connected to MongoDB.');

  // 1. Wipe existing data
  console.log('\n🗑️  Wiping existing companies and questions...');
  await Company.deleteMany({});
  await Question.deleteMany({});
  console.log('✅ Cleared existing data.');

  // 2. Load JSON files
  console.log('\n📂 Loading JSON files...');
  // Adjust paths based on running via `npm run import` from the backend directory
  const companiesPath = path.join(process.cwd(), '../companies.json');
  const questionsPath = path.join(process.cwd(), '../questions.json');
  
  if (!fs.existsSync(companiesPath) || !fs.existsSync(questionsPath)) {
    console.error('\n❌ Could not find companies.json or questions.json.');
    console.error(`Checked paths:\n- ${companiesPath}\n- ${questionsPath}`);
    process.exit(1);
  }

  const companiesData = JSON.parse(fs.readFileSync(companiesPath, 'utf-8'));
  const questionsData = JSON.parse(fs.readFileSync(questionsPath, 'utf-8'));
  console.log(`✅ Loaded ${companiesData.length} companies and ${questionsData.length} questions.`);

  // Deduplicate companies by name to prevent E11000 duplicate key error
  const seenCompanyNames = new Set();
  const uniqueCompanies = [];
  for (const c of companiesData) {
    if (!seenCompanyNames.has(c.name)) {
      seenCompanyNames.add(c.name);
      uniqueCompanies.push(c);
    }
  }

  // 3. Insert via Mongoose (Applies defaults, casts types)
  console.log('\\n⏳ Importing Companies into MongoDB (this might take a moment)...');
  await Company.insertMany(uniqueCompanies);
  console.log(`✅ Successfully imported ${uniqueCompanies.length} unique companies (skipped ${companiesData.length - uniqueCompanies.length} duplicates).`);

  console.log('\n⏳ Importing Questions into MongoDB (chunking to prevent memory issues)...');
  
  // questions.json is very large, chunking the inserts so we don't crash
  const CHUNK_SIZE = 1000;
  let insertedQuestions = 0;
  for (let i = 0; i < questionsData.length; i += CHUNK_SIZE) {
    const chunk = questionsData.slice(i, i + CHUNK_SIZE);
    await Question.insertMany(chunk);
    insertedQuestions += chunk.length;
    console.log(`   ...imported ${insertedQuestions} / ${questionsData.length} questions`);
  }
  
  console.log(`✅ Successfully imported ${insertedQuestions} questions.`);

  console.log('\n🎉 ALL DONE! Your database is now perfectly synced and ready to use.');
  await mongoose.disconnect();
  process.exit(0);
}

importData().catch((err) => {
  console.error('\n❌ Import failed:', err);
  mongoose.disconnect().finally(() => process.exit(1));
});
