
export type Expert = {
  id: string;
  name: string;
  title: string;
  avatarUrl: string;
  specialization: string;
  price: number;
  rating: number;
  reviewCount: number;
  bio: string;
  expertise: string[];
  availability: {
    date: string;
    slots: string[];
  }[];
};

export const experts: Expert[] = [
  {
    id: "exp-1",
    name: "Dr. Sarah Chen",
    title: "Financial Advisor",
    avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=988&auto=format&fit=crop&ixlib=rb-4.0.3",
    specialization: "Investment Strategy",
    price: 150,
    rating: 4.9,
    reviewCount: 247,
    bio: "Dr. Chen holds a Ph.D. in Economics from Stanford and has 15+ years of experience in investment banking and wealth management. She specializes in portfolio optimization and retirement planning.",
    expertise: ["Retirement Planning", "Stock Market Investment", "Portfolio Diversification", "Risk Management"],
    availability: [
      {
        date: "2023-11-10",
        slots: ["10:00", "11:00", "15:00", "16:00"]
      },
      {
        date: "2023-11-11",
        slots: ["09:00", "13:00", "14:00", "17:00"]
      },
      {
        date: "2023-11-12",
        slots: ["11:00", "12:00", "15:00", "16:00"]
      }
    ]
  },
  {
    id: "exp-2",
    name: "Michael Rodriguez",
    title: "Real Estate Consultant",
    avatarUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.0.3",
    specialization: "Commercial Property",
    price: 125,
    rating: 4.8,
    reviewCount: 189,
    bio: "Michael has helped over 500 clients navigate complex real estate decisions. With a background in urban planning and 12 years in commercial real estate, he provides expert guidance on property investments.",
    expertise: ["Commercial Real Estate", "Property Valuation", "Market Analysis", "Investment Properties"],
    availability: [
      {
        date: "2023-11-10",
        slots: ["09:00", "10:00", "14:00", "15:00"]
      },
      {
        date: "2023-11-11",
        slots: ["11:00", "12:00", "16:00", "17:00"]
      },
      {
        date: "2023-11-12",
        slots: ["10:00", "11:00", "13:00", "16:00"]
      }
    ]
  },
  {
    id: "exp-3",
    name: "Emma Thompson",
    title: "Career Coach",
    avatarUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=761&auto=format&fit=crop&ixlib=rb-4.0.3",
    specialization: "Tech Industry Careers",
    price: 100,
    rating: 4.7,
    reviewCount: 312,
    bio: "Emma is a former tech recruiter turned career coach. She has helped professionals land roles at companies like Google, Apple, and Meta. Her approach combines industry insights with practical job search strategies.",
    expertise: ["Resume Building", "Interview Preparation", "Career Transition", "Salary Negotiation"],
    availability: [
      {
        date: "2023-11-10",
        slots: ["11:00", "12:00", "16:00", "17:00"]
      },
      {
        date: "2023-11-11",
        slots: ["10:00", "13:00", "15:00", "16:00"]
      },
      {
        date: "2023-11-12",
        slots: ["09:00", "12:00", "14:00", "17:00"]
      }
    ]
  },
  {
    id: "exp-4",
    name: "Dr. James Wilson",
    title: "Health & Wellness Advisor",
    avatarUrl: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3",
    specialization: "Nutrition & Fitness",
    price: 120,
    rating: 4.9,
    reviewCount: 178,
    bio: "Dr. Wilson combines his medical background with sports science to create personalized health plans. He's worked with professional athletes and everyday clients to achieve optimal wellness through evidence-based approaches.",
    expertise: ["Nutritional Planning", "Fitness Programming", "Weight Management", "Preventive Health"],
    availability: [
      {
        date: "2023-11-10",
        slots: ["09:00", "10:00", "15:00", "16:00"]
      },
      {
        date: "2023-11-11",
        slots: ["11:00", "14:00", "15:00", "17:00"]
      },
      {
        date: "2023-11-12",
        slots: ["10:00", "12:00", "13:00", "16:00"]
      }
    ]
  },
  {
    id: "exp-5",
    name: "Sophia Lee",
    title: "Marketing Strategist",
    avatarUrl: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.0.3",
    specialization: "Digital Marketing",
    price: 135,
    rating: 4.8,
    reviewCount: 221,
    bio: "Sophia has led marketing campaigns for Fortune 500 companies and promising startups alike. Her expertise spans digital channels, content strategy, and consumer psychology, delivering measurable growth for her clients.",
    expertise: ["Social Media Strategy", "Content Marketing", "SEO Optimization", "Brand Development"],
    availability: [
      {
        date: "2023-11-10",
        slots: ["10:00", "11:00", "14:00", "17:00"]
      },
      {
        date: "2023-11-11",
        slots: ["09:00", "12:00", "15:00", "16:00"]
      },
      {
        date: "2023-11-12",
        slots: ["11:00", "13:00", "14:00", "16:00"]
      }
    ]
  },
  {
    id: "exp-6",
    name: "David Kim",
    title: "Technology Consultant",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.0.3",
    specialization: "Software Development",
    price: 160,
    rating: 4.9,
    reviewCount: 195,
    bio: "David has 20 years of experience in software architecture and development. He's guided numerous companies through digital transformation and technology implementation, from startups to enterprise organizations.",
    expertise: ["Software Architecture", "Digital Transformation", "Technology Strategy", "Cloud Solutions"],
    availability: [
      {
        date: "2023-11-10",
        slots: ["09:00", "12:00", "13:00", "16:00"]
      },
      {
        date: "2023-11-11",
        slots: ["10:00", "11:00", "15:00", "17:00"]
      },
      {
        date: "2023-11-12",
        slots: ["09:00", "14:00", "15:00", "16:00"]
      }
    ]
  }
];

export const durations = [
  { value: "15", label: "15 minutes", price: 1 },
  { value: "30", label: "30 minutes", price: 1.8 },
  { value: "45", label: "45 minutes", price: 2.5 },
  { value: "60", label: "60 minutes", price: 3 },
];

export const faqs = [
  {
    question: "How is expert verification done on Flypchat?",
    answer: "All Flypchat experts undergo a rigorous verification process, including credential checks, experience verification, client references, and a quality assessment interview with our team."
  },
  {
    question: "What happens if I'm not satisfied with my session?",
    answer: "We offer a satisfaction guarantee. If you feel your session didn't meet expectations, you can request a refund or a complimentary session with another expert within 48 hours."
  },
  {
    question: "How do I prepare for my consultation?",
    answer: "After booking, you'll receive an email with preparation tips specific to your consultation topic. We recommend having your questions ready and any relevant materials accessible during your call."
  },
  {
    question: "Can I reschedule my appointment?",
    answer: "Yes, you can reschedule through your account dashboard up to 24 hours before your scheduled session without any penalty."
  },
  {
    question: "How are the consultation rates determined?",
    answer: "Rates are set by individual experts based on their experience level, credentials, and area of expertise. Flypchat ensures all rates are competitive and appropriate for the value offered."
  }
];

export const features = [
  {
    title: "Vetted Experts",
    description: "Every expert undergoes thorough verification to ensure authentic expertise and quality advice.",
    icon: "ShieldCheck"
  },
  {
    title: "Personalized Sessions",
    description: "One-on-one video consultations tailored specifically to your unique situation and needs.",
    icon: "Video"
  },
  {
    title: "Flexible Scheduling",
    description: "Book sessions at your convenience with our easy-to-use calendar system.",
    icon: "Calendar"
  },
  {
    title: "Secure Platform",
    description: "End-to-end encrypted video calls and strict privacy protocols protect your information.",
    icon: "Lock"
  }
];

export function getExpertById(id: string): Expert | undefined {
  return experts.find(expert => expert.id === id);
}
