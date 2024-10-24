# Rule Engine with AST Implementation

A powerful and flexible rule engine that uses Abstract Syntax Trees (AST) to evaluate complex business rules. Built with React, TypeScript, and Spring Boot.
https://resilient-souffle-cc87e5.netlify.app/

## Features

- 🌳 **AST-Based Rule Processing**: Complex rule parsing and evaluation using Abstract Syntax Trees
- 🔄 **Real-time Rule Evaluation**: Instantly evaluate rules against user data
- 🎯 **Flexible Rule Creation**: Support for multiple operators (AND, OR, >, <, =, >=, <=)
- 🎨 **Modern UI**: Clean and intuitive interface built with React and Tailwind CSS
- 🔒 **Type-Safe**: Built with TypeScript for enhanced reliability
- 🚀 **Full-Stack Solution**: Includes both frontend and backend implementations

## Tech Stack

### Frontend
- React 18
- TypeScript
- Tailwind CSS
- Lucide React (for icons)
- Vite (build tool)

### Backend
- Spring Boot 3
- Java 17
- H2 Database
- JPA/Hibernate
- Lombok

## Getting Started

### Prerequisites
- Node.js 18+
- Java 17+
- Maven

### Frontend Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### Backend Setup

```bash
# Navigate to backend directory
cd src/backend

# Build and run with Maven
mvn spring-boot:run
```

## Rule Syntax

Rules are written using a simple, intuitive syntax:

```
((age > 30 AND department = 'Sales') OR (age < 25 AND department = 'Marketing')) AND (salary > 50000 OR experience > 5)
```

### Supported Operators
- Logical: `AND`, `OR`
- Comparison: `>`, `<`, `=`, `>=`, `<=`

### Available Fields
- `age`: Number
- `department`: String
- `salary`: Number
- `experience`: Number

## Project Structure

```
├── src/
│   ├── backend/                 # Spring Boot backend
│   │   ├── main/
│   │   │   ├── java/
│   │   │   └── resources/
│   │   └── pom.xml
│   ├── components/             # React components
│   ├── types/                 # TypeScript types
│   ├── utils/                # Utility functions
│   │   ├── ruleParser.ts    # AST parser
│   │   └── ruleEvaluator.ts # Rule evaluation
│   └── App.tsx              # Main application
├── package.json
└── README.md
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with ❤️ using StackBlitz
- Icons provided by [Lucide](https://lucide.dev)
- UI styled with [Tailwind CSS](https://tailwindcss.com)

