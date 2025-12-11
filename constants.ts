import { Course, CourseModule } from './types';

export const COURSES: Course[] = [
  { id: 'buad824', code: 'BUAD 824', title: 'Human Resource Management' },
  { id: 'buad828', code: 'BUAD 828', title: 'Marketing Management and Strategy' },
  { id: 'buad822', code: 'BUAD 822', title: 'Management Information Systems' },
  { id: 'buad825', code: 'BUAD 825', title: 'Business, Government and Society' },
  { id: 'buad826', code: 'BUAD 826', title: 'Research Methodology' },
  { id: 'buad834', code: 'BUAD 834', title: 'Purchasing and Supply Management' },
  { id: 'buad818', code: 'BUAD 818', title: 'Product Development & Price Policies' },
  { id: 'buad820', code: 'BUAD 820', title: 'Consumer Behaviour' }
];

export const COURSE_MODULES: Record<string, CourseModule[]> = {
  'buad824': [
    {
      id: 'm1',
      title: 'Module 1',
      sessions: [
        'Introduction',
        'Nature and Development of HRM',
        'Human Resource Planning',
        'Job Analysis (Defining and Designing the Work)'
      ]
    },
    {
      id: 'm2',
      title: 'Module 2',
      sessions: [
        'Recruitment and Selection',
        'Performance Appraisal and Compensation',
        'Job Evaluation',
        'Training and Development'
      ]
    },
    {
      id: 'm3',
      title: 'Module 3',
      sessions: [
        'Succession Planning',
        'Recent Trends in HRM',
        'Critique and Paradox in HRM',
        'Cases (Session 4)',
        'Cases (Session 5)'
      ]
    }
  ],
  'buad828': [
    {
      id: 'm1',
      title: 'Module 1: Building Concepts and Issues',
      sessions: [
        'Defining Marketing for the 21st Century',
        'Developing Marketing Strategies and Plans',
        'Components of a Modern Marketing Information System',
        'Conducting Marketing Research'
      ]
    },
    {
      id: 'm2',
      title: 'Module 2: Building the Market',
      sessions: [
        'Creating Long-Term Loyalty Relationships',
        'Analysing Consumer Markets',
        'Analysing Business Markets',
        'Market Segments and Targets'
      ]
    },
    {
      id: 'm3',
      title: 'Module 3: Strategic Market Growth',
      sessions: [
        'Creating Brand Equity',
        'Designing and Managing Services',
        'Designing and Managing Integrated Marketing Channels',
        'Designing and Managing Integrated Marketing Comm.',
        'Introducing New Market Offerings'
      ]
    }
  ],
  'buad822': [
    {
      id: 'm1',
      title: 'Module 1: Management Information Systems (MIS) and Information Technology',
      sessions: [
        'Introduction to Management Information System',
        'Information Technology',
        'Systems Development'
      ]
    },
    {
      id: 'm2',
      title: 'Module 2',
      sessions: [
        'Information Systems within Organisations',
        'Information systems management',
        'Information Security Management'
      ]
    },
    {
      id: 'm3',
      title: 'Module 3',
      sessions: [
        'ICT for business and management',
        'Application of ICT in MIS',
        'Influences on MIS Application and Design',
        'Ethical and Societal Issues on MIS'
      ]
    }
  ],
  'buad825': [
    {
      id: 'm1',
      title: 'Module 1: Introduction to Business–Government–Society (BGS) Field',
      sessions: [
        'Approach to the Course',
        'Overview',
        'Models of the BGS Relationship (I)',
        'Models of the BGS Relationship (II)'
      ]
    },
    {
      id: 'm2',
      title: 'Module 2: Corporate Bodies and the Society',
      sessions: [
        'Corporate Governance',
        'Public Policy',
        'Environmental Concerns and Corporations',
        'Business Ethics',
        'Corporate Social Responsibility'
      ]
    },
    {
      id: 'm3',
      title: 'Module 3: Business, Society and the Law',
      sessions: [
        'Law and the Society',
        'Business Organisations, Consumers and the Law',
        'Agency & the Law of Contract',
        'Intellectual Property Law'
      ]
    }
  ],
  'buad826': [
    {
      id: 'm1',
      title: 'Module 1: An Overview of Research',
      sessions: [
        'Introduction to Research',
        'Types of Research',
        'Ethical Issues in Research',
        'Qualitative Research'
      ]
    },
    {
      id: 'm2',
      title: 'Module 2: The Research Process',
      sessions: [
        'Identifying and Formulating research problem',
        'Literature Review and Theoretical Framework',
        'Research objective and Variable Measurement',
        'The Research Design'
      ]
    },
    {
      id: 'm3',
      title: 'Module 3: Data Presentation and Analysis',
      sessions: [
        'Sample Design and Instrument for Data Collection',
        'Data Collection and Analysis',
        'Writing a Research Report',
        'The Research Hypothesis'
      ]
    }
  ],
  'buad834': [
    {
      id: 'm1',
      title: 'Module 1: Fundamentals of Purchasing',
      sessions: [
        'Role and Scope of Purchasing',
        'Purchasing Strategy and Planning',
        'Supply Chain Management Concepts',
        'Organization of Purchasing'
      ]
    },
    {
      id: 'm2',
      title: 'Module 2: Sourcing and Supplier Management',
      sessions: [
        'Supplier Selection and Evaluation',
        'Global Sourcing',
        'Negotiation in Purchasing',
        'Supplier Relationship Management'
      ]
    },
    {
      id: 'm3',
      title: 'Module 3: Operational and Legal Aspects',
      sessions: [
        'Inventory Management Techniques',
        'Logistics and Warehousing',
        'Legal and Ethical Issues in Purchasing',
        'Public Sector Procurement'
      ]
    }
  ],
  'buad818': [
    {
      id: 'm1',
      title: 'Module 1: New Product Development',
      sessions: [
        'The New Product Development Process',
        'Idea Generation and Screening',
        'Concept Development and Testing',
        'Product Lifecycle Management'
      ]
    },
    {
      id: 'm2',
      title: 'Module 2: Product Strategy and Branding',
      sessions: [
        'Product Mix and Line Decisions',
        'Branding Strategies and Brand Equity',
        'Packaging and Labeling',
        'Product Positioning'
      ]
    },
    {
      id: 'm3',
      title: 'Module 3: Pricing Decisions',
      sessions: [
        'Pricing Objectives and Constraints',
        'Pricing Methods and Approaches',
        'Psychological and Promotional Pricing',
        'Price Adjustment Strategies'
      ]
    }
  ],
  'buad820': [
    {
      id: 'm1',
      title: 'Module 1: Introduction to Consumer Behaviour',
      sessions: [
        'Nature and Scope of Consumer Behaviour',
        'Consumer Decision Making Process',
        'Market Segmentation and Targeting',
        'Consumer Research Methods'
      ]
    },
    {
      id: 'm2',
      title: 'Module 2: Psychological Influences',
      sessions: [
        'Consumer Motivation and Personality',
        'Perception and Learning',
        'Attitude Formation and Change',
        'Self-Concept and Lifestyle'
      ]
    },
    {
      id: 'm3',
      title: 'Module 3: Sociological Influences',
      sessions: [
        'Social Class and Group Influences',
        'Culture and Subculture',
        'Family Influence and Reference Groups',
        'Diffusion of Innovations'
      ]
    }
  ]
};

export const TIMER_DURATION_SECONDS = 8 * 60; // 8 minutes
export const QUESTIONS_POOL_SIZE = 50;
export const QUESTIONS_PER_QUIZ = 20;