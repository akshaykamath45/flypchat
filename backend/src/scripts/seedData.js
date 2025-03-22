const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Expert = require('../models/Expert');
const Customer = require('../models/Customer');
const connectDB = require('../config/db');

// Load environment variables
dotenv.config();

// Sample expert data from the frontend
const experts = [
  {
    name: "Dr. Sarah Chen",
    title: "Financial Advisor",
    specialization: "Investment Strategy",
    bio: "Dr. Chen holds a Ph.D. in Economics from Stanford and has 15+ years of experience in investment banking and wealth management. She specializes in portfolio optimization and retirement planning.",
    avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=988&auto=format&fit=crop&ixlib=rb-4.0.3",
    price: 150,
    rating: 4.9,
    reviewCount: 247,
    expertise: ["Retirement Planning", "Stock Market Investment", "Portfolio Diversification", "Risk Management"],
    workingHours: {
      start: "09:00",
      end: "17:00"
    },
    workingDays: [1, 2, 3, 4, 5] // Monday to Friday
  },
  {
    name: "Michael Rodriguez",
    title: "Real Estate Consultant",
    specialization: "Commercial Property",
    bio: "Michael has helped over 500 clients navigate complex real estate decisions. With a background in urban planning and 12 years in commercial real estate, he provides expert guidance on property investments.",
    avatarUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.0.3",
    price: 125,
    rating: 4.8,
    reviewCount: 189,
    expertise: ["Commercial Real Estate", "Property Valuation", "Market Analysis", "Investment Properties"],
    workingHours: {
      start: "09:00",
      end: "17:00"
    },
    workingDays: [1, 2, 3, 4, 5]
  },
  {
    name: "Emma Thompson",
    title: "Career Coach",
    specialization: "Tech Industry Careers",
    bio: "Emma is a former tech recruiter turned career coach. She has helped professionals land roles at companies like Google, Apple, and Meta. Her approach combines industry insights with practical job search strategies.",
    avatarUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=761&auto=format&fit=crop&ixlib=rb-4.0.3",
    price: 100,
    rating: 4.7,
    reviewCount: 312,
    expertise: ["Resume Building", "Interview Preparation", "Career Transition", "Salary Negotiation"],
    workingHours: {
      start: "09:00",
      end: "17:00"
    },
    workingDays: [1, 2, 3, 4, 5]
  },
  {
    name: "Dr. James Wilson",
    title: "Health & Wellness Advisor",
    specialization: "Nutrition & Fitness",
    bio: "Dr. Wilson combines his medical background with sports science to create personalized health plans. He's worked with professional athletes and everyday clients to achieve optimal wellness through evidence-based approaches.",
    avatarUrl: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3",
    price: 120,
    rating: 4.9,
    reviewCount: 178,
    expertise: ["Nutritional Planning", "Fitness Programming", "Weight Management", "Preventive Health"],
    workingHours: {
      start: "09:00",
      end: "17:00"
    },
    workingDays: [1, 2, 3, 4, 5]
  },
  {
    name: "Sophia Lee",
    title: "Marketing Strategist",
    specialization: "Digital Marketing",
    bio: "Sophia has led marketing campaigns for Fortune 500 companies and promising startups alike. Her expertise spans digital channels, content strategy, and consumer psychology, delivering measurable growth for her clients.",
    avatarUrl: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.0.3",
    price: 135,
    rating: 4.8,
    reviewCount: 221,
    expertise: ["Social Media Strategy", "Content Marketing", "SEO Optimization", "Brand Development"],
    workingHours: {
      start: "09:00",
      end: "17:00"
    },
    workingDays: [1, 2, 3, 4, 5]
  },
  {
    name: "David Kim",
    title: "Technology Consultant",
    specialization: "Software Development",
    bio: "David has 20 years of experience in software architecture and development. He's guided numerous companies through digital transformation and technology implementation, from startups to enterprise organizations.",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.0.3",
    price: 160,
    rating: 4.9,
    reviewCount: 195,
    expertise: ["Software Architecture", "Digital Transformation", "Technology Strategy", "Cloud Solutions"],
    workingHours: {
      start: "09:00",
      end: "17:00"
    },
    workingDays: [1, 2, 3, 4, 5]
  }
];

// Sample customer data
const sampleCustomer = {
  name: "John Doe",
  email: "john.doe@example.com",
  phone: "1234567890",
  additionalInfo: "Interested in investment planning"
};

// Function to seed the database
const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await connectDB();

    // Clear existing data
    await Expert.deleteMany({});
    await Customer.deleteMany({});

    // Insert experts
    const createdExperts = await Expert.insertMany(experts);
    console.log('Experts seeded successfully');

    // Insert sample customer
    const customer = await Customer.create(sampleCustomer);
    console.log('Sample customer created successfully');

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

// Run the seeding function
seedDatabase();